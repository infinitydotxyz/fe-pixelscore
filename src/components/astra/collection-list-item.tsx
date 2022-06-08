import React from 'react';
import { BGImage } from 'components/common';
import { CollectionInfo } from '../../utils/types/collection-types';
import { twMerge } from 'tailwind-merge';
import { inputBorderColor, selectionOutline } from 'utils/ui-constants';

interface Props2 {
  collection: CollectionInfo;
  selected: boolean;
  onClick: (collection: CollectionInfo) => void;
}

export const CollectionListItem = ({ collection, onClick, selected }: Props2) => {
  const avatarUrl = collection.bannerImage || collection.profileImage;

  return (
    <div className="relative">
      <div
        className={twMerge(
          'w-full cursor-pointer border bg-white rounded-lg overflow-clip h-24',
          inputBorderColor,
          selected ? selectionOutline : ''
        )}
        onClick={() => onClick(collection)}
      >
        <BGImage src={avatarUrl} />

        <div className="absolute top-2 left-2 bottom-2 right-2 flex flex-col items-center justify-center">
          <div className=" text-center tracking-tight leading-6 text-2xl font-bold text-white text-shadow">
            {collection.name}
          </div>
        </div>
      </div>
    </div>
  );
};
