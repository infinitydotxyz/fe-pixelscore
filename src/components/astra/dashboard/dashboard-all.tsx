import { CollectionTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { useCardSelection } from '../useCardSelection';
import { DashboardBase } from './dashboard-base';

export const DashboardAll = () => {
  const { setTokenFetcher, setOrderFetcher, collection, chainId, refreshTrigger } = useDashboardContext();
  const { isSelected, toggleSelection } = useCardSelection();

  useEffect(() => {
    if (collection && chainId) {
      setTokenFetcher(CollectionTokenCache.shared().fetcher(collection, chainId));
      setOrderFetcher(undefined);
    }
  }, [collection, chainId, refreshTrigger]);

  return <DashboardBase tokensMode={true} isSelected={isSelected} toggleSelection={toggleSelection} />;
};
