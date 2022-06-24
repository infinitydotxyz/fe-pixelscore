import { OrderDirection } from '@infinityxyz/lib/types/core';
import { DEFAULT_LIMIT, ApiResponse, httpGet, httpPost, LARGE_LIMIT, PIXELRANK_BUCKET_PERCENT_MAP } from 'utils';
import {
  NFTCard,
  UserNft,
  RevealOrder,
  TokenInfo,
  UpdateRankVisibility,
  UserRecord,
  NftsQuery,
  NftsOrderBy
} from './types/be-types';
import { v4 as uuidv4 } from 'uuid';
import { CollectionInfo } from './types/collection-types';

export const fetchTokens = async (
  collectionAddress: string,
  chainId: string,
  cursor?: string,
  showOnlyUnvisible?: boolean
): Promise<ApiResponse> => {
  const query: NftsQuery = {
    limit: LARGE_LIMIT,
    cursor,
    minRank: 1,
    maxRank: 10,
    orderBy: NftsOrderBy.TokenId,
    orderDirection: OrderDirection.Ascending,
    showOnlyUnvisible: showOnlyUnvisible ?? false
  };
  const response = await httpGet(`/collections/${chainId}/${collectionAddress}/nfts`, query);
  return response;
};

// ======================================================

export const fetchTokensByRank = async (
  minRank: number,
  maxRank: number,
  cursor?: string,
  showOnlyUnvisible?: boolean
): Promise<ApiResponse> => {
  const query: NftsQuery = {
    limit: LARGE_LIMIT,
    cursor,
    minRank,
    maxRank,
    orderBy: NftsOrderBy.TokenId,
    orderDirection: OrderDirection.Ascending,
    showOnlyUnvisible: showOnlyUnvisible ?? false
  };
  const response = await httpGet(`/nfts`, query);
  return response;
};

// ======================================================

export const fetchUserTokens = async (userAddress: string, cursor?: string): Promise<ApiResponse> => {
  const response = await httpGet(`/u/${userAddress}/nfts`, {
    limit: LARGE_LIMIT,
    minRank: 1,
    maxRank: 10, // todo: remove hard coded ranks
    cursor
  });

  return response;
};

// ======================================================

export const fetchCollections = async (query: string, cursor?: string): Promise<ApiResponse> => {
  const response = await httpGet('/collections/search', {
    query,
    limit: DEFAULT_LIMIT,
    cursor
  });

  return response;
};

// ======================================================

export const userNftsToCardData = (tokens: UserNft[]): NFTCard[] => {
  let cardData = tokens.map((token) => {
    const result: NFTCard = {
      id: uuidv4(),
      name: token.metadata?.name,
      collectionName: token.collectionName,
      title: token.collectionName ?? '',
      description: token.metadata?.description,
      image: token.imageUrl || token.image.url || token.image.originalUrl,
      collectionBannerImage: token.collectionBannerImage,
      collectionProfileImage: token.collectionProfileImage,
      price: token.mintPrice,
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      collectionSlug: token.collectionSlug,
      hasBlueCheck: token.hasBlueCheck,
      address: token.collectionAddress,

      rarityRank: token.rarityRank,
      inCollectionPixelRank: token.inCollectionPixelRank,
      pixelRank: token.pixelRank,
      pixelRankBucket: token.pixelRankBucket,
      pixelScore: token.pixelScore,

      rarityScore: token.rarityScore,
      inCollectionPixelScore: token.inCollectionPixelScore,
      pixelRankRevealed: token.pixelRankRevealed,
      pixelRankVisible: token.pixelRankVisible,
      pixelRankRevealer: token.pixelRankRevealer,
      pixelRankRevealedAt: token.pixelRankRevealedAt
    };

    return result;
  });

  // remove any tokens without image (this happens for tokens where we have only the owner info from the blockchain listener)
  cardData = cardData.filter((x) => x.image);

  return cardData;
};

export const tokenInfosToCardData = (tokens: TokenInfo[]): NFTCard[] => {
  let cardData = tokens.map((token) => {
    const result: NFTCard = {
      id: uuidv4(),
      collectionName: token.collectionName,
      title: token.collectionName ?? '',
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      collectionSlug: token.collectionSlug,
      address: token.collectionAddress,
      hasBlueCheck: token.hasBlueCheck,
      image: token.imageUrl,
      collectionBannerImage: token.collectionBannerImage,
      collectionProfileImage: token.collectionProfileImage,

      rarityScore: token.rarityScore,
      rarityRank: token.rarityRank,
      inCollectionPixelScore: token.inCollectionPixelScore,
      inCollectionPixelRank: token.inCollectionPixelRank,
      pixelScore: token.pixelScore,
      pixelRank: token.pixelRank,
      pixelRankBucket: token.pixelRankBucket,
      pixelRankRevealed: token.pixelRankRevealed,
      pixelRankVisible: token.pixelRankVisible,
      pixelRankRevealer: token.pixelRankRevealer,
      pixelRankRevealedAt: token.pixelRankRevealedAt
    };

    return result;
  });

  // remove any tokens without image (this happens for tokens where we have only the owner info from the blockchain listener)
  cardData = cardData.filter((x) => x.image);

  return cardData;
};

// ======================================================

export const refreshReveal = async (
  user: string,
  txnHash: string,
  chainId: string
): Promise<{ status: string; order: RevealOrder | undefined }> => {
  try {
    const body = {
      txnHash,
      chainId
    };

    const response = await httpPost(`/u/${user}/refresh`, body);

    // result is a string or RevealOrder (on success)
    if (typeof response.result !== 'string') {
      const revealOrder = response.result as RevealOrder;

      return { status: `Transaction: ${revealOrder.txnStatus}`, order: revealOrder };
    }

    return { status: response.result as string, order: undefined };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ======================================================

export const updateRankVisibility = async (
  user: string,
  tokenId: string,
  collectionAddress: string,
  chainId: string,
  pixelRankVisible: boolean
): Promise<string> => {
  try {
    const body: UpdateRankVisibility[] = [
      {
        chainId,
        collectionAddress,
        tokenId,
        pixelRankVisible
      }
    ];

    const response = await httpPost(`/u/${user}/rankVisibility`, body);
    return response.result as string;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ======================================================

export const setReveals = async (
  user: string,
  txnHash: string,
  numItems: number,
  pricePerItem: number,
  totalPrice: number,
  revealer: string,
  chainId: string,
  revealItems: TokenInfo[]
): Promise<string> => {
  try {
    const body: RevealOrder = {
      chainId,
      revealer,
      numItems,
      pricePerItem,
      totalPrice,
      txnHash,
      timestamp: 0,
      txnStatus: 'pending', // | 'success' | 'error';
      revealItems: revealItems // TokenInfo
    };

    const response = await httpPost(`/u/${user}/reveals`, body);
    return response.result as string;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ======================================================

export const getReveals = async (user: string, cursor: string, isCompleted: boolean): Promise<ApiResponse> => {
  const response = await httpGet(`/u/${user}/reveals`, {
    cursor,
    isCompleted
  });

  return response;
};

// ======================================================

export const getUserRecord = async (user: string): Promise<UserRecord> => {
  const response = await httpGet(`/u/${user}`, {});

  if (response.result) {
    return response.result as UserRecord;
  }

  return {
    name: '',
    portfolioScore: -1,
    address: user,
    portfolioScoreNumNfts: -1,
    portfolioScoreUpdatedAt: -1,
    totalNftsOwned: -1
  };
};

export const getCollection = async (collectionAddress: string): Promise<CollectionInfo | undefined> => {
  const chainId = '1';
  const response = await httpGet(`/collection/${chainId}/${collectionAddress}`, {});

  if (response.result) {
    return response.result as CollectionInfo;
  }
};

export const pixelRankBucketToolTip = (pixelRankBucket: number): string => {
  switch (pixelRankBucket) {
    case 1:
      return PIXELRANK_BUCKET_PERCENT_MAP[1];
    case 2:
      return PIXELRANK_BUCKET_PERCENT_MAP[2];
    case 3:
      return PIXELRANK_BUCKET_PERCENT_MAP[3];
    case 4:
      return PIXELRANK_BUCKET_PERCENT_MAP[4];
    case 5:
      return PIXELRANK_BUCKET_PERCENT_MAP[5];
    case 6:
      return PIXELRANK_BUCKET_PERCENT_MAP[6];
    case 7:
      return PIXELRANK_BUCKET_PERCENT_MAP[7];
    case 8:
      return PIXELRANK_BUCKET_PERCENT_MAP[8];
    case 9:
      return PIXELRANK_BUCKET_PERCENT_MAP[9];
    case 10:
      return PIXELRANK_BUCKET_PERCENT_MAP[10];
  }
  return '';
};
