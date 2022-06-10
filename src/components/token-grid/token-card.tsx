import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage } from '../common';
import { NFTCard } from 'utils/types/be-types';
import { PillBadge } from './pill-badge';

interface Props {
  data: NFTCard;
  height: number;
  selected: boolean;
  onClick: (data: NFTCard) => void;
}

export const TokenCard = ({ data, height, onClick, selected }: Props): JSX.Element => {
  const title = data?.title ?? '';
  const tokenId = data?.tokenId ?? '';

  const heightStyle = `${height}px`;

  return (
    <div
      className={twMerge(
        'border',
        inputBorderColor,
        'rounded-2xl w-full relative flex flex-col',
        selected ? selectionOutline : ''
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

          <PillBadge val={data.pixelRank} tooltip="Pixel rank" />
          <PillBadge val={data.pixelScore} tooltip="Pixel score" className="bottom-2 left-2" />
          <PillBadge val={data.pixelRankBucket} tooltip="Pixel rank bucket" className="top-2 right-2" />
          <PillBadge val={data.rarityRank} tooltip="Pixel rarity rank" className="top-10 left-2" />
        </div>

        <div className="mt-3 mb-4 mx-3">
          <div className="font-bold truncate">{title}</div>
          <div className="truncate">{tokenId}</div>
        </div>
      </div>
    </div>
  );
};
