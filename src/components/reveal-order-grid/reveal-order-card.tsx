import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Button, SimpleTable, SimpleTableItem, Spacer, toastError, toastSuccess } from '../common';
import { RevealOrder } from 'utils/types/be-types';
import { refreshReveal } from 'utils/astra-utils';
import { ellipsisString, httpErrorResponse, shortDateWithTime } from 'utils';
import { TokenSwiper } from './token-swiper';
import { useState } from 'react';

interface Props {
  userAddress: string;
  revealOrder: RevealOrder;
  selected: boolean;
  onClick: (data: RevealOrder) => void;
}

export const RevealOrderCard = ({ userAddress, revealOrder: inOrder, onClick, selected }: Props): JSX.Element => {
  const [revealOrder, setRevealOrder] = useState<RevealOrder>(inOrder);

  const refreshClick = async () => {
    try {
      const { status, order } = await refreshReveal(userAddress, revealOrder.txnHash, revealOrder.chainId);

      toastSuccess(status);

      if (order) {
        // replace our data
        setRevealOrder(order);
      }
    } catch (err) {
      const errStr = httpErrorResponse(err);

      toastError(`Error: ${errStr.status} ${errStr.error}`);
    }
  };

  const tableItems: SimpleTableItem[] = [];
  tableItems.push({ title: 'txnHash', value: <div className="font-bold">{ellipsisString(revealOrder.txnHash)}</div> });
  tableItems.push({ title: 'txnStatus', value: <div className="font-bold">{revealOrder.txnStatus}</div> });
  tableItems.push({ title: 'numItems', value: <div className="font-bold">{revealOrder.numItems}</div> });
  tableItems.push({ title: 'totalPrice', value: <div className="font-bold">{revealOrder.totalPrice}</div> });
  tableItems.push({
    title: 'Date',
    value: <div className="font-bold">{shortDateWithTime(new Date(revealOrder.timestamp))}</div>
  });

  return (
    <div
      className={twMerge(
        'border shadow-md',
        inputBorderColor,
        'rounded-2xl w-full relative flex flex-col dark:bg-dark-card',
        selected ? selectionOutline : ''
      )}
      style={{ aspectRatio: '4/5' }}
      onClick={() => onClick(revealOrder)}
    >
      <div className="h-full flex flex-col dark:text-dark-text">
        <TokenSwiper tokens={revealOrder.revealItems} />

        <div className="mt-3 mb-4 mx-5 flex flex-col ">
          <SimpleTable compact={true} items={tableItems} className="w-full" />

          <Spacer />

          <div className="mx-3 mt-4 flex flex-col ">
            <Button onClick={refreshClick}>Refresh</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
