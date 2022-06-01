import React, { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ConnectInfo {
  chainId: string;
}

export const MetaMaskListener = () => {
  useEffect(() => {
    const handleAccountChange = async (accounts: string[]) => {
      console.log('handleAccountChange');
      console.log(accounts);
    };

    const handleChainIdChange = (chainId: string) => {
      console.log('handleChainIdChange');
      console.log(chainId);
    };

    const handleDisconnect = (error: ProviderRpcError) => {
      console.log('handleDisconnect');
      console.log(error);
    };

    const handleConnect = (info: ConnectInfo) => {
      console.log('handleConnect');
      console.log(info);
    };

    const getChainId = async () => {
      console.log('getChainId');

      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        console.log(chainId);
      } catch (err) {
        console.error('eth_chainId failed', err);
      }
    };

    const handleMessage = (message: ProviderMessage) => {
      console.log('handleMessage');
      console.log(message);
    };

    if (window?.ethereum) {
      getChainId();

      window.ethereum.on('accountsChanged', handleAccountChange);
      window.ethereum.on('chainChanged', handleChainIdChange);
      window.ethereum.on('connect', handleConnect);
      window.ethereum.on('disconnect', handleDisconnect);
      window.ethereum.on('message', handleMessage);
    }

    return () => {
      if (window?.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleChainIdChange);
        window.ethereum.removeListener('connect', handleConnect);
        window.ethereum.removeListener('disconnect', handleDisconnect);
        window.ethereum.removeListener('message', handleMessage);
      }
    };
  }, []);

  return (
    <>
      <div>MetaMask listener. Just for testing</div>
    </>
  );
};
