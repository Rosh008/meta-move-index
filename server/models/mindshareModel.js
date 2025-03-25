// models/mindshareModel.js
class MindshareModel {
  constructor() {
    this.tokenCounts = {};
  }

  // Tokenize the text and count tokens
  tokenize(text) {
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
    return cleanedText.split(/\s+/);
  }

  // Count frequency of each token in the provided list of tweets
  countTokens(tweets) {
    tweets.forEach(tweet => {
      if (tweet.text) {  // Ensure tweet has 'text' property
        const tokens = this.tokenize(tweet.text);  // Pass the 'text' property of the tweet
        tokens.forEach(token => {
          this.tokenCounts[token] = (this.tokenCounts[token] || 0) + 1;
        });
      }
    });
  }

  // Calculate the mindshare of the 'Solana' token
  calculateMindshare(tokenName) {
    const totalTokens = Object.values(this.tokenCounts).reduce((sum, count) => sum + count, 0);
    const solanaTokenCount = this.tokenCounts[tokenName] || 0;

    if (totalTokens === 0) return 0;

    return solanaTokenCount / totalTokens;
  }
}

export default MindshareModel;
