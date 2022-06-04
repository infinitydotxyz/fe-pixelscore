import { UserTokenCache } from 'components/token-grid/token-fetcher';
import { useEffect } from 'react';
import { getUserRecord } from 'utils/astra-utils';
import { useAppContext } from 'utils/context/AppContext';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { DashboardBase } from './dashboard-base';

export const DashboardMyNFTs = () => {
  const { setTokenFetcher, setOrderFetcher, refreshTrigger, setUserRecord, setDisplayName } = useDashboardContext();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      setTokenFetcher(UserTokenCache.shared().fetcher(user.address));
      setOrderFetcher(undefined);

      setDisplayName('');

      //     if (!user) {
      //       emptyMessage = 'Click "Connect" to sign in';

      //     if (userRecord && userRecord.portfolioScore !== -1) {
      //       scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
    }
  }, [user, refreshTrigger]);

  useEffect(() => {
    updatePortfolioScore();
  }, [user]);

  const updatePortfolioScore = async () => {
    if (user) {
      const userRec = await getUserRecord(user.address);

      setUserRecord(userRec);
    }
  };

  return <DashboardBase tokensMode={true} />;
};
