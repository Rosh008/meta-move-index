// views/mindshareView.js
class MindshareView {
  static showMindshare(mindshare) {
    return { mindshare: mindshare.toFixed(4) };
  }

  static showTotalTokens(totalTokens) {
    return { totalTokens };
  }

  static showSolanaTokenCount(solanaTokenCount) {
    return { solanaTokenCount };
  }
}

export default MindshareView;
