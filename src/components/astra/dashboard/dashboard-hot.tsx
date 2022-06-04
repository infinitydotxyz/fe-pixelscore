import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardHot = () => {
  const { setTokenFetcher, refreshTrigger, setDisplayName } = useDashboardContext();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(7, 9));

    setDisplayName('Hot');
  }, [refreshTrigger]);

  return <DashboardBase route={AstraNavTab.Hot} />;
};
