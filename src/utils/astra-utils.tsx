import { BaseToken, CardData } from '@infinityxyz/lib/types/core';
import { DEFAULT_LIMIT, ApiResponse, httpGet, httpPost, LARGE_LIMIT } from 'utils';
import { Filter } from 'utils/context/FilterContext';
import { RevealOrder, TokenInfo, UpdateRankVisibility } from './types/be-types';

export const fetchTokens = async (
  collectionAddress: string,
  chainId: string,
  cursor?: string
): Promise<ApiResponse> => {
  const filterState: Filter = {};

  filterState.orderBy = 'tokenId';
  filterState.orderDirection = 'asc';

  const response = await httpGet(`/collections/${chainId}/${collectionAddress}/nfts`, {
    limit: LARGE_LIMIT,
    cursor,
    ...filterState
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

export const tokensToCardData = (tokens: BaseToken[], collectionName: string): CardData[] => {
  let cardData = tokens.map((token) => {
    // token doesn't have a collectionName, remove from BaseToken or fix BE
    // const collectionName = token.collectionName ?? 'Unknown';

    console.log('token');
    console.log(JSON.stringify(token, null, '  '));

    const result: CardData = {
      id: token.collectionAddress + '_' + token.tokenId,
      name: token.metadata?.name,
      collectionName: collectionName,
      title: collectionName ?? 'Unknown',
      description: token.metadata.description,
      image: token.image.url || token.image.originalUrl,
      price: token.mintPrice,
      chainId: token.chainId,
      tokenAddress: token.collectionAddress,
      tokenId: token.tokenId,
      rarityRank: token.rarityRank,
      orderSnippet: token.ordersSnippet,
      collectionSlug: token.collectionSlug,
      hasBlueCheck: token.hasBlueCheck,
      address: token.collectionAddress,
      cardImage: token.image.url || token.image.originalUrl,
      imagePreview: token.image.url || token.image.originalUrl
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
