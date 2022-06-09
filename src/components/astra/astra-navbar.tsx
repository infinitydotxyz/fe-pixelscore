import { ConnectButton, NextLink, RoundButton, Spacer, SVG, ToggleTab, useToggleTab } from 'components/common';
import { inputBorderColor, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';

export enum AstraNavTab {
  All = 'All',
  Top100 = 'Top 100',
  Pending = 'Pending',
  Hot = 'Hot',
  MyNFTs = 'My NFTs'
}

export const AstraNavbar = () => {
  const [currentTab, setCurrentTab] = useState(AstraNavTab.All);
  const { setTokenFetcher, setOrderFetcher, showCart, setShowCart } = useDashboardContext();

  const { options, selected } = useToggleTab(
    [AstraNavTab.All, AstraNavTab.Top100, AstraNavTab.Hot, AstraNavTab.MyNFTs, AstraNavTab.Pending],
    currentTab
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentTab(TabUtils.routeToTab(location.pathname));
  }, [location]);

  const tabBar = (
    <div className={twMerge(inputBorderColor, 'flex justify-center')}>
      <ToggleTab
        options={options}
        selected={selected}
        onChange={(value) => {
          // clear out on click so cards will be blank before loading
          setTokenFetcher(undefined);
          setOrderFetcher(undefined);

          navigate(TabUtils.tabToRoute(value as AstraNavTab));
        }}
        altStyle={true}
        equalWidths={false}
      />
    </div>
  );

  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div className={twMerge('flex px-8 py-2 items-center bg-slate-200 border-b shadow-md relative', inputBorderColor)}>
      <NextLink href="/" className="flex items-center">
        <SVG.miniLogo className={largeIconButtonStyle} />
        <div className="ml-4 text-2xl font-bold">Astra</div>
      </NextLink>
      <Spacer />

      {tabBar}
      <Spacer />
      <ConnectButton />
      <RoundButton
        className="ml-4"
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        <SVG.cart className={largeIconButtonStyle} />
      </RoundButton>
    </div>
  );
};

// =========================================================

export class TabUtils {
  static tabToRoute = (tab: AstraNavTab): string => {
    switch (tab) {
      case AstraNavTab.All:
        return '/dashboard/all';
      case AstraNavTab.Pending:
        return '/dashboard/pending';
      case AstraNavTab.MyNFTs:
        return '/dashboard/nfts';
      case AstraNavTab.Hot:
        return '/dashboard/hot';
      case AstraNavTab.Top100:
        return '/dashboard/top';
    }
  };

  static routeToTab = (route: string): AstraNavTab => {
    switch (route) {
      case '/dashboard/all':
        return AstraNavTab.All;
      case '/dashboard/pending':
        return AstraNavTab.Pending;
      case '/dashboard/nfts':
        return AstraNavTab.MyNFTs;
      case '/dashboard/hot':
        return AstraNavTab.Hot;
      case '/dashboard/top':
        return AstraNavTab.Top100;
    }

    return AstraNavTab.All;
  };
}
