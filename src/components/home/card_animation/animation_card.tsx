import { selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage } from 'components/common';
import { NFTCard } from 'utils/types/be-types';

interface Props {
  data: NFTCard;
  height: number;
  selected: boolean;
  className?: string;
  onClick: (data: NFTCard) => void;
}

export const AnimationCard = ({ data, height, onClick, selected, className = '' }: Props): JSX.Element => {
  const title = data?.title ?? '';
  const tokenId = data?.tokenId ?? '';

  const heightStyle = `${height}px`;

  return (
    <div className={twMerge(className)}>
      <div
        className={twMerge(
          'rounded-2xl w-full dark:bg-zinc-800 bg-light-gray-100 relative flex flex-col',
          'my-4',
          selected ? selectionOutline : '',
          className
        )}
        style={{ height: heightStyle }}
        onClick={() => onClick(data)}
      >
        <div className="h-full flex flex-col">
          <div className="relative flex-1">
            {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
            <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
              <BGImage src={data?.image} className="hover:scale-110 transition-all" />
            </div>
          </div>

          <div className="my-5 dark:text-dark-body text-light-body mx-4">
            <div className="font-bold truncate text-lg">{title}</div>
            <div className="text-secondary font-heading truncate text-sm mt-1">#{tokenId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
