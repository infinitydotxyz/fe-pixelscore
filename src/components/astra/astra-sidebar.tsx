import { BaseCollection } from '@infinityxyz/lib/types/core';
import { useState } from 'react';
import { CollectionList } from 'components/astra/collection-list';
import { DebouncedTextField, toastError } from 'components/common';
import { CollectionSearchDto } from 'utils/types/collection-types';
import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { CollectionCache } from './collection-cache';

interface Props {
  onClick: (value: BaseCollection) => void;
  onLoad: (value: BaseCollection) => void;
  selectedCollection?: BaseCollection;
}

export const AstraSidebar = ({ onClick, onLoad, selectedCollection }: Props) => {
  const [query, setQuery] = useState('');

  const handleClick = async (collection: CollectionSearchDto, sendOnLoad: boolean) => {
    const result = await CollectionCache.shared().collection(collection);

    if (result) {
      if (sendOnLoad) {
        onLoad(result);
      } else {
        onClick(result);
      }
    } else {
      toastError('Collection invalid');
    }
  };

  const collectionsList = (
    <CollectionList
      query={query}
      selectedCollection={selectedCollection}
      onClick={(c) => handleClick(c, false)}
      onLoad={(collections) => {
        // select first collection
        if (collections.length > 0) {
          handleClick(collections[0], true);
        }
      }}
    />
  );

  return (
    <div className="flex flex-col h-full">
      <div className={twMerge(inputBorderColor, 'px-4 py-4 bg-slate-200 border-r')}>
        <DebouncedTextField
          value={query}
          placeholder="Search"
          onChange={(value) => {
            setQuery(value);
          }}
        />
      </div>

      <div className={twMerge(inputBorderColor, 'overflow-y-scroll h-full overflow-x-hidden w-full px-4 border-t')}>
        {collectionsList}
      </div>
    </div>
  );
};
