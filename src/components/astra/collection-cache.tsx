import { BaseCollection } from '@infinityxyz/lib/types/core';
import { httpGet } from 'utils';
import { CollectionSearchDto } from 'utils/types/collection-types';

export class CollectionCache {
  private static instance: CollectionCache;

  private cache: Map<string, BaseCollection>;

  public static shared() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private constructor() {
    this.cache = new Map<string, BaseCollection>();
  }

  async collection(collection: CollectionSearchDto): Promise<BaseCollection> {
    const key = `${collection.address}:${collection.chainId}`;
    const cached = this.cache.get(key);

    if (cached) {
      return cached;
    }

    const { result } = await httpGet(`/collections/${collection.chainId}:${collection.address}`);

    const baseCollection = result as BaseCollection;
    this.cache.set(key, baseCollection);

    return baseCollection;
  }
}
