import { UserTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { useCardSelection } from '../useCardSelection';
import { DashboardBase } from './dashboard-base';

export const DashboardMyNFTs = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger } = useDashboardContext();
  const { user } = useAppContext();
  const { isSelected, toggleSelection } = useCardSelection();

  useEffect(() => {
    if (user) {
      setTokenFetcher(UserTokenCache.shared().fetcher(user.address));
      setOrderFetcher(undefined);
    }
  }, [user, refreshTrigger]);

  return <DashboardBase tokensMode={true} isSelected={isSelected} toggleSelection={toggleSelection} />;
};
