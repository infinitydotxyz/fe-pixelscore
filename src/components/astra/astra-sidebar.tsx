import { useState } from 'react';
import { CollectionList } from 'components/astra/collection-list';
import { DebouncedTextField } from 'components/common';
import { CollectionInfo } from 'utils/types/collection-types';
import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';

interface Props {
  onClick: (value: CollectionInfo) => void;
  onLoad: (value: CollectionInfo) => void;
  selectedCollection?: CollectionInfo;
}

export const AstraSidebar = ({ onClick, onLoad, selectedCollection }: Props) => {
  const [query, setQuery] = useState('');

  const handleClick = async (collection: CollectionInfo, sendOnLoad: boolean) => {
    if (sendOnLoad) {
      onLoad(collection);
    } else {
      onClick(collection);
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
      <div className={twMerge(inputBorderColor, 'px-4 py-4 bg-dark-bg border-r')}>
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
