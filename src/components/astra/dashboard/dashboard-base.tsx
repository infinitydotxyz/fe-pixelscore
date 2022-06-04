import { CenteredContent } from 'components/common';
import { NFTCard, RevealOrder } from 'utils/types/be-types';
import { TokensGrid } from 'components/token-grid/token-grid';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { RevealOrderGrid } from 'components/reveal-order-grid/reveal-order-grid';
import { AstraNavTab } from '../astra-navbar';
import { useAppContext } from 'utils/context/AppContext';
// import { GridHeader } from './grid-header';

interface Props {
  route: AstraNavTab;
}

export const DashboardBase = ({ route }: Props) => {
  const { setNumTokens, tokenFetcher, orderFetcher, isSelected, toggleSelection } = useDashboardContext();

  const { user } = useAppContext();
  const extraWidth = 0;

  const onCardClick = (data: NFTCard) => {
    toggleSelection(data);
  };

  let tokensGrid;

  const onRevealOrderClick = (data: RevealOrder) => {
    console.log(data);
  };

  let emptyMessage = '';

  switch (route) {
    case AstraNavTab.All:
      emptyMessage = 'Select a Collection';
      break;
    case AstraNavTab.Pending:
    case AstraNavTab.MyNFTs:
      emptyMessage = route;

      if (!user) {
        emptyMessage = 'Click "Connect" to sign in';
      }
      break;
    case AstraNavTab.Hot:
    case AstraNavTab.Top100:
      emptyMessage = route;
      break;
  }

  if (tokenFetcher && route !== AstraNavTab.Pending) {
    tokensGrid = (
      <div className="flex flex-col h-full w-full">
        {/* <GridHeader route={route} vertical={false} /> */}
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
  } else if (orderFetcher && route === AstraNavTab.Pending) {
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
