import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage, Button, toastError, toastSuccess } from '../common';
import { RevealOrder } from 'utils/types/be-types';
import { ReactNode } from 'react';
import { refreshReveal } from 'utils/astra-utils';
import { httpErrorResponse } from 'utils';

interface Props {
  userAddress: string;
  revealOrder: RevealOrder;
  height: number;
  selected: boolean;
  onClick: (data: RevealOrder) => void;
}

export const RevealOrderCard = ({ userAddress, revealOrder, height, onClick, selected }: Props): JSX.Element => {
  const title = revealOrder?.txnHash ?? '';
  const tokenId = revealOrder?.txnStatus ?? '';

  const heightStyle = `${height}px`;

  const refreshClick = async () => {
    // console.log('cards revealOrder');
    // console.log(JSON.stringify(revealOrder, null, '  '));

    try {
      const result = await refreshReveal(userAddress, revealOrder.txnHash, revealOrder.chainId);

      toastSuccess(result);
    } catch (err) {
      const errStr = httpErrorResponse(err);

      toastError(`Error: ${errStr.status} ${errStr.error}`);
    }
  };

  const tokens = (): ReactNode => {
    const tokes = revealOrder.revealItems.map((e) => {
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
      onClick={() => onClick(revealOrder)}
    >
      <div className="h-full flex flex-col">
        {tokens()}

        <div className="mt-3 mb-4 mx-3 flex flex-col ">
          <div className="font-bold truncate">{title}</div>
          <div className="text-secondary font-heading truncate">{tokenId}</div>

          <div className=" mx-3 mt-2 flex flex-col ">
            <Button onClick={refreshClick}>Refresh</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
