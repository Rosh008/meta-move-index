// views/mindshareView.js
class MindshareView {
  static showMindshare(mindshare) {
    return { mindshare: mindshare.toFixed(4) };
  }

  static showTotalTokens(totalTokens) {
    return { totalTokens };
  }

  static showTokenCount(tokenCount) {
    return { tokenCount };
  }
}

export default MindshareView;
