// controllers/mindshareController.js
import { TwitterApi } from 'twitter-api-v2';
import MindshareModel from '../models/mindshareModel.js';
import MindshareView from '../view/mindshareView.js';


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
