import { BGImage, Divider, RoundButton, SVG } from '../common';
import { TokenInfo } from 'utils/types/be-types';
import { PillBadge } from 'components/token-grid/pill-badge';
import { useState } from 'react';
import { smallIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';

interface Props {
  tokens: TokenInfo[];
  className?: string;
}

export const TokenSwiper = ({ tokens, className = 'flex-grow' }: Props) => {
  const [index, setIndex] = useState(0);

  const controls = () => {
    const len = tokens.length;

    let message = `${index + 1}/${len} Tokens`;

    if (len === 1) {
      message = `${len} Token`;
    }

    return (
      <div className="flex items-center px-3">
        <RoundButton
          disabled={len < 2}
          onClick={() => {
            let nextIndex = index - 1;
            if (nextIndex < 0) {
              nextIndex = len - 1;
            }
            setIndex(nextIndex);
          }}
        >
          <SVG.leftArrow className={smallIconButtonStyle} />
        </RoundButton>

        <div className="flex-1 text-center">{message}</div>

        <RoundButton
          disabled={len < 2}
          onClick={() => {
            let nextIndex = index + 1;
            if (nextIndex >= len - 1) {
              nextIndex = 0;
            }
            setIndex(nextIndex);
          }}
        >
          <SVG.rightArrow className={smallIconButtonStyle} />
        </RoundButton>
      </div>
    );
  };

  return (
    <div className={twMerge('flex flex-col', className)}>
      <div className="flex-grow  relative">
        {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
          <BGImage src={tokens[index].imageUrl} className="hover:scale-110 transition-all  " />
        </div>

        <PillBadge val={tokens[index].pixelRank} tooltip="Pixel rank" />
        {/* <PillBadge val={tokens[index].pixelScore} tooltip="Pixel score" className="bottom-2 left-2" /> */}
        <PillBadge val={tokens[index].tokenId} tooltip="Token id" className="top-2 right-2" />
      </div>

      {controls()}
      <Divider className="" />
    </div>
  );
};
