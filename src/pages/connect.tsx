import React, { useEffect } from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { WalletType } from 'utils/providers/AbstractProvider';
import { PageBox, SVG } from 'components/common';
import { twMerge } from 'tailwind-merge';
import { iconButtonStyle } from 'utils/ui-constants';
import { useLocation, useNavigate } from 'react-router-dom';

export const ConnectPage = () => {
  const navigate = useNavigate();
  const { connectWallet, user } = useAppContext();
  const { state } = useLocation();

  let fromPath = '';
  if (state) {
    const s = state as { fromPath: string };
    fromPath = s.fromPath;
  }

  useEffect(() => {
    if (user?.address) {
      if (fromPath) {
        navigate(fromPath);
      } else {
        // we don't know if our site is one back, but mostly works
        // navigate(-1);
        navigate('/');
      }
    }
  }, [user]);

  const connectCoinbase = async () => {
    await connectWallet(WalletType.WalletLink);
  };

  const connectMetaMask = async () => {
    await connectWallet(WalletType.MetaMask);
  };

  const connectWalletConnect = async () => {
    await connectWallet(WalletType.WalletConnect);
  };

  return (
    <PageBox extraScrollHeight={false} pageClass="min-h-screen" className="grid place-content-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="shadow-gray-300 shadow-sm dark:border-dark-border border-light-border border-t border-b border-l border-r rounded-3xl flex flex-col items-center mx-0 my-4 px-12 py-8 dark:text-dark-body text-light-body">
          <div className="text-center mt-2 mb-6 text-xl font-bold">Connect Wallet</div>

          <ConnectItem
            onClick={connectMetaMask}
            icon={<SVG.metamask className="h-16" />}
            title="Metamask"
            subtitle="Connect using browser wallet"
          />

          <ConnectItem
            onClick={connectWalletConnect}
            icon={<SVG.walletconnect className="h-16" />}
            title="WalletConnect"
            subtitle="Connect using mobile wallet"
          />
          <ConnectItem
            onClick={connectCoinbase}
            icon={<SVG.coinbasewallet className="h-16" />}
            title="Coinbase"
            subtitle="Connect using Coinbase wallet"
          />
        </div>
      </div>
    </PageBox>
  );
};

// ===============================================

interface Props {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  onClick: () => void;
}

const ConnectItem = ({ title, icon, subtitle, onClick }: Props): JSX.Element => {
  return (
    <div
      className="rounded-lg border cursor-pointer flex items-center mb-4 px-5 py-3 w-full hover:opacity-75 dark:border-dark-border border-light-border"
      onClick={onClick}
    >
      {icon}
      <div className="flex-column text-left align-self-center px-10">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-gray">{subtitle}</p>
      </div>
      <SVG.arrowImage className={twMerge(iconButtonStyle, 'ml-auto dark:text-dark-body text-light-body')} />
    </div>
  );
};
