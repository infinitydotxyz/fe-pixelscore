import { BGImage, Divider } from '../common';
import { TokenInfo } from 'utils/types/be-types';
import { BlueCheckBadge, PillBadge } from 'components/token-grid/pill-badge';
import { twMerge } from 'tailwind-merge';

interface Props {
  token: TokenInfo;
  className?: string;
}

export const RevealedTokenImage = ({ token, className = 'flex-grow' }: Props) => {
  return (
    <div className={twMerge('flex flex-col', className)}>
      <div className="flex-grow  relative">
        {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
          <BGImage src={token.imageUrl} className="hover:scale-110 transition-all  " />
        </div>

        <PillBadge val={token.pixelRank} tooltip="Pixel rank" numberSign={true} />
        {/* <PillBadge val={token.pixelScore} tooltip="Pixel score" className="bottom-2 left-2" /> */}
        <PillBadge val={token.tokenId} tooltip="Token id" className="top-2 right-2" />
        <BlueCheckBadge val={token.hasBlueCheck} />
      </div>

      <Divider className="" />
    </div>
  );
};
