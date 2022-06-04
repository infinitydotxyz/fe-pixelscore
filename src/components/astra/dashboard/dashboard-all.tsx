import { CollectionTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { DashboardBase } from './dashboard-base';

export const DashboardAll = () => {
  const { setTokenFetcher, setOrderFetcher, collection, chainId, refreshTrigger, setDisplayName } =
    useDashboardContext();

  useEffect(() => {
    if (collection && chainId) {
      setTokenFetcher(CollectionTokenCache.shared().fetcher(collection, chainId));
      setOrderFetcher(undefined);

      setDisplayName(collection?.metadata.name ?? '');
    }
  }, [collection, chainId, refreshTrigger]);

  return <DashboardBase tokensMode={true} />;
};
