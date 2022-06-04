import { ConnectButton, NextLink, Spacer, SVG, ToggleTab, useToggleTab } from 'components/common';
import { inputBorderColor, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';

interface Props {
  onTabChange: (value: AstraNavTab) => void;
  currentTab: AstraNavTab;
}

export enum AstraNavTab {
  All = 'All',
  Top100 = 'Top 100',
  Pending = 'Pending',
  Hot = 'Hot',
  MyNFTs = 'My NFTs'
}

export const AstraNavbar = ({ onTabChange, currentTab }: Props) => {
  const { options, onChange, selected } = useToggleTab(
    [AstraNavTab.All, AstraNavTab.Top100, AstraNavTab.Hot, AstraNavTab.MyNFTs, AstraNavTab.Pending],
    currentTab
  );
  const navigate = useNavigate();

  const tabBar = (
    <div className={twMerge(inputBorderColor, 'flex justify-center')}>
      <ToggleTab
        options={options}
        selected={selected}
        onChange={(value) => {
          switch (value) {
            case AstraNavTab.All:
              navigate('all');
              break;
            case AstraNavTab.Pending:
              navigate('pending');
              break;
            case AstraNavTab.MyNFTs:
              navigate('nfts');
              break;
            case AstraNavTab.Hot:
              navigate('hot');
              break;
            case AstraNavTab.Top100:
              navigate('top');
              break;
          }

          onTabChange(value as AstraNavTab);
          onChange(value);
        }}
        altStyle={true}
        equalWidths={false}
      />
    </div>
  );

  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div className={twMerge('flex px-8 py-2 items-center bg-slate-200 border-b shadow-md relative', inputBorderColor)}>
      <NextLink href="/" className="flex items-center">
        <SVG.miniLogo className={largeIconButtonStyle} />
        <div className="ml-4 text-2xl font-bold">Astra</div>
      </NextLink>
      <Spacer />

      {tabBar}
      <Spacer />
      <ConnectButton />
    </div>
  );
};
