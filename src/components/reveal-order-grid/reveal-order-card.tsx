import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage, Button, SimpleTable, SimpleTableItem, toastError, toastSuccess } from '../common';
import { RevealOrder } from 'utils/types/be-types';
import { ReactNode } from 'react';
import { refreshReveal } from 'utils/astra-utils';
import { ellipsisString, httpErrorResponse, shortDateWithTime } from 'utils';

interface Props {
  userAddress: string;
  revealOrder: RevealOrder;
  height: number;
  selected: boolean;
  onClick: (data: RevealOrder) => void;
}

export const RevealOrderCard = ({ userAddress, revealOrder, height, onClick, selected }: Props): JSX.Element => {
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

  const tokenItem = (val: number | string | undefined, className = 'top-1 left-1') => {
    if (val) {
      return (
        <div className={twMerge(className, 'absolute bg-white font-bold rounded-full px-3 shadow-lg ')}>{val}</div>
      );
    }
  };

  const tokens = (): ReactNode => {
    const result = revealOrder.revealItems.map((e) => {
      return (
        <div key={e.collectionAddress + e.tokenId} className="flex-1 relative mb-1 min-h-[80px] overflow-clip">
          <BGImage src={e?.imageUrl} className="hover:scale-110 transition-all  " />

          {tokenItem(e.pixelRank)}
          {tokenItem(e.pixelScore, 'bottom-1 left-1')}
          {tokenItem(e.tokenId, 'top-1 right-1')}
          <div>{e.pixelRank}</div>
        </div>
      );
    });

    return <div className="flex flex-col overflow-y-auto overflow-x-clip h-full w-full">{result}</div>;
  };

  const tableItems: SimpleTableItem[] = [];
  tableItems.push({ title: 'txnHash', value: <div className="font-bold">{ellipsisString(revealOrder.txnHash)}</div> });
  tableItems.push({ title: 'txnStatus', value: <div className="font-bold">{revealOrder.txnStatus}</div> });
  tableItems.push({ title: 'numItems', value: <div className="font-bold">{revealOrder.numItems}</div> });
  tableItems.push({ title: 'totalPrice', value: <div className="font-bold">{revealOrder.totalPrice}</div> });
  tableItems.push({
    title: 'totalPrice',
    value: <div className="font-bold">{shortDateWithTime(new Date(revealOrder.timestamp))}</div>
  });

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
          <SimpleTable items={tableItems} className="w-full" />

          <div className="mx-3 mt-2 flex flex-col ">
            <Button onClick={refreshClick}>Refresh</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
