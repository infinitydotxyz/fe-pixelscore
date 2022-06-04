import { useEffect, useRef } from 'react';
import { BGImage, CenteredContent, ReadMoreText, Spacer } from 'components/common';
import { twMerge } from 'tailwind-merge';
import { AstraNavbar, AstraNavTab } from 'components/astra/astra-navbar';
import { AstraSidebar } from 'components/astra/astra-sidebar';
import { AstraCart } from 'components/astra/astra-cart';
import { inputBorderColor } from 'utils/ui-constants';
import { CollectionTokenCache, RankTokenCache, UserTokenCache } from 'components/token-grid/token-fetcher';
import { useAppContext } from 'utils/context/AppContext';
import { useCardSelection } from 'components/astra/useCardSelection';
import { AstraFooter } from 'components/astra/astra-footer';

import { getUserRecord } from 'utils/astra-utils';
import { NFTCard, RevealOrder } from '../utils/types/be-types';
import { RevealOrderCache } from 'components/reveal-order-grid/reveal-order-fetcher';
import { TokensGrid } from 'components/token-grid/token-grid';
import { RevealOrderGrid } from 'components/reveal-order-grid/reveal-order-grid';
import { useResizeDetector } from 'react-resize-detector';
import { gridTemplate } from 'components/astra/dashboard/grid-template';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { Outlet } from 'react-router-dom';

export const DashboardPage = () => {
  const {
    currentTab,
    setCurrentTab,
    numTokens,
    setNumTokens,
    tokenFetcher,
    setTokenFetcher,
    orderFetcher,
    setOrderFetcher,
    userRecord,
    setUserRecord,
    collection,
    setCollection,
    chainId,
    setChainId,
    showCart,
    setShowCart,
    handleCheckout,
    refreshData
  } = useDashboardContext();

  const { selection, isSelected, toggleSelection, clearSelection, removeFromSelection } = useCardSelection();

  const gridRef = useRef<HTMLDivElement>(null);
  const { user } = useAppContext();

  const { width: cartWidth, ref: cartRef } = useResizeDetector();

  useEffect(() => {
    setShowCart(selection.length > 0);
  }, [selection]);

  useEffect(() => {
    gridRef.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

  useEffect(() => {
    updateFetchers();
    updatePortfolioScore();
  }, [currentTab, collection, chainId, user]);

  const updatePortfolioScore = async () => {
    if (currentTab === AstraNavTab.MyNFTs && user) {
      const userRec = await getUserRecord(user.address);

      setUserRecord(userRec);
    }
  };

  const updateFetchers = () => {
    if (currentTab === AstraNavTab.All && collection && chainId) {
      setTokenFetcher(CollectionTokenCache.shared().fetcher(collection, chainId));
      setOrderFetcher(undefined);
    } else if (currentTab === AstraNavTab.MyNFTs && user) {
      setTokenFetcher(UserTokenCache.shared().fetcher(user.address));
      setOrderFetcher(undefined);
    } else if (currentTab === AstraNavTab.Top100 && user) {
      setTokenFetcher(RankTokenCache.shared().fetcher(10, 10));
      setOrderFetcher(undefined);
    } else if (currentTab === AstraNavTab.Hot && user) {
      setTokenFetcher(RankTokenCache.shared().fetcher(7, 9));
      setOrderFetcher(undefined);
    } else if (currentTab === AstraNavTab.Pending && user) {
      setOrderFetcher(RevealOrderCache.shared().fetcher(user.address));
      setTokenFetcher(undefined);
    }
  };

  const onCardClick = (data: NFTCard) => {
    toggleSelection(data);
  };

  const onRevealOrderClick = (data: RevealOrder) => {
    console.log(data);
  };

  let tokensGrid;
  let avatarUrl;
  let name = '';
  let description = '';
  let emptyMessage = '';
  let scoreText = '';
  let numNfts = numTokens;

  switch (currentTab) {
    case AstraNavTab.All:
      avatarUrl = collection?.metadata.bannerImage;
      name = collection?.metadata.name ?? '';
      description = collection?.metadata.description ?? '';
      emptyMessage = 'Select a Collection';
      numNfts = collection?.numNfts ?? numTokens;
      break;
    case AstraNavTab.Pending:
    case AstraNavTab.MyNFTs:
      name = currentTab;
      emptyMessage = currentTab;

      if (!user) {
        emptyMessage = 'Click "Connect" to sign in';
      }
      if (userRecord && userRecord.portfolioScore !== -1) {
        scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
      }
      break;
    case AstraNavTab.Hot:
    case AstraNavTab.Top100:
      name = currentTab;
      emptyMessage = currentTab;
      break;
  }

  if (tokenFetcher) {
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

          {scoreText && <div className="text-lg whitespace-nowrap ml-3">{scoreText}</div>}
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
          extraWidth={cartWidth}
          isSelected={(data) => {
            return isSelected(data);
          }}
          onLoad={(value) => setNumTokens(value)}
        />
      </div>
    );
  } else if (orderFetcher) {
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

  const navBar = (
    <AstraNavbar
      currentTab={currentTab}
      onTabChange={(value) => {
        // blanks out the cards
        setTokenFetcher(undefined);

        // set tab so new cards will load
        setCurrentTab(value);
      }}
    />
  );

  const sidebar = (
    <AstraSidebar
      selectedCollection={collection}
      onClick={(value) => {
        // avoid clicking if already selected (avoids a network fetch)
        if (value.address !== collection?.address) {
          setCollection(value);
          setChainId(value.chainId);
        }

        setCurrentTab(AstraNavTab.All);
      }}
    />
  );

  const cart = (
    <AstraCart
      cardData={selection}
      onCheckout={() => {
        clearSelection();
        handleCheckout(selection);
      }}
      onRemove={(value) => {
        removeFromSelection(value);
      }}
    />
  );

  const footer = <AstraFooter name={name} numTokens={numTokens} onRefresh={refreshData} />;

  tokensGrid = <Outlet />;

  const contents = gridTemplate(navBar, sidebar, tokensGrid, cart, footer, gridRef, cartRef, showCart);

  return <div>{contents}</div>;
};
