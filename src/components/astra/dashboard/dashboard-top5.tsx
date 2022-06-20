import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardTop5 = () => {
  const { setTokenFetcher, refreshTrigger, setDisplayName, showOnlyUnvisible } = useDashboardContext();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(8, 10, showOnlyUnvisible));

    setDisplayName('Top 1%');
  }, [refreshTrigger]);

  return <DashboardBase route={AstraNavTab.Top5} />;
};
