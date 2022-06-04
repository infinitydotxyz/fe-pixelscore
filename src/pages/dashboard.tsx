import { useEffect, useRef } from 'react';
import { AstraNavbar } from 'components/astra/astra-navbar';
import { AstraSidebar } from 'components/astra/astra-sidebar';
import { AstraCart } from 'components/astra/astra-cart';
import { AstraFooter } from 'components/astra/astra-footer';
import { useResizeDetector } from 'react-resize-detector';
import { gridTemplate } from 'components/astra/dashboard/grid-template';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { Outlet, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const {
    numTokens,
    collection,
    setCollection,
    setChainId,
    showCart,
    handleCheckout,
    refreshData,
    displayName,
    selection,
    clearSelection,
    removeFromSelection
  } = useDashboardContext();

  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { width: cartWidth, ref: cartRef } = useResizeDetector();

  console.log(cartWidth);

  useEffect(() => {
    gridRef.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

  // let avatarUrl;
  // let name = '';
  // let description = '';
  // let emptyMessage = '';
  // let scoreText = '';
  // let numNfts = numTokens;

  // switch (currentTab) {
  //   case AstraNavTab.All:
  //     avatarUrl = collection?.metadata.bannerImage;
  //     name = collection?.metadata.name ?? '';
  //     description = collection?.metadata.description ?? '';
  //     emptyMessage = 'Select a Collection';
  //     numNfts = collection?.numNfts ?? numTokens;
  //     break;
  //   case AstraNavTab.Pending:
  //   case AstraNavTab.MyNFTs:
  //     name = currentTab;
  //     emptyMessage = currentTab;

  //     if (!user) {
  //       emptyMessage = 'Click "Connect" to sign in';
  //     }
  //     if (userRecord && userRecord.portfolioScore !== -1) {
  //       scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
  //     }
  //     break;
  //   case AstraNavTab.Hot:
  //   case AstraNavTab.Top100:
  //     name = currentTab;
  //     emptyMessage = currentTab;
  //     break;
  // }

  const navBar = <AstraNavbar />;

  const sidebar = (
    <AstraSidebar
      selectedCollection={collection}
      onClick={(value) => {
        // avoid clicking if already selected (avoids a network fetch)
        if (value.address !== collection?.address) {
          setCollection(value);
          setChainId(value.chainId);
        }

        navigate('all');
      }}
      onLoad={(value) => {
        if (value.address !== collection?.address) {
          setCollection(value);
          setChainId(value.chainId);
        }
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

  const footer = <AstraFooter name={displayName} numTokens={numTokens} onRefresh={refreshData} />;

  const contents = gridTemplate(navBar, sidebar, <Outlet />, cart, footer, gridRef, cartRef, showCart);

  return <div>{contents}</div>;
};
