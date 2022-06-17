import { inputBorderColor, selectionOutline } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage, Button, Modal, SVG, toastWarning } from '../common';
import { NFTCard } from 'utils/types/be-types';
import { PillBadge } from './pill-badge';
import { useEffect, useState } from 'react';

interface Props {
  data: NFTCard;
  selected: boolean;
  isSelectable: (data: NFTCard) => boolean;
  onClick: (data: NFTCard) => void;
}

export const TokenCard = ({ data, onClick, selected, isSelectable }: Props): JSX.Element => {
  const [notSelectable, setNotSelectable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const title = data?.title ?? '';
  const tokenId = data?.tokenId ?? '';

  return (
    <div
      className={twMerge(
        'border',
        inputBorderColor,
        'rounded-2xl w-full relative flex flex-col',
        selected ? selectionOutline : '',
        notSelectable ? 'animate-wiggle' : ''
      )}
      style={{ aspectRatio: '4 / 5' }}
      onClick={() => {
        if (!isSelectable(data)) {
          toastWarning('NFT rank is already revealed', 'Try another NFT');
          setNotSelectable(true);
        } else {
          onClick(data);
        }
      }}
      onAnimationEnd={() => setNotSelectable(false)}
    >
      <div className="h-full flex flex-col">
        <div className="relative flex-1">
          {/* we can't overflow clip the whole card or the tooltips get clipped
          so we do this absolute image below the pillbadges */}
          <div className="absolute top-0 bottom-0 left-0 right-0 rounded-t-2xl overflow-clip">
            <BGImage src={data?.image} className="hover:scale-110 transition-all" />
          </div>

          <PillBadge val={data.pixelRank} tooltip="Pixel rank" numberSign={true} />
          {/* <PillBadge val={data.pixelScore} tooltip="Pixel score" className="bottom-2 left-2" /> */}
          <PillBadge val={data.pixelRankBucket} tooltip="Pixel rank bucket" className="top-2 right-2" />
          <PillBadge val={data.rarityRank} tooltip="Pixel rarity rank" className="top-10 left-2" numberSign={true} />
        </div>

        <div className="mt-3 mb-4 mx-3">
          <div className="flex items-center">
            <div className="font-bold truncate flex-1">{title}</div>
            <SVG.blueCheck className={'h-5 w-5'} />
          </div>
          <div className="truncate"># {tokenId}</div>

          <Button onClick={() => setModalOpen(true)}>Details</Button>
        </div>
      </div>

      <Modal wide="fit" isOpen={modalOpen} showActionButtons={false} onClose={() => setModalOpen(false)}>
        <div onClick={() => setModalOpen(false)}>
          <ModalImage src={data?.image} className="" />

          <div>duh</div>
        </div>
      </Modal>
    </div>
  );
};

// ==================================

interface Props2 {
  src?: string;
  className?: string;
}

export const ModalImage = ({ src, className = '' }: Props2) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // todo: src.replace hack to handle changed opensea image url
  src = src?.replace('storage.opensea.io', 'openseauserdata.com');

  useEffect(() => {
    let img: HTMLImageElement | undefined;
    let deleted = false;

    if (src) {
      const img = new Image();

      img.onload = () => {
        if (!deleted) {
          setWidth(img.width);
          setHeight(img.height);
        }
      };
      img.src = src;
    }

    return () => {
      deleted = true;

      // trying to cancel load? not sure if this works
      if (img) {
        img.src = '';
        img.onload = null;
        img = undefined;
      }
    };
  }, [src]);

  return (
    <div className={twMerge('bg-slate-100', className)} style={{ width: `${width}px`, height: `${height}px` }}>
      {src && (
        <div
          className={twMerge('bg-center w-full h-full bg-contain bg-no-repeat', className)}
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
    </div>
  );
};
