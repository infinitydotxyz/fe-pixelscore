import { ApiResponse } from 'utils';
import { CollectionInfo, NFTArrayResult } from '../../utils/types/collection-types';
import {
  fetchTokens,
  fetchTokensByRank,
  fetchUserTokens,
  tokenInfosToCardData,
  tokensToCardData
} from 'utils/astra-utils';
import { NFTCard, NFTToken, TokenInfo } from 'utils/types/be-types';

export interface TokenFetcherResult {
  ferror: boolean;
  fcardData: NFTCard[];
  fcursor: string;
  fhasNextPage: boolean;
}

export class TokenFetcher {
  error = false;
  cursor = '';
  collectionName = '';
  hasNextPage = false;
  cardData: NFTCard[] = [];

  fetch = async (loadMore: boolean): Promise<TokenFetcherResult> => {
    let callFetch = true;

    // if first load, but we have some cache, don't fetch
    if (!loadMore) {
      if (this.cardData.length > 0) {
        callFetch = false;
      }
    }

    if (callFetch) {
      const response = await this.doFetch();

      if (response.error) {
        this.error = response.error !== null;
        console.error(response.error);
      } else {
        const result = response.result as NFTArrayResult<unknown>;
        let newCards = this.toCardData(result);

        if (loadMore) {
          newCards = [...this.cardData, ...newCards];
        }

        this.cardData = newCards;
        this.cursor = result.cursor;
        this.hasNextPage = result.hasNextPage;
      }
    }

    return { fcursor: this.cursor, fhasNextPage: this.hasNextPage, fcardData: this.cardData, ferror: this.error };
  };

  // override this
  protected doFetch = async (): Promise<ApiResponse> => {
    return { status: 0 };
  };

  // override this
  protected toCardData = (data: NFTArrayResult<unknown>): NFTCard[] => {
    const result = data as NFTArrayResult<TokenInfo>;
    return tokenInfosToCardData(result.data);
  };
}

// ========================================================================

export class CollectionTokenCache {
  private static instance: CollectionTokenCache;

  private cache: Map<string, TokenFetcher>;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cache = new Map<string, TokenFetcher>();
  }

  refresh = () => {
    this.cache = new Map<string, TokenFetcher>();
  };

  fetcher(collection: CollectionInfo, chainId: string): TokenFetcher {
    const key = `${collection.address}:${chainId}`;
    const cached = this.cache.get(key);

    if (cached) {
      return cached;
    }

    const result = new CollectionTokenFetcher(collection, chainId);
    this.cache.set(key, result);

    return result;
  }
}

// ========================================================================

class CollectionTokenFetcher extends TokenFetcher {
  private collection: CollectionInfo;
  private chainId: string;

  constructor(collection: CollectionInfo, chainId: string) {
    super();

    this.collection = collection;
    this.chainId = chainId;

    // NFTToken doesn't have a collection name from server, so setting it here
    this.collectionName = collection.name ?? 'Unknown';
  }

  // override
  protected doFetch = async (): Promise<ApiResponse> => {
    return await fetchTokens(this.collection.address, this.chainId, this.cursor);
  };
}

// ========================================================================

export class UserTokenCache {
  private static instance: UserTokenCache;
  private cachedFetcher: TokenFetcher | undefined;
  private cachedAddress: string;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cachedFetcher = undefined;
    this.cachedAddress = '';
  }

  refresh = () => {
    this.cachedFetcher = undefined;
    this.cachedAddress = '';
  };

  fetcher(userAddress: string): TokenFetcher {
    if (userAddress === this.cachedAddress && this.cachedFetcher) {
      return this.cachedFetcher;
    }

    this.cachedFetcher = new UserTokenFetcher(userAddress);
    this.cachedAddress = userAddress;

    return this.cachedFetcher;
  }
}

// ========================================================================

class UserTokenFetcher extends TokenFetcher {
  private userAddress: string;

  constructor(userAddress: string) {
    super();
    this.userAddress = userAddress;

    // NFTToken doesn't have a collection name from server, so setting it here
    this.collectionName = 'Unknown';
  }

  // override
  protected doFetch = async (): Promise<ApiResponse> => {
    return fetchUserTokens(this.userAddress, this.cursor);
  };

  // override
  protected toCardData = (data: NFTArrayResult<unknown>): NFTCard[] => {
    const result = data as NFTArrayResult<NFTToken>;
    return tokensToCardData(result.data);
  };
}

// ========================================================================

export class RankTokenCache {
  private static instance: RankTokenCache;

  private cache: Map<string, TokenFetcher>;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cache = new Map<string, TokenFetcher>();
  }

  refresh = () => {
    this.cache = new Map<string, TokenFetcher>();
  };

  fetcher(minRank: number, maxRank: number): TokenFetcher {
    const key = `${minRank}:${maxRank}`;
    const cached = this.cache.get(key);

    if (cached) {
      return cached;
    }

    const result = new RankTokenFetcher(minRank, maxRank);
    this.cache.set(key, result);

    return result;
  }
}

// ========================================================================

class RankTokenFetcher extends TokenFetcher {
  private minRank: number;
  private maxRank: number;

  constructor(minRank: number, maxRank: number) {
    super();

    this.minRank = minRank;
    this.maxRank = maxRank;

    this.collectionName = 'Unknown';
  }

  // override
  protected doFetch = async (): Promise<ApiResponse> => {
    return await fetchTokensByRank(this.minRank, this.maxRank, this.cursor);
  };
}
