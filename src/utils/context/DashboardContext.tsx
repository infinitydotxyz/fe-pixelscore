import { BaseCollection } from '@infinityxyz/lib/types/core';
import { AstraNavTab } from 'components/astra/astra-navbar';
import { toastError, toastSuccess } from 'components/common';
import { RevealOrderCache, RevealOrderFetcher } from 'components/reveal-order-grid/reveal-order-fetcher';
import { CollectionTokenCache, TokenFetcher, UserTokenCache } from 'components/token-grid/token-fetcher';
import React, { ReactNode, useContext, useState } from 'react';
import { NFTCard, TokenInfo, UserRecord } from 'utils/types/be-types';
import { utils } from 'ethers';
import { useAppContext } from './AppContext';
import { setReveals } from 'utils/astra-utils';

export type DashboardContextType = {
  collection: BaseCollection | undefined;
  setCollection: (value: BaseCollection) => void;

  chainId: string | undefined;
  setChainId: (value: string | undefined) => void;

  currentTab: AstraNavTab;
  setCurrentTab: (value: AstraNavTab) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;

  numTokens: number;
  setNumTokens: (value: number) => void;

  tokenFetcher: TokenFetcher | undefined;
  setTokenFetcher: (value: TokenFetcher | undefined) => void;

  orderFetcher: RevealOrderFetcher | undefined;
  setOrderFetcher: (value: RevealOrderFetcher | undefined) => void;

  userRecord: UserRecord | undefined;
  setUserRecord: (value: UserRecord | undefined) => void;

  handleCheckout: (selection: NFTCard[]) => void;
  refreshData: () => void;
  refreshTrigger: number;
};

const DashboardContext = React.createContext<DashboardContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const DashboardContextProvider = ({ children }: Props) => {
  const [collection, setCollection] = useState<BaseCollection>();
  const [chainId, setChainId] = useState<string>();
  const [currentTab, setCurrentTab] = useState<AstraNavTab>(AstraNavTab.All);
  const [showCart, setShowCart] = useState(false);
  const [numTokens, setNumTokens] = useState(0);
  const [tokenFetcher, setTokenFetcher] = useState<TokenFetcher | undefined>();
  const [orderFetcher, setOrderFetcher] = useState<RevealOrderFetcher | undefined>();
  const [userRecord, setUserRecord] = useState<UserRecord | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { user, providerManager } = useAppContext();

  const sendEth = async (userAddress: string, amountInEther: string): Promise<string | undefined> => {
    const receiverAddress = '0xb01ab20314e743b62836ca7060fc56ab69157bc1';

    if (!utils.isAddress(userAddress)) {
      toastError(`Invalid user address: ${userAddress}.`);
      return;
    }
    if (!utils.isAddress(receiverAddress)) {
      toastError(`Invalid transfer to address: ${receiverAddress}.`);
      return;
    }
    if (userAddress === receiverAddress) {
      toastError('From address is the same as to address.');
      return;
    }

    // send transaction
    const tx = {
      to: receiverAddress,
      value: utils.parseEther(amountInEther)
    };

    const rpcSigner = providerManager?.getEthersProvider().getSigner();
    const txObj = await rpcSigner?.sendTransaction(tx);

    if (txObj) {
      console.log('txHash', txObj.hash);

      return txObj.hash;
    }

    return;
  };

  const handleCheckout = async (selection: NFTCard[]) => {
    if (user) {
      const pricePerTokenInEther = 0.0001;

      const amountInEth = selection.length * pricePerTokenInEther;
      const txnHash = await sendEth(user?.address, amountInEth.toFixed(12).toString());

      if (txnHash) {
        const tokenInfo: TokenInfo[] = [];

        for (const cardData of selection) {
          const token: TokenInfo = {
            chainId: cardData.chainId ?? '',
            collectionAddress: cardData.tokenAddress ?? '',
            tokenId: cardData.tokenId ?? '',
            collectionSlug: cardData.collectionSlug ?? '',
            imageUrl: cardData.image ?? ''
          };

          tokenInfo.push(token);
        }

        const duh = await setReveals(
          user.address,
          txnHash,
          selection.length,
          pricePerTokenInEther,
          amountInEth,
          user.address, // revealer? I don't think this is used
          chainId ?? '',
          tokenInfo
        );

        console.log(duh);

        // clearSelection();

        toastSuccess('Success', 'Your order has been submitted');
      } else {
        toastError('Error', 'Something went wrong');
      }
    }
  };

  const refreshData = () => {
    CollectionTokenCache.shared().refresh();
    UserTokenCache.shared().refresh();
    RevealOrderCache.shared().refresh();

    // updating fetchers triggers rebuild
    setRefreshTrigger(refreshTrigger + 1);
  };

  const value: DashboardContextType = {
    collection,
    setCollection,

    chainId,
    setChainId,

    currentTab,
    setCurrentTab,

    showCart,
    setShowCart,

    numTokens,
    setNumTokens,

    tokenFetcher,
    setTokenFetcher,

    orderFetcher,
    setOrderFetcher,

    userRecord,
    setUserRecord,

    handleCheckout,
    refreshData,
    refreshTrigger
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};
