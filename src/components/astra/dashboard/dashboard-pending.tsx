import { RevealOrderCache } from 'components/reveal-order-grid/reveal-order-fetcher';
import { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { DashboardBase } from './dashboard-base';

export const DashboardPending = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger, setDisplayName } = useDashboardContext();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      setOrderFetcher(RevealOrderCache.shared().fetcher(user.address));
      setTokenFetcher(undefined);

      setDisplayName('Pending');
    }
  }, [user, refreshTrigger]);

  return <DashboardBase tokensMode={false} />;
};
