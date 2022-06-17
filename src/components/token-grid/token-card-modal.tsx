import { twMerge } from 'tailwind-merge';
import { Modal } from '../common';
import { NFTCard } from 'utils/types/be-types';
import { useEffect, useState } from 'react';

interface Props {
  data: NFTCard;
  modalOpen: boolean;
  setModalOpen: (set: boolean) => void;
}

export const TokenCardModal = ({ data, modalOpen, setModalOpen }: Props): JSX.Element => {
  const title = data?.title ?? '';
  const tokenId = data?.tokenId ?? '';

  return (
    <Modal wide="fit" isOpen={modalOpen} showActionButtons={false} onClose={() => setModalOpen(false)}>
      <div onClick={() => setModalOpen(false)}>
        <ModalImage src={data?.image} className="" />

        <div className="p-4">
          <div className="font-bold">{title}</div>
          <div>{tokenId}</div>
        </div>
      </div>
    </Modal>
  );
};

// ==================================

interface Props2 {
  src?: string;
  className?: string;
}

const ModalImage = ({ src, className = '' }: Props2) => {
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
