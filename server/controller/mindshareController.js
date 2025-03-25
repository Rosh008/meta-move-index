// controllers/mindshareController.js
import { TwitterApi } from 'twitter-api-v2';
import MindshareModel from '../models/mindshareModel.js';
import MindshareView from '../view/mindshareView.js';
import Mindshare from '../models/mindshare.js';
import Sentiment from 'sentiment'; 

// Twitter API credentials
const client = new TwitterApi({
    appKey: 'lzYeTKUWwcEE4INdBPE82uxIf',
    appSecret: 'YFcb0wYxJBe1qOHu1w61w5xdnAIGorSPEZZqbfsgrHpVORnxTg',
    accessToken: '1904261245450227712-Zw8lCNQqSkaXSIa2NwtsuSuLrS2sVM',
    accessSecret: 'XI7nAnjUWGzsoIpOrznOCV267ocL9zpOk2ujLZX9ESAzQ'
});

const twitterClient = client.readWrite;
const sentiment = new Sentiment();

class MindshareController {
  
  static async fetchTweets(query, maxTweets = 5, retryCount = 0, maxRetries = 3) {
    try {
      const tweets = await twitterClient.v2.search(query, {
        max_results: maxTweets,
        'tweet.fields': ['text', 'created_at'],
      });
  
      console.log(tweets);
      console.log("\n\n=================================\n\n")
      console.log(tweets.data);
      console.log("\n\n=================================\n\n")
      console.log(tweets.data.data.at(0))
      console.log("\n\n=================================\n\n")
  
      const tweetData = tweets._realData?.data;

      // Check if 'tweetData' exists and is an array
      if (Array.isArray(tweetData) && tweetData.length > 0) {
        const analyzedTweets = tweetData.map(tweet => {
          const sentimentScore = sentiment.analyze(tweet.text);
          return {
            text: tweet.text,
            sentiment: sentimentScore.score > 0 ? 'positive' : sentimentScore.score < 0 ? 'negative' : 'neutral',
          };}
        );
        return analyzedTweets;
      } else {
        console.error("No tweet data found or it's not in array format.");
        return [];
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const resetTime = error.response.headers['x-rate-limit-reset'];
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const waitTime = resetTime - currentTime + 1; // Time to wait before retrying (in seconds)
        
        console.error(`Rate limit exceeded. Retrying in ${waitTime} seconds. Reset time: ${resetTime}`);
        
        // Avoid infinite retry loop
        if (retryCount >= maxRetries) {
          console.error('Max retry attempts reached.');
          return [];
        }
  
        // Wait for the rate limit to reset before retrying
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
  
        // Retry the request
        return this.fetchTweets(query, maxTweets, retryCount + 1, maxRetries);
      } else {
        console.error('Error fetching tweets:', error);
        return [];
      }
    }
  }
  
  

  static async calculateMindshare(req, res) {
    const query =  req.query.query || 'aptos token'; // Modify the query as needed
    const tokenName = req.query.token || 'aptos';
    const tweets = await MindshareController.fetchTweets(query, 10); // Adjust maxTweets to 100

    if (tweets.length > 0) {
      // Continue with your logic
      // Example: Token counting and response logic
      // Assuming you have token counting logic
      const mindshareModel = new MindshareModel();
      mindshareModel.countTokens(tweets);
      const mindshare = mindshareModel.calculateMindshare(tokenName);
      const totalTokens = Object.values(mindshareModel.tokenCounts).reduce((sum, count) => sum + count, 0);
      const tokenCount  = mindshareModel.tokenCounts[tokenName] || 0;

      // After sentiment analysis and mindshare calculation, store it
      const contractAddress = req.query.contractAddress || 'new'; // Accept contractAddress from request
      const mindshareValue = mindshare;

      const sentimentData = tweets.map(tweet => tweet.sentiment); // Gather sentiments of all tweets
      const sentiment = sentimentData.includes('negative') ? 'negative' : 'positive';

      const mindshare2 = new Mindshare({ contractAddress, mindshareValue, sentiment });
      // Call the storeMindshare function to store or update the mindshare
      
      try{
        const result = await Mindshare.updateOne(
          { contractAddress }, // Condition to find the document
          {
            $set: {
              mindshareValue,
              sentiment,
              timestamp: Date.now(), // Update timestamp
            },
          },
          { upsert: true } // This ensures the document is inserted if it doesn't exist
        );
      } catch(error) {
        console.log('Unable to save because of following error: ' + error)
      }

      return res.json({
        message: mindshareRecord._id ? 'Mindshare value updated successfully' : 'Mindshare value stored successfully',
        totalTokens: MindshareView.showTotalTokens(totalTokens),
        tokenCount: MindshareView.showTokenCount(tokenCount),
        mindshare: MindshareView.showMindshare(mindshare),
      });
    } else {
      return res.status(404).json({ message: 'No tweets found with the given query.' });
    }
  }
}

export default MindshareController;

export const storeMindshare = async (req, res) => {
  const { contractAddress, mindshareValue, sentiment } = req.body;

  if (!contractAddress || mindshareValue === undefined || sentiment === undefined) {
    return res.status(400).json({ message: 'Contract address, mindshare value, and sentiment are required' });
  }

  try {
    // Check if the mindshare value for the contract already exists
    let mindshare = await Mindshare.findOne({ contractAddress });

    const result = await Mindshare.updateOne(
      { contractAddress }, // Condition to find the document
      {
        $set: {
          mindshareValue,
          sentiment,
          timestamp: Date.now(), // Update timestamp
        },
      },
      { upsert: true } // This ensures the document is inserted if it doesn't exist
    );
    if (result.upsertedCount > 0) {
      return res.status(201).json({ message: 'Mindshare value created successfully', data: result });
    } else {
      return res.status(200).json({ message: 'Mindshare value updated successfully' });
    }
  } catch (error) {
    console.error('Error storing mindshare value:', error);
    res.status(500).json({ message: 'Error storing mindshare value', error: error.message });
  }
};

export const getTopMindshares = async (req, res) => {
try {
    // Fetch the top 6 contracts with the highest mindshare values, sorted by mindshareValue in descending order
    const topContracts = await Mindshare.find().sort({ mindshareValue: -1 }).limit(6);

    if (!topContracts || topContracts.length === 0) {
        return res.status(404).json({ message: 'No mindshare data available' });
    }

    res.status(200).json({ message: 'Top 6 contracts with highest mindshare values', data: topContracts });
} catch (error) {
    console.error('Error fetching top mindshares:', error);
    res.status(500).json({ message: 'Error fetching top mindshares', error: error.message });
}
};

export const getMindshareByCA = async (req, res) => {
  const { contractAddress } = req.params; // Assuming the contract address is passed in the URL parameter

  try {
      // Query the project by contract address
      const mindshare = await Mindshare.findOne({ contractAddress }); 

      if (!mindshare) {
          return res.status(404).send({ message: "Mindshare not found" });
      }

      res.status(200).send({ message: "Mindshare fetched successfully", data: mindshare });
  } catch (err) {
      res.status(500).send({ message: "Error fetching project", error: err });
  }
};