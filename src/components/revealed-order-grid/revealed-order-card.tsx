import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Button, toastError } from '../common';
import { TokenInfo } from 'utils/types/be-types';
import { httpErrorResponse } from 'utils';
import { RevealedTokenImage } from './revealed-token-image';
import { updateRankVisibility } from 'utils/astra-utils';
import { useAppContext } from 'utils/context/AppContext';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { RevealOrderCache } from 'components/reveal-order-grid/reveal-order-fetcher';

interface Props {
  token: TokenInfo;
  height: number;
  selected: boolean;
  onClick: (data: TokenInfo) => void;
  onRefreshToken: (data: TokenInfo) => void;
}

export const RevealedOrderCard = ({ token, height, onClick, onRefreshToken, selected }: Props): JSX.Element => {
  const heightStyle = `${height}px`;
  const { user } = useAppContext();

  const visibleClick = async () => {
    try {
      await updateRankVisibility(
        user?.address ?? '',
        token.tokenId,
        token.collectionAddress,
        token.chainId,
        !token.pixelRankVisible
      );

      // we don't want to reload the list, so just tell the parent to reload this card
      onRefreshToken({ ...token, pixelRankVisible: !token.pixelRankVisible });

      // we need to dump the revealed cache so if they open the Revealed tab it will load the new info
      RevealOrderCache.shared().refresh();
    } catch (err) {
      const errStr = httpErrorResponse(err);

      toastError(`Error: ${errStr.status} ${errStr.error}`);
    }
  };

  return (
    <div
      className={twMerge(
        'border',
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
          <div className="font-bold truncate">{token.collectionName ?? 'Unknown'}</div>

          <VisibilityIcon
            visible={token.pixelRankVisible}
            message={token.pixelRankVisible ? 'Rank is visible' : 'Rank is hidden'}
          />

          <div className="mx-3 mt-4 flex flex-col ">
            <Button variant="outline" onClick={visibleClick}>
              {token.pixelRankVisible ? 'Hide rank' : 'Make rank visible'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================================================================

interface Props2 {
  visible?: boolean;
  message?: string;
}

const VisibilityIcon = ({ visible, message }: Props2) => {
  if (visible === undefined) {
    return <></>;
  }

  let icon = <MdVisibility color="#0a0" className="h-5 w-5" />;

  if (!visible) {
    icon = <MdVisibilityOff color="#a00" className="h-5 w-5" />;
  }

  return (
    <div className="flex items-center">
      <div className="mr-3">{icon}</div>
      <div>{message}</div>
    </div>
  );
};