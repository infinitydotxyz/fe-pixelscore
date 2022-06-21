import { selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage, Spacer, SVG } from '../common';
import { NFTCard } from 'utils/types/be-types';
import { EyeBadge, PillBadge } from './pill-badge';
import { useState } from 'react';
import { TokenCardModal } from './token-card-modal';
import { pixelRankBucketToolTip } from 'utils/astra-utils';

interface Props {
  data: NFTCard;
  selected: boolean;
  isSelectable: (data: NFTCard) => boolean;
  onClick: (data: NFTCard) => void;
}

export const TokenCard = ({ data, onClick, selected, isSelectable }: Props): JSX.Element => {
  const [notSelectable, setNotSelectable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const title = data?.title || 'Hidden';
  const tokenId = data?.tokenId || 'Reveal';
  const hasBlueCheck = data?.hasBlueCheck ?? false;

  return (
    <div
      className={twMerge(
        // 'border',
        // inputBorderColor,
        'rounded-2xl w-full relative flex flex-col dark:bg-dark-card bg-light-card shadow-[0_5px_5px_1px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_5px_1px_rgba(0,0,0,0.15)] transition-all duration-300',
        selected ? selectionOutline : '',
        notSelectable ? 'animate-wiggle' : ''
      )}
      style={{ aspectRatio: '4 / 5' }}
      onClick={() => {
        if (!isSelectable(data)) {
          // toastWarning('NFT rank is already revealed', 'Try another NFT');
          setNotSelectable(true);
        } else {
          onClick(data);
        }
      }}
      onAnimationEnd={() => setNotSelectable(false)}
    >
      <div className="h-full flex flex-col text-2xl lg:text-sm">
        <div className="relative flex-1">
          {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
          <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
            <BGImage src={data?.image} className="hover:scale-110 transition-all" />
          </div>

          {/* <PillBadge val={data.pixelRank} tooltip="Pixel rank" numberSign={true} /> */}
          {/* <PillBadge val={data.pixelScore} tooltip="Pixel score" className="bottom-2 left-2" /> */}
          <PillBadge
            val={data.pixelRankBucket}
            tooltip={pixelRankBucketToolTip(data.pixelRankBucket ?? 0)}
            className="top-2 right-2"
          />
          {/*<PillBadge val={data.rarityRank} tooltip="Pixel rarity rank" className="top-10 left-2" numberSign={true} /> */}

          <EyeBadge
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>

        <div className="mt-3 mb-4 mx-3 dark:text-dark-body text-light-body">
          <div className="flex items-center">
            <div className="font-bold truncate flex-1">{title}</div>
            {hasBlueCheck ? <SVG.blueCheck className={'h-5 w-5'} /> : ''}
          </div>

          <div className="flex items-center">
            <div className="truncate">{tokenId}</div>
            <Spacer />
          </div>
        </div>
      </div>

      <TokenCardModal data={data} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};
