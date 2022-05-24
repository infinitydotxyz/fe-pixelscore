import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage } from '../common';
import { RevealOrder } from 'utils/types/be-types';
import { ReactNode } from 'react';

interface Props {
  data: RevealOrder;
  height: number;
  selected: boolean;
  onClick: (data: RevealOrder) => void;
}

export const RevealOrderCard = ({ data, height, onClick, selected }: Props): JSX.Element => {
  const title = data?.txnHash ?? '';
  const tokenId = data?.txnStatus ?? '';

  const heightStyle = `${height}px`;

  const tokens = (): ReactNode => {
    const tokes = data.revealItems.map((e) => {
      return (
        <div key={e.collectionAddress + e.tokenId} className="flex-1 m-2 overflow-clip">
          <BGImage src={e?.imageUrl} className="hover:scale-110 transition-all" />
        </div>
      );
    });

    return tokes;
  };

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
        {tokens()}

        <div className="mt-3 mb-4 mx-3">
          <div className="font-bold truncate">{title}</div>
          <div className="text-secondary font-heading truncate">{tokenId}</div>
        </div>
      </div>
    </div>
  );
};
