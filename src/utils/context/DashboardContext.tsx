import { BaseCollection } from '@infinityxyz/lib/types/core';
import { AstraNavTab } from 'components/astra/astra-navbar';
import { RevealOrderFetcher } from 'components/reveal-order-grid/reveal-order-fetcher';
import { TokenFetcher } from 'components/token-grid/token-fetcher';
import React, { ReactNode, useContext, useState } from 'react';
import { UserRecord } from 'utils/types/be-types';

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
    setUserRecord
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};
