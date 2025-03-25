


interface Token {
    address: string;
    name: string;
    symbol: string;
  }
  
  interface Website {
    url: string;
  }
  
  interface Social {
    type: string;
    url: string;
  }
  
  interface Info {
    imageUrl: string;
    websites: Website[];
    socials: Social[];
  }
  
  interface Txns {
    [key: string]: {
      buys: number;
      sells: number;
    };
  }
  
  interface Volume {
    [key: string]: number;
  }
  
  interface PriceChange {
    [key: string]: number;
  }
  
  interface Liquidity {
    usd: number;
    base: number;
    quote: number;
  }
  
  interface Boosts {
    active: number;
  }
  
export interface dexScreenerTokenData {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    labels: string[];
    baseToken: Token;
    quoteToken: Token;
    priceNative: string;
    priceUsd: string;
    txns: Txns;
    volume: Volume;
    priceChange: PriceChange;
    liquidity: Liquidity;
    fdv: number;
    marketCap: number;
    pairCreatedAt: number;
    info: Info;
    boosts: Boosts;
  }

export type ProjectData = dexScreenerTokenData & {
    projectName: string,
    twitterHandle: string,
    description: string,
    websiteLink: string,
    telegramLink: string,
    githubLink: string,
    category: Array<string>,
    framework: string,
    doxxed: string,
    token: string,
    isOnTeam: string,
    contractAddress: string,
    mindShare: string
}