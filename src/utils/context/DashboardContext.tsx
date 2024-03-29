import { toastError, toastSuccess } from 'components/common';
import { RevealOrderCache, RevealOrderFetcher } from 'components/reveal-order-grid/reveal-order-fetcher';
import {
  CollectionTokenCache,
  RankTokenCache,
  TokenFetcher,
  UserTokenCache
} from 'components/token-grid/token-fetcher';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NFTCard, TokenInfo, UserRecord } from 'utils/types/be-types';
import { utils } from 'ethers';
import { useAppContext } from './AppContext';
import { setReveals } from 'utils/astra-utils';
import { useCardSelection } from 'components/astra/useCardSelection';
import { CollectionInfo } from 'utils/types/collection-types';
import { PIXELRANK_PRICE_PER_ITEM, PIXELRANK_WALLET } from 'utils/constants';

export type DashboardContextType = {
  collection: CollectionInfo | undefined;
  setCollection: (value: CollectionInfo) => void;

  gridWidth: number;
  setGridWidth: (value: number) => void;

  displayName: string;
  setDisplayName: (value: string) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;

  showOnlyUnvisible: boolean;
  setShowOnlyUnvisible: (value: boolean) => void;

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

  toggleSelection: (data: NFTCard) => void;
  isSelected: (data: NFTCard) => boolean;
  isSelectable: (data: NFTCard) => boolean;
  removeFromSelection: (data: NFTCard) => void;
  selection: NFTCard[];
  clearSelection: () => void;
};

const DashboardContext = React.createContext<DashboardContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const DashboardContextProvider = ({ children }: Props) => {
  const [collection, setCollection] = useState<CollectionInfo>();
  const [showCart, setShowCart] = useState(false);
  const [showOnlyUnvisible, setShowOnlyUnvisible] = useState(false);
  const [numTokens, setNumTokens] = useState(0);
  const [tokenFetcher, setTokenFetcher] = useState<TokenFetcher | undefined>();
  const [orderFetcher, setOrderFetcher] = useState<RevealOrderFetcher | undefined>();
  const [userRecord, setUserRecord] = useState<UserRecord | undefined>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);

  const [displayName, setDisplayName] = useState<string>('');

  const { user, chainId, providerManager } = useAppContext();
  const { isSelected, isSelectable, toggleSelection, clearSelection, selection, removeFromSelection } =
    useCardSelection();

  useEffect(() => {
    refreshData();
  }, [showOnlyUnvisible]);

  const sendEth = async (userAddress: string, amountInEther: string): Promise<string | undefined> => {
    const receiverAddress = PIXELRANK_WALLET;

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
      const pricePerTokenInEther = PIXELRANK_PRICE_PER_ITEM;

      const amountInEth = selection.length * pricePerTokenInEther;
      const txnHash = await sendEth(user?.address, amountInEth.toFixed(12).toString());

      if (txnHash) {
        const tokenInfo: TokenInfo[] = [];

        for (const cardData of selection) {
          const token: TokenInfo = {
            chainId: cardData.chainId ?? '',
            collectionAddress: cardData.tokenAddress ?? '',
            collectionName: cardData.collectionName,
            collectionBannerImage: cardData.collectionBannerImage ?? '',
            collectionProfileImage: cardData.collectionProfileImage ?? '',
            tokenId: cardData.tokenId ?? '',
            collectionSlug: cardData.collectionSlug ?? '',
            imageUrl: cardData.image ?? ''
          };

          tokenInfo.push(token);
        }

        await setReveals(
          user.address,
          txnHash,
          selection.length,
          pricePerTokenInEther,
          amountInEth,
          user.address,
          chainId ?? '',
          tokenInfo
        );

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
    RankTokenCache.shared().refresh();

    // updating fetchers triggers rebuild
    setRefreshTrigger(refreshTrigger + 1);
  };

  const value: DashboardContextType = {
    collection,
    setCollection,

    gridWidth,
    setGridWidth,

    showCart,
    setShowCart,

    numTokens,
    setNumTokens,

    showOnlyUnvisible,
    setShowOnlyUnvisible,

    tokenFetcher,
    setTokenFetcher,

    orderFetcher,
    setOrderFetcher,

    userRecord,
    setUserRecord,

    handleCheckout,
    refreshData,
    refreshTrigger,

    // collection name, my nfts, pending etc
    setDisplayName,
    displayName,

    isSelected,
    isSelectable,
    toggleSelection,
    clearSelection,
    selection,
    removeFromSelection
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  return useContext(DashboardContext) as DashboardContextType;
};
