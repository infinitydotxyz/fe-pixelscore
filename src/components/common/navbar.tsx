import { ConnectButton, NextLink, Spacer, SVG } from 'components/common';
import { inputBorderColor, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';

export const Navbar = () => {
  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div className={twMerge('flex px-8 py-2 items-center bg-slate-200 border-b shadow-md relative', inputBorderColor)}>
      <NextLink href="/" className="flex items-center">
        <SVG.miniLogo className={largeIconButtonStyle} />
        <div className="ml-4 text-2xl font-bold">PixelScore</div>
      </NextLink>

      <Spacer />
      <ConnectButton />
    </div>
  );
};
