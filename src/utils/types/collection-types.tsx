import { BaseToken } from '@infinityxyz/lib/types/core';
import { RankInfo } from './be-types';

// SNG why type not in the lib?

// CollectionSearchDto
export interface CollectionSearchDto {
  description: string;
  address: string;
  chainId: string;
  profileImage: string;
  hasBlueCheck: boolean;
  bannerImage: string;
  slug: string;
  name: string;
}

// CollectionSearchArrayDto
export interface CollectionSearchArrayDto {
  data: CollectionSearchDto[];
  cursor: string;
  hasNextPage: boolean;
}

// NFTArrayDto
export interface NFTArray {
  data: BaseToken[];
  cursor: string;
  hasNextPage: boolean;
}

export interface RankInfoArray {
  data: RankInfo[];
  cursor: string;
  hasNextPage: boolean;
}
