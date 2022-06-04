import { RevealOrderCache } from 'components/reveal-order-grid/reveal-order-fetcher';
import { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { useCardSelection } from '../useCardSelection';
import { DashboardBase } from './dashboard-base';

export const DashboardPending = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger } = useDashboardContext();
  const { user } = useAppContext();
  const { isSelected, toggleSelection } = useCardSelection();

  useEffect(() => {
    if (user) {
      setOrderFetcher(RevealOrderCache.shared().fetcher(user.address));
      setTokenFetcher(undefined);
    }
  }, [user, refreshTrigger]);

  return <DashboardBase tokensMode={false} isSelected={isSelected} toggleSelection={toggleSelection} />;
};
