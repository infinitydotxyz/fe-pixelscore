import { ConnectButton, NextLink, Spacer } from 'components/common';
import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';

export const Navbar = () => {
  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div className={twMerge('flex px-8 py-2 items-center border-b shadow-md relative', inputBorderColor)}>
      <NextLink href="/" className="flex items-center">
        {/* <SVG.miniLogo className={largeIconButtonStyle} /> */}
        <div className="text-2xl font-bold text-dark-blue font-pixel">Pixelrank</div>
      </NextLink>

      <Spacer />
      <ConnectButton />
    </div>
  );
};
