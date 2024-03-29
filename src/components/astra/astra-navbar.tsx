import { ConnectButton, NextLink, RoundButton, Spacer, SVG, ToggleTabAlt, useToggleTab } from 'components/common';
import { inputBorderColor, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';

export enum AstraNavTab {
  All = 'All',
  Top5 = 'Top 5%',
  Pending = 'Pending',
  Revealed = 'Revealed',
  Portfolio = 'Portfolio'
}

export const AstraNavbar = () => {
  const [currentTab, setCurrentTab] = useState(AstraNavTab.All);
  const { setTokenFetcher, setOrderFetcher, showCart, setShowCart, collection } = useDashboardContext();

  const { options, selected } = useToggleTab(
    [AstraNavTab.All, AstraNavTab.Top5, AstraNavTab.Portfolio, AstraNavTab.Revealed, AstraNavTab.Pending],
    currentTab
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentTab(TabUtils.routeToTab(location.pathname));
  }, [location]);

  const tabBar = (
    <div
      className={twMerge(
        inputBorderColor,
        'absolute pointer-events-none top-0 left-0 right-0 bottom-0 flex justify-center'
      )}
    >
      <ToggleTabAlt
        className="pointer-events-auto"
        options={options}
        selected={selected}
        onChange={(value) => {
          // don't allow clicking twice on tab, don't switch if already loaded
          const current = TabUtils.routeToTab(location.pathname);

          if (current !== value) {
            // clear out on click so cards will be blank before loading
            setTokenFetcher(undefined);
            setOrderFetcher(undefined);

            const newTab = value as AstraNavTab;
            let params = '';
            if (newTab === AstraNavTab.All) {
              params = `?col=${collection?.address}`;
            }

            navigate(`${TabUtils.tabToRoute(newTab)}${params}`);
          }
        }}
        altStyle={true}
        equalWidths={false}
      />
    </div>
  );

  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div
      className={twMerge(
        'flex px-8 py-2 items-center dark:bg-dark-navbar bg-light-navbar border-b shadow-md relative',
        inputBorderColor
      )}
    >
      <NextLink href="/" className="flex items-center">
        <div className="text-4xl lg:text-3xl font-bold dark:text-dark-body text-light-body height font-pixel">
          Pixelrank
        </div>
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
        <SVG.cart className={twMerge('dark:text-dark-body text-light-body', largeIconButtonStyle)} />
      </RoundButton>
    </div>
  );
};

// =========================================================

export class TabUtils {
  static tabToRoute = (tab: AstraNavTab): string => {
    switch (tab) {
      case AstraNavTab.All:
        return '/app/all';
      case AstraNavTab.Pending:
        return '/app/pending';
      case AstraNavTab.Revealed:
        return '/app/revealed';
      case AstraNavTab.Portfolio:
        return '/app/portfolio';
      case AstraNavTab.Top5:
        return '/app/top5';
    }
  };

  static routeToTab = (route: string): AstraNavTab => {
    switch (route) {
      case '/app/all':
        return AstraNavTab.All;
      case '/app/pending':
        return AstraNavTab.Pending;
      case '/app/revealed':
        return AstraNavTab.Revealed;
      case '/app/portfolio':
        return AstraNavTab.Portfolio;
      case '/app/top5':
        return AstraNavTab.Top5;
    }

    return AstraNavTab.All;
  };
}
