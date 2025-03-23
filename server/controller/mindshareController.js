// controllers/mindshareController.js
import { TwitterApi } from 'twitter-api-v2';
import MindshareModel from '../models/mindshareModel.js';
import MindshareView from '../view/mindshareView.js';
import Mindshare from '../models/mindshare.js';

// Twitter API credentials
const client = new TwitterApi({
    appKey: 'N0qKI131ouS1iA7uAFO01X2Qw',
    appSecret: 'thdOSOMCglQuokvhBOZggU42tJwzZtLSvBHe3AUk4d3DbHYMJR',
    accessToken: '1193552376075931648-2LWp5gj5QuqcESzychAbb49DaYqvW7',
    accessSecret: '8VXVQY3aeQTi7DRoYaiVkvdmdCApskma7YwfXhb6yGaU9'
});

const twitterClient = client.readWrite;

class MindshareController {
  
  static async fetchTweets(query, maxTweets = 100, retryCount = 0, maxRetries = 3) {
    try {
      const tweets = await twitterClient.v2.search(query, {
        max_results: maxTweets,
        'tweet.fields': ['text', 'created_at'],
      });
  
      console.log(tweets);
  
      if (Array.isArray(tweets.data)) {
        return tweets.data.map(tweet => tweet.text);
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
    const query = 'Solana token'; // Modify the query as needed
    const tweets = await MindshareController.fetchTweets(query, 100); // Adjust maxTweets to 100

    if (tweets.length > 0) {
      // Continue with your logic
      // Example: Token counting and response logic
      // Assuming you have token counting logic
      const mindshareModel = new MindshareModel();
      mindshareModel.countTokens(tweets);
      const mindshare = mindshareModel.calculateMindshare();
      const totalTokens = Object.values(mindshareModel.tokenCounts).reduce((sum, count) => sum + count, 0);
      const solanaTokenCount = mindshareModel.tokenCounts['solana'] || 0;

      return res.json({
        totalTokens: MindshareView.showTotalTokens(totalTokens),
        solanaTokenCount: MindshareView.showSolanaTokenCount(solanaTokenCount),
        mindshare: MindshareView.showMindshare(mindshare),
      });
    } else {
      return res.status(404).json({ message: 'No tweets found with the given query.' });
    }
  }
}

export default MindshareController;

export const storeMindshare = async (req, res) => {
  const { contractAddress, mindshareValue } = req.body;

  if (!contractAddress || mindshareValue === undefined) {
      return res.status(400).json({ message: 'Contract address and mindshare value are required' });
  }

  try {
      // Check if the mindshare value for the contract already exists
      let mindshare = await Mindshare.findOne({ contractAddress });

      if (mindshare) {
          // Update the existing mindshare value for the contract
          mindshare.mindshareValue = mindshareValue;
          mindshare.timestamp = Date.now(); // Update timestamp when the mindshare value is updated
          await mindshare.save();
          return res.status(200).json({ message: 'Mindshare value updated successfully', data: mindshare });
      } else {
          // Create a new entry for the contract address
          mindshare = new Mindshare({ contractAddress, mindshareValue });
          await mindshare.save();
          return res.status(201).json({ message: 'Mindshare value stored successfully', data: mindshare });
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