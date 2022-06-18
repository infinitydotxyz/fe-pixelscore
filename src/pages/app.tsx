import { useEffect, useRef } from 'react';
import { AstraNavbar, AstraNavTab, TabUtils } from 'components/astra/astra-navbar';
import { AstraSidebar } from 'components/astra/astra-sidebar';
import { AstraCart } from 'components/astra/astra-cart';
import { useResizeDetector } from 'react-resize-detector';
import { gridTemplate } from 'components/astra/dashboard/grid-template';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const {
    collection,
    setCollection,
    setChainId,
    setGridWidth,
    showCart,
    handleCheckout,
    selection,
    clearSelection,
    removeFromSelection,
    setShowCart
  } = useDashboardContext();

  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { width: containerWidth, ref: containerRef } = useResizeDetector();

  useEffect(() => {
    if (containerWidth && containerWidth > 0) {
      setGridWidth(containerWidth);
    }
  }, [containerWidth]);

  const location = useLocation();
  useEffect(() => {
    switch (TabUtils.routeToTab(location.pathname)) {
      case AstraNavTab.Top5:
        if (selection.length > 0) {
          setShowCart(true);
        }
        break;
      case AstraNavTab.All:
      case AstraNavTab.Portfolio:
      case AstraNavTab.Pending:
      case AstraNavTab.Revealed:
        setShowCart(false);
        break;
    }
  }, [location]);

  useEffect(() => {
    if (selection.length > 0) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }, [selection]);

  useEffect(() => {
    gridRef.current?.scrollTo({ left: 0, top: 0 });
  }, [collection]);

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

  // footer disabled
  const footer = <></>; // <AstraFooter name={displayName} numTokens={numTokens} onRefresh={refreshData} />;

  const contents = gridTemplate(navBar, sidebar, <Outlet />, cart, footer, gridRef, containerRef, showCart);

  return <div>{contents}</div>;
};
