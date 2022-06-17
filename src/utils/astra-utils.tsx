import { OrderDirection } from '@infinityxyz/lib/types/core';
import { DEFAULT_LIMIT, ApiResponse, httpGet, httpPost, LARGE_LIMIT } from 'utils';
import {
  NFTCard,
  UserNft,
  RevealOrder,
  TokenInfo,
  UpdateRankVisibility,
  UserRecord,
  NftRankQuery,
  NftsOrderBy
} from './types/be-types';

export const fetchTokens = async (
  collectionAddress: string,
  chainId: string,
  cursor?: string
): Promise<ApiResponse> => {
  const query: NftRankQuery = {
    limit: LARGE_LIMIT,
    cursor,
    minRank: 1,
    maxRank: 10,
    orderBy: NftsOrderBy.TokenId,
    orderDirection: OrderDirection.Ascending
  };

  const response = await httpGet(`/collections/${chainId}/${collectionAddress}/nfts`, query);

  return response;
};

// ======================================================

export const fetchTokensByRank = async (minRank: number, maxRank: number, cursor?: string): Promise<ApiResponse> => {
  const query: NftRankQuery = {
    limit: LARGE_LIMIT,
    cursor,
    orderBy: NftsOrderBy.TokenId,
    orderDirection: OrderDirection.Ascending,
    minRank: minRank,
    maxRank: maxRank
  };

  const response = await httpGet(`/collections/nfts`, query);

  return response;
};

// ======================================================

export const fetchUserTokens = async (userAddress: string, cursor?: string): Promise<ApiResponse> => {
  const response = await httpGet(`/u/${userAddress}/nfts`, {
    limit: LARGE_LIMIT,
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
      id: token.collectionAddress + '_' + token.tokenId,
      name: token.metadata?.name,
      collectionName: token.collectionName,
      title: token.collectionName ?? 'Unknown',
      description: token.metadata.description,
      image: token.image.url || token.image.originalUrl,
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
      pixelScore: token.pixelScore
    };

    return result;
  });

  // remove any without tokenAddress (seeing bad NFTs in my profile)
  cardData = cardData.filter((x) => x.tokenAddress);

  return cardData;
};

export const tokenInfosToCardData = (tokens: TokenInfo[]): NFTCard[] => {
  let cardData = tokens.map((token) => {
    const result: NFTCard = {
      id: token.collectionAddress + '_' + token.tokenId,
      collectionName: token.collectionName,
      title: token.collectionName ?? 'Unknown',
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

  // remove any without tokenAddress (seeing bad NFTs in my profile)
  cardData = cardData.filter((x) => x.tokenAddress);

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
