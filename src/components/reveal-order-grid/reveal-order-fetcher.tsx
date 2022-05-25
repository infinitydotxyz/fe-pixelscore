import { ApiResponse } from 'utils';
import { getReveals } from 'utils/astra-utils';
import { RevealOrder } from 'utils/types/be-types';

export interface RevealOrderFetcherResult {
  ferror: boolean;
  frevealOrders: RevealOrder[];
  fcursor: number;
  fhasNextPage: boolean;
}

export class RevealOrderFetcher {
  userAddress = '';

  constructor(userAddress: string) {
    this.userAddress = userAddress;
  }
  error = false;
  cursor = 0;
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
        const results = response.result as RevealOrder[];

        let lastItem: RevealOrder | undefined;
        if (results.length > 0) {
          lastItem = results[results.length - 1];
        }

        let newOrders = results;
        if (loadMore) {
          newOrders = [...this.revealOrders, ...newOrders];
        }

        this.revealOrders = newOrders;
        this.cursor = lastItem?.timestamp ?? 0;
        this.hasNextPage = results.length > 0;
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
    return await getReveals(this.userAddress, this.cursor);
  };
}

// ========================================================================

export class RevealOrderCache {
  private static instance: RevealOrderCache;

  private cache: Map<string, RevealOrderFetcher>;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cache = new Map<string, RevealOrderFetcher>();
  }

  refresh = () => {
    this.cache = new Map<string, RevealOrderFetcher>();
  };

  fetcher(userAddress: string): RevealOrderFetcher {
    const cached = this.cache.get(userAddress);

    if (cached) {
      return cached;
    }

    const result = new RevealOrderFetcher(userAddress);
    this.cache.set(userAddress, result);

    return result;
  }
}
