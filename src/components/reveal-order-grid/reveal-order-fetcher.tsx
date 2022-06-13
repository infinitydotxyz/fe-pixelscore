import { ApiResponse } from 'utils';
import { getReveals } from 'utils/astra-utils';
import { RevealOrder } from 'utils/types/be-types';

export interface RevealOrderFetcherResult {
  ferror: boolean;
  frevealOrders: RevealOrder[];
  fcursor: string;
  fhasNextPage: boolean;
}

export class RevealOrderFetcher {
  userAddress = '';
  isCompleted = false;

  constructor(userAddress: string, isCompleted: boolean) {
    this.userAddress = userAddress;
    this.isCompleted = isCompleted;
  }

  error = false;
  cursor = '';
  hasNextPage = false;
  revealOrders: RevealOrder[] = [];

  fetch = async (loadMore: boolean): Promise<RevealOrderFetcherResult> => {
    let callFetch = true;

    // if first load, but we have some cache, don't fetch
    if (!loadMore) {
      if (this.revealOrders.length > 0) {
        callFetch = false;
      }
    }

    if (callFetch) {
      const response = await this.doFetch();

      if (response.error) {
        this.error = response.error !== null;
        console.error(response.error);
      } else {
        const { data, cursor, hasNextPage } = response.result;

        let newOrders = data;
        if (loadMore) {
          newOrders = [...this.revealOrders, ...newOrders];
        }

        this.revealOrders = newOrders;
        this.cursor = cursor ?? '';
        this.hasNextPage = hasNextPage;
      }
    }

    return {
      fcursor: this.cursor,
      fhasNextPage: this.hasNextPage,
      frevealOrders: this.revealOrders,
      ferror: this.error
    };
  };

  // override this
  protected doFetch = async (): Promise<ApiResponse> => {
    return await getReveals(this.userAddress, this.cursor, this.isCompleted);
  };
}

// ========================================================================

export class RevealOrderCache {
  private static instance: RevealOrderCache;

  private cacheCompleted: Map<string, RevealOrderFetcher>;
  private cachePending: Map<string, RevealOrderFetcher>;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cachePending = new Map<string, RevealOrderFetcher>();
    this.cacheCompleted = new Map<string, RevealOrderFetcher>();
  }

  refresh = () => {
    this.cachePending = new Map<string, RevealOrderFetcher>();
    this.cacheCompleted = new Map<string, RevealOrderFetcher>();
  };

  fetcher(userAddress: string, isCompleted: boolean): RevealOrderFetcher {
    let cache = this.cachePending;
    if (isCompleted) {
      cache = this.cacheCompleted;
    }

    const cached = cache.get(userAddress);
    if (cached) {
      return cached;
    }

    const result = new RevealOrderFetcher(userAddress, isCompleted);
    cache.set(userAddress, result);

    return result;
  }
}
