import { CollectionTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardAll = () => {
  const { setTokenFetcher, collection, refreshTrigger, setDisplayName, showOnlyUnvisible } = useDashboardContext();

  const { chainId } = useAppContext();

  useEffect(() => {
    if (collection && chainId) {
      setTokenFetcher(CollectionTokenCache.shared().fetcher(collection, chainId, showOnlyUnvisible));

      setDisplayName(collection?.name ?? '');
    }
  }, [collection, chainId, refreshTrigger]);

  return <DashboardBase route={AstraNavTab.All} />;
};
