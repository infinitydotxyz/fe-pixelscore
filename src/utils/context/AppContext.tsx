import * as React from 'react';
import { ProviderEvents, WalletType } from 'utils/providers/AbstractProvider';
import { UserRejectException } from 'utils/providers/UserRejectException';
import { ProviderManager } from 'utils/providers/ProviderManager';
import { toastError } from 'components/common';
import { useIsMounted } from 'hooks/useIsMounted';
import { Toaster } from 'react-hot-toast';

export type User = {
  address: string;
  username?: string;
};

export type FollowingCollection = {
  collectionAddress: string;
  collectionChainid: string;
};

export type AppContextType = {
  user?: User;
  signOut: () => void;
  chainId: string;
  headerPosition: number;
  setHeaderPosition: (bottom: number) => void;
  connectWallet: (walletType: WalletType) => Promise<void>;
  providerManager?: ProviderManager;
};

const AppContext = React.createContext<AppContextType | null>(null);

export const AppContextProvider = (props: React.PropsWithChildren<unknown>) => {
  const [user, setUser] = React.useState<User | undefined>();
  const [chainId, setChainId] = React.useState('1');
  const [headerPosition, setHeaderPosition] = React.useState(0);
  const [providerManager, setProviderManager] = React.useState<ProviderManager | undefined>();

  const isMounted = useIsMounted();

  const setupProvider = async () => {
    if (providerManager) {
      return;
    }

    const pm = await ProviderManager.getInstance();
    if (isMounted()) {
      setProviderManager(pm);

      pm.signIn()
        .then(async () => {
          const address = pm.account;
          setUser({ address });
          const chainIdNew = pm.chainId ?? 1;
          setChainId(`${chainIdNew}`);
          setUser({ address: address });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  React.useEffect(() => {
    // check & set logged in user:
    setupProvider();
  }, []);

  const connectWallet = async (walletType: WalletType) => {
    await setupProvider();

    if (providerManager) {
      try {
        await providerManager.connectWallet(walletType);
        await providerManager.signIn();
        setUser({ address: providerManager.account ?? '' });
        const chainIdNew = providerManager.chainId ?? 1;
        setChainId(`${chainIdNew}`);
      } catch (err: Error | unknown) {
        console.error(err);
        if (err instanceof UserRejectException) {
          toastError(err.message);
        }
      }
    } else {
      console.log(`Provider not ready yet`);
    }
  };

  React.useEffect(() => {
    const handleNetworkChange = () => {
      setChainId(`${chainId}`);
      window.location.reload();
    };

    let isChangingAccount = false;
    const handleAccountChange = async () => {
      isChangingAccount = true;
      window.onfocus = async () => {
        if (isChangingAccount) {
          setTimeout(async () => {
            isChangingAccount = false;
            try {
              await providerManager?.signIn();
              setUser({ address: providerManager?.account ?? '' });
              const chainIdNew = providerManager?.chainId ?? 1;
              setChainId(`${chainIdNew}`);
            } catch (err) {
              if (err instanceof UserRejectException) {
                toastError(err.message);
                return;
              }
              console.error(err);
            }
            window.location.reload();
          }, 500);
        }
      };
    };

    const onConnect = () => {
      return;
    };

    const onDisconnect = () => {
      signOut();
    };

    if (providerManager) {
      providerManager.on(ProviderEvents.AccountsChanged, handleAccountChange);
      providerManager.on(ProviderEvents.ChainChanged, handleNetworkChange);
      providerManager.on(ProviderEvents.Connect, onConnect);
      providerManager.on(ProviderEvents.Disconnect, onDisconnect);
    }

    return () => {
      providerManager?.removeListener?.(ProviderEvents.AccountsChanged, handleAccountChange);
      providerManager?.removeListener?.(ProviderEvents.ChainChanged, handleNetworkChange);
      providerManager?.removeListener?.(ProviderEvents.Connect, onConnect);
      providerManager?.removeListener?.(ProviderEvents.Disconnect, onDisconnect);
    };
  }, [providerManager]);

  const signOut = async (): Promise<void> => {
    setUser(undefined);
    providerManager?.disconnect();
    window.location.reload();
  };

  const value: AppContextType = {
    user,
    signOut,
    chainId,
    headerPosition,
    setHeaderPosition,
    connectWallet,
    providerManager
  };

  return (
    <AppContext.Provider value={value} {...props}>
      {props.children}

      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return React.useContext(AppContext) as AppContextType;
};
