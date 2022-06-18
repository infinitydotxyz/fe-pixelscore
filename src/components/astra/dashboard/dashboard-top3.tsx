import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardTop3 = () => {
  const { setTokenFetcher, refreshTrigger, setDisplayName } = useDashboardContext();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(9, 9));

    setDisplayName('Top 1%');
  }, [refreshTrigger]);

  return <DashboardBase route={AstraNavTab.Top3} />;
};
