import {
  RefreshTokenFlow,
  RefreshTokenErrorJson,
  Erc721Metadata,
  CardData,
  TokenStandard,
  OrderDirection
} from '@infinityxyz/lib/types/core';

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
  collectionName?: string;
  collectionBannerImage?: string;
  collectionProfileImage?: string;
  hasBlueCheck?: boolean;
  collectionSlug?: string;
  tokenId: string;
  imageUrl: string;
  rarityScore?: number;
  rarityRank?: number;
  inCollectionPixelScore?: number;
  inCollectionPixelRank?: number;
  pixelScore?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
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

export interface NftImage {
  url: string;
  originalUrl: string;
  updatedAt: number;
}

interface NftStateMetadataDto {
  step: RefreshTokenFlow;
  error?: RefreshTokenErrorJson;
}

export interface NftStateDto {
  metadata: NftStateMetadataDto;
}

export interface UserNft {
  collectionAddress?: string;
  collectionSlug?: string;
  collectionName?: string;
  collectionBannerImage?: string;
  collectionProfileImage?: string;
  hasBlueCheck?: boolean;
  chainId: string;
  slug: string;
  tokenId: string;
  minter: string;
  mintedAt: number;
  mintTxHash: string;
  mintPrice: number;
  destroyedAt?: number;
  metadata?: Erc721Metadata;
  numTraitTypes: number;
  updatedAt: number;
  tokenUri: string;
  imageUrl?: string;
  image: NftImage;
  state?: NftStateDto;
  tokenStandard: TokenStandard;
  owner?: string;
  isPixelRanked?: boolean;
  rarityScore?: number;
  rarityRank?: number;
  inCollectionPixelScore?: number;
  inCollectionPixelRank?: number;
  pixelScore?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
  pixelRankRevealed?: boolean;
  pixelRankVisible?: boolean;
  pixelRankRevealer?: string;
  pixelRankRevealedAt?: number;
}

export interface NFTCard extends CardData {
  collectionBannerImage?: string;
  collectionProfileImage?: string;
  hasBlueCheck?: boolean;

  isPixelRanked?: boolean;
  rarityScore?: number;
  rarityRank?: number;
  inCollectionPixelScore?: number;
  inCollectionPixelRank?: number;
  pixelScore?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
  pixelRankRevealed?: boolean;
  pixelRankVisible?: boolean;
  pixelRankRevealer?: string;
  pixelRankRevealedAt?: number;
}
export interface UserRecord {
  address: string;
  name: string;
  portfolioScore: number;
  portfolioScoreUpdatedAt: number;
  portfolioScoreNumNfts: number;
  totalNftsOwned: number;
}

export enum NftsOrderBy {
  TokenId = 'tokenId',
  PixelRank = 'pixelRank'
}

export interface NftsQuery {
  orderBy: NftsOrderBy;
  orderDirection: OrderDirection;
  limit: number;
  cursor?: string;
  minRank?: number;
  maxRank?: number;
  showOnlyVisible?: boolean;
  showOnlyUnvisible?: boolean;
}
