import { CenteredContent } from 'components/common';
import { NFTCard, RevealOrder, TokenInfo } from 'utils/types/be-types';
import { TokensGrid } from 'components/token-grid/token-grid';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { RevealOrderGrid } from 'components/reveal-order-grid/reveal-order-grid';
import { AstraNavTab } from '../astra-navbar';
import { useAppContext } from 'utils/context/AppContext';
import { RevealedOrderGrid } from 'components/revealed-order-grid/revealed-order-grid';
import { GridHeader } from './grid-header';

interface Props {
  route: AstraNavTab;
}

export const DashboardBase = ({ route }: Props) => {
  const { setNumTokens, tokenFetcher, orderFetcher, isSelected, isSelectable, toggleSelection, gridWidth } =
    useDashboardContext();

  const { user } = useAppContext();

  const onCardClick = (data: NFTCard) => {
    toggleSelection(data);
  };

  let tokensGrid;

  const onRevealOrderClick = (data: RevealOrder) => {
    console.log(data);
  };

  const onRevealedOrderClick = (data: TokenInfo) => {
    console.log(data);
  };

  let emptyMessage = '';
  let showHeader = false;

  switch (route) {
    case AstraNavTab.All:
      emptyMessage = 'Select a Collection';
      showHeader = true;
      break;
    case AstraNavTab.Portfolio:
      showHeader = true;
      emptyMessage = route;

      if (!user) {
        emptyMessage = 'Click "Connect" to sign in';
      }
      break;
    case AstraNavTab.Pending:
    case AstraNavTab.Revealed:
      emptyMessage = route;

      if (!user) {
        emptyMessage = 'Click "Connect" to sign in';
      }
      break;
    case AstraNavTab.Top5:
      showHeader = true;
      emptyMessage = route;
      break;
  }

  if (tokenFetcher && route !== AstraNavTab.Pending && route !== AstraNavTab.Revealed) {
    tokensGrid = (
      <div className="flex flex-col h-full w-full">
        {showHeader && <GridHeader route={route} />}
        <TokensGrid
          route={route}
          tokenFetcher={tokenFetcher}
          className="px-8 py-6"
          onClick={onCardClick}
          wrapWidth={gridWidth}
          isSelectable={isSelectable}
          isSelected={(data) => {
            return isSelected(data);
          }}
          onLoad={(value) => setNumTokens(value)}
        />
      </div>
    );
  } else if (orderFetcher && (route === AstraNavTab.Pending || route === AstraNavTab.Revealed)) {
    if (orderFetcher && route === AstraNavTab.Pending) {
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
      //  route === AstraNavTab.Revealed
      tokensGrid = (
        <div className="flex flex-col h-full w-full">
          <RevealedOrderGrid
            orderFetcher={orderFetcher}
            className="px-8 py-6"
            onClick={onRevealedOrderClick}
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
    }
  } else {
    tokensGrid = <CenteredContent>{emptyMessage}</CenteredContent>;
  }

  return tokensGrid;
};
