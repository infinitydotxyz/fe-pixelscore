import { ListingType } from '@infinityxyz/lib/types/core';

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
  orderBy?: 'rarityRank' | 'price' | '';
  orderDirection?: 'asc' | 'desc' | '';
};
