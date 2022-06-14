import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Button, toastError } from '../common';
import { TokenInfo } from 'utils/types/be-types';
import { httpErrorResponse } from 'utils';
import { RevealedTokenImage } from './revealed-token-image';

interface Props {
  token: TokenInfo;
  height: number;
  selected: boolean;
  onClick: (data: TokenInfo) => void;
}

export const RevealedOrderCard = ({ token, height, onClick, selected }: Props): JSX.Element => {
  const heightStyle = `${height}px`;

  const visibleClick = async () => {
    try {
      // dd
    } catch (err) {
      const errStr = httpErrorResponse(err);

      toastError(`Error: ${errStr.status} ${errStr.error}`);
    }
  };

  return (
    <div
      className={twMerge(
        'border shadow-md',
        inputBorderColor,
        'rounded-2xl w-full relative flex flex-col',
        selected ? selectionOutline : ''
      )}
      style={{ height: heightStyle }}
      onClick={() => onClick(token)}
    >
      <div className="h-full flex flex-col">
        <RevealedTokenImage token={token} />

        <div className="mt-3 mb-4 mx-5 flex flex-col ">
          <div className="mx-3 mt-4 flex flex-col ">
            <Button onClick={visibleClick}>Make Publicly Visible</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
