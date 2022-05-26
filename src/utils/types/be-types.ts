export interface RevealOrder {
  chainId: string;
  revealer: string;
  numItems: number;
  pricePerItem: number;
  totalPrice: number;
  txnHash: string;
  txnStatus: 'pending' | 'success' | 'error';
  timestamp: number;
  revealItems: TokenInfo[];
}

export interface TokenInfo {
  chainId: string;
  collectionAddress: string;
  collectionSlug: string;
  tokenId: string;
  imageUrl: string;
  rarityScore?: number;
  rarityRank?: number;
  inCollectionPixelScore?: number;
  inCollectionPixelRank?: number;
  pixelScore?: number;
  pixelRank?: number;
  pixelRankRevealed?: boolean;
  pixelRankVisible?: boolean;
  pixelRankRevealer?: string;
  pixelRankRevealedAt?: number;
}

export interface UpdateRankVisibility {
  chainId: string;
  collectionAddress: string;
  tokenId: string;
  pixelRankVisible: boolean;
}

export interface RankInfo {
  chainId: string;
  collectionAddress: string;
  imageUrl: string;
  inCollectionPixelRank?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
  pixelScore?: number;
  tokenId: string;
}
