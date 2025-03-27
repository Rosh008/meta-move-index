export interface MindShareData {
  contractAddress: string;
  mindshareValue: number;
  timestamp: string; // or Date if you want to use a Date object
  sentiment: 'positive' | 'negative' | 'neutral';
}