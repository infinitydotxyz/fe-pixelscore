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

export interface NFTArrayResult<T> {
  data: T[];
  cursor: string;
  hasNextPage: boolean;
}
