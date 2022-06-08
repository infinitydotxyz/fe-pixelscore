import { ListingType, BaseToken, CardData } from '@infinityxyz/lib/types/core';

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

export interface NFTToken extends BaseToken {
  inCollectionPixelRank?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
  pixelScore?: number;
}

export interface NFTCard extends CardData {
  inCollectionPixelRank?: number;
  pixelRank?: number;
  pixelRankBucket?: number;
  pixelScore?: number;
}

export interface PortfolioScore {
  score: number;
  count: number;
}

export interface UserRecord {
  address: string;
  name: string;
  portfolioScore: number;
}

export enum OrderType {
  Listing = 'listing',
  Offer = 'offer'
}

export type Filter = {
  chainId?: string;
  listingType?: ListingType | '';
  orderType?: OrderType | '';
  traitTypes?: string[];
  traitValues?: string[];
  collectionAddresses?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortByPrice?: 'ASC' | 'DESC' | '';
  orderBy?: 'tokenId' | '';
  orderDirection?: 'asc' | 'desc' | '';
};
