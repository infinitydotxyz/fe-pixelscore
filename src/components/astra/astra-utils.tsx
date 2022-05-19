import { BaseToken, CardData } from '@infinityxyz/lib/types/core';
import { DEFAULT_LIMIT, apiGet, ApiResponse, LARGE_LIMIT, apiPost } from 'utils';
import { Filter } from 'utils/context/FilterContext';
import { RevealOrder, UpdateRankVisibility } from './be-types';

export const fetchTokens = async (
  collectionAddress: string,
  chainId: string,
  cursor?: string
): Promise<ApiResponse> => {
  const filterState: Filter = {};

  filterState.orderBy = 'rarityRank'; // set defaults
  filterState.orderDirection = 'asc';

  const response = await apiGet(`/collections/${chainId}:${collectionAddress}/nfts`, {
    query: {
      limit: LARGE_LIMIT,
      cursor,
      ...filterState
    }
  });

  return response;
};

// ======================================================

export const fetchUserTokens = async (userAddress: string, cursor?: string): Promise<ApiResponse> => {
  const response = await apiGet(`/user/${userAddress}/nfts`, {
    query: {
      limit: LARGE_LIMIT,
      cursor
    }
  });

  return response;
};

// ======================================================

export const fetchCollections = async (query: string, cursor?: string): Promise<ApiResponse> => {
  const response = await apiGet('/collections/search', {
    query: {
      query,
      limit: DEFAULT_LIMIT,
      cursor
    }
  });

  return response;
};

// ======================================================

export const tokensToCardData = (tokens: BaseToken[]): CardData[] => {
  let cardData = tokens.map((token) => {
    const collectionName = token.collectionName ?? 'Unknown';

    return {
      id: token.collectionAddress + '_' + token.tokenId,
      name: token.metadata?.name,
      collectionName: collectionName,
      title: collectionName,
      description: token.metadata.description,
      image: token.image.url,
      price: 0,
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      rarityRank: token.rarityRank,
      orderSnippet: token.ordersSnippet
    } as CardData;
  });

  // remove any without tokenAddress (seeing bad NFTs in my profile)
  cardData = cardData.filter((x) => x.tokenAddress);

  return cardData;
};

// ======================================================

export const refresh = async (user: string, txnHash: string, chainId: string): Promise<string> => {
  try {
    const body = {
      txnHash,
      chainId
    };

    const response = await apiPost(`/u/${user}/refresh`, {
      data: body
    });
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

    const response = await apiPost(`/u/${user}/rankVisibility`, {
      data: body
    });
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
  chainId: string
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
      revealItems: [] // TokenInfo
    };

    const response = await apiPost(`/u/${user}/reveals`, {
      data: body
    });
    return response.result as string;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ======================================================

// app.get('/u/:user/reveals', async (req: Request, res: Response) => {
//   const user = trimLowerCase(req.params.user);
//   console.log('Fetching reveals for user', user);
//   const startAfterTimestamp = parseInt(String(req.query.startAfterTimestamp)) ?? Date.now();

export const getReveals = async (user: string, startAfterTimestamp?: number): Promise<ApiResponse> => {
  const response = await apiGet(`/u/${user}/reveals`, {
    query: {
      startAfterTimestamp
    }
  });

  return response;
};
