import { BGImage, RoundButton } from '../common';
import { TokenInfo } from 'utils/types/be-types';
import { PillBadge } from 'components/token-grid/pill-badge';
import { useState } from 'react';

interface Props {
  tokens: TokenInfo[];
}

export const TokenSwiper = ({ tokens }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);

  return (
    <div className=" flex flex-col">
      <div className="h-64 relative">
        {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
          <BGImage src={tokens[index].imageUrl} className="hover:scale-110 transition-all  " />
        </div>

        <PillBadge val={tokens[index].pixelRank} tooltip="Pixel rank" />
        <PillBadge val={tokens[index].pixelScore} tooltip="Pixel score" className="bottom-1 left-1" />
        <PillBadge val={tokens[index].tokenId} tooltip="Token id" className="top-1 right-1" />
      </div>

      <RoundButton
        onClick={() => {
          const len = tokens.length;

          let nextIndex = index + 1;
          if (index >= len - 1) {
            nextIndex = 0;
          }
          setIndex(nextIndex);
        }}
      >
        hey
      </RoundButton>
    </div>
  );
};
