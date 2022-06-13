import { DEFAULT_LIMIT, ApiResponse, httpGet, httpPost, LARGE_LIMIT } from 'utils';
import {
  Filter,
  NFTCard,
  NFTToken,
  PortfolioScore,
  RevealOrder,
  TokenInfo,
  UpdateRankVisibility,
  UserRecord
} from './types/be-types';

export const fetchTokens = async (
  collectionAddress: string,
  chainId: string,
  cursor?: string
): Promise<ApiResponse> => {
  const filterState: Filter = {};

  filterState.orderBy = 'tokenId';
  filterState.orderDirection = 'asc';

  const response = await httpGet(`/collections/${chainId}/${collectionAddress}/nfts-bottom`, {
    limit: LARGE_LIMIT,
    cursor,
    ...filterState
  });

  return response;
};

// ======================================================

export const fetchTokensByRank = async (minRank: number, maxRank: number, cursor?: string): Promise<ApiResponse> => {
  const response = await httpGet(`/collections/nfts`, {
    limit: LARGE_LIMIT,
    cursor,
    orderBy: 'tokenId',
    orderDirection: 'asc',
    minRank: minRank,
    maxRank: maxRank
  });

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

export const tokensToCardData = (tokens: NFTToken[]): NFTCard[] => {
  let cardData = tokens.map((token) => {
    // token doesn't have a collectionName, remove from NFTToken or fix BE
    // const collectionName = token.collectionName ?? 'Unknown';

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
      rarityRank: token.rarityRank,
      collectionSlug: token.collectionSlug,
      hasBlueCheck: token.hasBlueCheck,
      address: token.collectionAddress,
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
    // token doesn't have a collectionName, remove from NFTToken or fix BE
    // const collectionName = token.collectionName ?? 'Unknown';

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
      inCollectionPixelRank: token.inCollectionPixelRank,
      pixelRank: token.pixelRank,
      pixelRankBucket: token.pixelRankBucket,
      pixelScore: token.pixelScore,
      collectionBannerImage: token.collectionBannerImage,
      collectionProfileImage: token.collectionProfileImage,
      rarityRank: token.rarityRank
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
    const body: UpdateRankVisibility = {
      chainId,
      collectionAddress,
      tokenId,
      pixelRankVisible
    };

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

export const getPortfolioScore = async (user: string): Promise<PortfolioScore> => {
  const response = await httpGet(`/u/${user}/portfolio-score`, {});

  if (response.result) {
    return response.result as PortfolioScore;
  }

  return { score: 0, count: 0 };
};

// ======================================================

export const getUserRecord = async (user: string): Promise<UserRecord> => {
  const response = await httpGet(`/u/${user}`, {});

  if (response.result) {
    return response.result as UserRecord;
  }

  return { name: '', portfolioScore: -1, address: user };
};
