import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardTop = () => {
  const { setTokenFetcher, refreshTrigger, setDisplayName } = useDashboardContext();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(10, 10));

    setDisplayName('Top');
  }, [refreshTrigger]);

  return <DashboardBase route={AstraNavTab.Top100} />;
};
