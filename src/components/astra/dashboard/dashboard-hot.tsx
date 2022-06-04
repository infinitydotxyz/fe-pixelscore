import { RankTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { useCardSelection } from '../useCardSelection';
import { DashboardBase } from './dashboard-base';

export const DashboardHot = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger, setDisplayName } = useDashboardContext();
  const { isSelected, toggleSelection } = useCardSelection();

  useEffect(() => {
    setTokenFetcher(RankTokenCache.shared().fetcher(7, 9));
    setOrderFetcher(undefined);

    setDisplayName('Hot');
  }, [refreshTrigger]);

  return <DashboardBase tokensMode={true} isSelected={isSelected} toggleSelection={toggleSelection} />;
};
