import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { useCardSelection } from '../useCardSelection';
import { DashboardBase } from './dashboard-base';

export const DashboardTop = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger, setDisplayName } = useDashboardContext();
  const { isSelected, toggleSelection } = useCardSelection();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(10, 10));
    setOrderFetcher(undefined);

    setDisplayName('Top');
  }, [refreshTrigger]);

  return <DashboardBase tokensMode={true} isSelected={isSelected} toggleSelection={toggleSelection} />;
};
