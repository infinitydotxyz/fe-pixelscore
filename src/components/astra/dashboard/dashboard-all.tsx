import { CollectionTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { AstraNavTab } from '../astra-navbar';
import { DashboardBase } from './dashboard-base';

export const DashboardAll = () => {
  const { setTokenFetcher, collection, chainId, refreshTrigger, setDisplayName } = useDashboardContext();

  useEffect(() => {
    if (collection && chainId) {
      setTokenFetcher(CollectionTokenCache.shared().fetcher(collection, chainId));

      setDisplayName(collection?.metadata.name ?? '');
    }
  }, [collection, chainId, refreshTrigger]);

  return <DashboardBase route={AstraNavTab.All} />;
};
