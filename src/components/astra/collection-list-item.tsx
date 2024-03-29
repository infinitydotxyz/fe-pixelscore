import { BGImage } from 'components/common';
import { CollectionInfo } from '../../utils/types/collection-types';
import { twMerge } from 'tailwind-merge';
import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { HelpTip } from './helptip';
import { BlueCheckBadge } from 'components/token-grid/pill-badge';
import { truncateStr } from 'utils';

interface Props2 {
  collection: CollectionInfo;
  selected: boolean;
  onClick: (collection: CollectionInfo) => void;
}

export const CollectionListItem = ({ collection, onClick, selected }: Props2) => {
  const avatarUrl = collection.bannerImage || collection.profileImage;

  const tooltip = (
    <div>
      <div>{collection.name}</div>
      <div>{truncateStr(collection.description)}</div>
    </div>
  );

  return (
    // this wrapper div is needed, otherwise the tooltip gets top margin from the space-y value on the list
    <div>
      <HelpTip content={tooltip} placement="right">
        <div className="relative">
          <div
            className={twMerge(
              'w-full cursor-pointer rounded-lg overflow-clip h-24',
              inputBorderColor,
              selected ? selectionOutline : ''
            )}
            onClick={() => onClick(collection)}
          >
            <BGImage src={avatarUrl} />

            <div className="absolute rounded-lg top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-black bg-opacity-60">
              <div className="p-1 text-center tracking-tight leading-6 text-xl font-bold text-white text-shadow">
                {truncateStr(collection.name, 40)}
              </div>
            </div>

            <BlueCheckBadge val={collection.hasBlueCheck} />
          </div>
        </div>
      </HelpTip>
    </div>
  );
};
