import React, { useState, useEffect } from 'react';
import { CollectionSearchArrayDto, CollectionSearchDto } from '../../utils/types/collection-types';
import { BaseCollection } from '@infinityxyz/lib/types/core';
import { CollectionListItem } from './collection-list-item';
import { fetchCollections } from './astra-utils';
import { ScrollLoader } from '../common';
import { useIsMounted } from 'hooks/useIsMounted';

interface Props {
  query: string;
  selectedCollection?: BaseCollection;
  className?: string;
  onClick: (collection: CollectionSearchDto) => void;
  // called on first load so the we can select the first collection to display
  onLoad: (collections: CollectionSearchDto[]) => void;
}

export const CollectionList = ({ query, className = '', onClick, selectedCollection, onLoad }: Props) => {
  const [collections, setCollections] = useState<CollectionSearchDto[]>([]);
  const [error, setError] = useState(false);
  const [cursor, setCursor] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    handleFetch('');
  }, [query]);

  const handleFetch = async (passedCursor: string) => {
    const response = await fetchCollections(query, passedCursor);

    // can't update react state after unmount
    if (!isMounted()) {
      return;
    }

    if (response.error) {
      setError(response.error);
      setCollections([]);
      setCursor('');
      setHasNextPage(false);
    } else {
      const result = response.result as CollectionSearchArrayDto;
      if (passedCursor) {
        setCollections([...collections, ...result.data]);
      } else {
        setCollections(result.data);

        // called on first load
        onLoad(result.data);
      }
      setCursor(result.cursor);
      setHasNextPage(result.hasNextPage);
    }
  };

  if (error) {
    console.error(error);
    return (
      <div className={className}>
        <div>Unable to load data.</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* pt-4 is for the first items selection rect, needs some space, or it clips */}
      <div className="flex flex-col space-y-3 pt-4">
        {collections.map((collection) => (
          <CollectionListItem
            key={collection.slug}
            collection={collection}
            onClick={onClick}
            selected={collection.address === selectedCollection?.address}
          />
        ))}
      </div>

      {hasNextPage && (
        <ScrollLoader
          onFetchMore={async () => {
            handleFetch(cursor);
          }}
        />
      )}
    </div>
  );
};