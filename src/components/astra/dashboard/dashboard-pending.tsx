import { RevealOrderCache } from 'components/reveal-order-grid/reveal-order-fetcher';
import { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardPending = () => {
  const { setOrderFetcher, refreshTrigger, setDisplayName } = useDashboardContext();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      setOrderFetcher(RevealOrderCache.shared().fetcher(user.address));

      setDisplayName('Pending');
    }
  }, [user, refreshTrigger]);

  return <DashboardBase route={AstraNavTab.Pending} />;
};
