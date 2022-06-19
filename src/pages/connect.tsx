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
    await connectWallet?.(WalletType.WalletLink);
  };

  const connectMetaMask = async () => {
    await connectWallet?.(WalletType.MetaMask);
  };

  const connectWalletConnect = async () => {
    await connectWallet?.(WalletType.WalletConnect);
  };

  return (
    <PageBox extraScrollHeight={false} pageClass="min-h-screen" className="grid place-content-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="shadow-dark-blue shadow-sm border-dark-pink border-t border-b border-l border-r rounded-3xl flex flex-col items-center mx-0 my-4 p-8 text-dark-body">
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
      className="rounded-lg border-solid border cursor-pointer flex items-center mb-2 p-5 w-full hover:opacity-75"
      onClick={onClick}
    >
      {icon}
      <div className="flex-column text-left align-self-center px-10">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-gray">{subtitle}</p>
      </div>
      <SVG.arrowImage className={twMerge(iconButtonStyle, 'ml-auto')} />
    </div>
  );
};
