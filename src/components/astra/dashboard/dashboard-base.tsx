import { BGImage, CenteredContent, ReadMoreText, Spacer } from 'components/common';
import { twMerge } from 'tailwind-merge';
import { inputBorderColor } from 'utils/ui-constants';

import { NFTCard, RevealOrder } from 'utils/types/be-types';
import { TokensGrid } from 'components/token-grid/token-grid';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { RevealOrderGrid } from 'components/reveal-order-grid/reveal-order-grid';

interface Props {
  tokensMode: boolean;
}

export const DashboardBase = ({ tokensMode }: Props) => {
  const { numTokens, setNumTokens, tokenFetcher, orderFetcher, collection, isSelected, toggleSelection } =
    useDashboardContext();

  const extraWidth = 0;

  const onCardClick = (data: NFTCard) => {
    toggleSelection(data);
  };

  let tokensGrid;

  const onRevealOrderClick = (data: RevealOrder) => {
    console.log(data);
  };

  const avatarUrl = collection?.metadata.bannerImage;
  const name = collection?.metadata.name ?? '';
  const description = collection?.metadata.description ?? '';
  const emptyMessage = 'Select a Collection';
  const numNfts = collection?.numNfts ?? numTokens;

  if (tokenFetcher && tokensMode) {
    const header = (
      <div className={twMerge(inputBorderColor, 'flex items-center bg-gray-100 border-b px-8 py-3')}>
        <BGImage src={avatarUrl} className="mr-6 h-16 w-36 rounded-xl" />
        <div className="flex flex-col items-start">
          <div className="tracking-tight text-theme-light-800 font-bold text-xl text-center  ">{name}</div>
          <div className="max-w-3xl">
            <ReadMoreText text={description} min={50} ideal={160} max={10000} />
          </div>
        </div>
        <Spacer />
        <div className="flex flex-col items-end">
          <div className="text-lg whitespace-nowrap ml-3">{numNfts} Nfts</div>

          {'scoreText' && <div className="text-lg whitespace-nowrap ml-3">{'scoreText'}</div>}
        </div>
      </div>
    );

    tokensGrid = (
      <div className="flex flex-col h-full w-full">
        {header}
        <TokensGrid
          tokenFetcher={tokenFetcher}
          className="px-8 py-6"
          onClick={onCardClick}
          extraWidth={extraWidth}
          isSelected={(data) => {
            return isSelected(data);
          }}
          onLoad={(value) => setNumTokens(value)}
        />
      </div>
    );
  } else if (orderFetcher && !tokensMode) {
    tokensGrid = (
      <div className="flex flex-col h-full w-full">
        <RevealOrderGrid
          orderFetcher={orderFetcher}
          className="px-8 py-6"
          onClick={onRevealOrderClick}
          isSelected={(data) => {
            if (data) {
              return false;
            }
            return false; // isSelected(data);
          }}
          onLoad={(value) => setNumTokens(value)}
        />
      </div>
    );
  } else {
    tokensGrid = <CenteredContent>{emptyMessage}</CenteredContent>;
  }

  return tokensGrid;
};
