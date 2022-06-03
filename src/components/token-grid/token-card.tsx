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
        'overflow-clip border',
        inputBorderColor,
        'rounded-2xl w-full relative flex flex-col',
        selected ? selectionOutline : ''
      )}
      style={{ height: heightStyle }}
      onClick={() => onClick(data)}
    >
      <div className="h-full flex flex-col">
        <div className="relative flex-1  overflow-clip">
          <BGImage src={data?.image} className="hover:scale-110 transition-all" />

          <PillBadge val={data.pixelRank} tooltip="Pixel rank" />
          <PillBadge val={data.pixelScore} tooltip="Pixel score" className="bottom-1 left-1" />
          <PillBadge val={data.pixelRankBucket} tooltip="Pixel rank bucket" className="top-1 right-1" />
        </div>

        {data?.rarityRank && (
          <div className="absolute bg-gray-100 top-3 right-3 py-1 px-3 rounded-3xl">{Math.round(data?.rarityRank)}</div>
        )}

        <div className="mt-3 mb-4 mx-3">
          <div className="font-bold truncate">{title}</div>
          <div className="text-secondary font-heading truncate">{tokenId}</div>
        </div>
      </div>
    </div>
  );
};
