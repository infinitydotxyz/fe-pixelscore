import { DEFAULT_LIMIT, ApiResponse, httpGet, httpPost, LARGE_LIMIT } from 'utils';
import {
  Filter,
  NFTCard,
  NFTToken,
  PortfolioScore,
  RankInfo,
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
  const response = await httpGet('/collections', {
    query,
    limit: DEFAULT_LIMIT,
    cursor
  });

  return response;
};

// ======================================================

export const tokensToCardData = (tokens: NFTToken[], collectionName: string): NFTCard[] => {
  let cardData = tokens.map((token) => {
    // token doesn't have a collectionName, remove from NFTToken or fix BE
    // const collectionName = token.collectionName ?? 'Unknown';

    const result: NFTCard = {
      id: token.collectionAddress + '_' + token.tokenId,
      name: token.metadata?.name,
      collectionName: collectionName,
      title: collectionName ?? 'Unknown',
      description: token.metadata.description,
      image: token.image.url || token.image.originalUrl,
      // cardImage: token.image.url || token.image.originalUrl,
      // imagePreview: token.image.url || token.image.originalUrl,

      price: token.mintPrice,
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      rarityRank: token.rarityRank,
      orderSnippet: token.ordersSnippet,
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

export const rankInfosToCardData = (tokens: RankInfo[], collectionName: string): NFTCard[] => {
  let cardData = tokens.map((token) => {
    // token doesn't have a collectionName, remove from NFTToken or fix BE
    // const collectionName = token.collectionName ?? 'Unknown';

    const result: NFTCard = {
      id: token.collectionAddress + '_' + token.tokenId,
      collectionName: collectionName,
      title: collectionName ?? 'Unknown',
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      address: token.collectionAddress,
      image: token.imageUrl,
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

// ======================================================

export const refreshReveal = async (user: string, txnHash: string, chainId: string): Promise<string> => {
  try {
    const body = {
      txnHash,
      chainId
    };

    const response = await httpPost(`/u/${user}/refresh`, body);

    // result is a string or RevealOrder
    if (typeof response.result === 'string') {
      return response.result as string;
    } else {
      const revealOrder = response.result as RevealOrder;

      // console.log('refresh revealOrder');
      // console.log(JSON.stringify(revealOrder, null, '  '));

      return `Transaction: ${revealOrder.txnStatus}`;
    }

    return response.result as string;
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

export const getReveals = async (user: string, startAfterTimestamp = 0): Promise<ApiResponse> => {
  const response = await httpGet(`/u/${user}/reveals`, {
    startAfterTimestamp
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
