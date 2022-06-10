import { BGImage, Button, Spacer } from 'components/common';
import { iconButtonStyle, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { XIcon } from '@heroicons/react/outline';
import { ReactNode } from 'react';
import { NFTCard } from 'utils/types/be-types';

interface Props {
  cardData: NFTCard[];
  onRemove: (token: NFTCard) => void;
  onCheckout: () => void;
}

export const AstraCart = ({ cardData, onRemove, onCheckout }: Props) => {
  const map = new Map<string, NFTCard[]>();

  for (const token of cardData) {
    const tkns = map.get(token.tokenAddress ?? '') ?? [];
    tkns.push(token);
    map.set(token.tokenAddress ?? '', tkns);
  }

  let listComponent;

  if (map.size > 0) {
    const divList: ReactNode[] = [];
    let index = 0;
    map.forEach((tokenArray) => {
      const first = tokenArray[0];

      divList.push(
        <div className="w-full rounded-md bg-slate-100 py-2 px-4 font-bold truncate" key={`header-${first.id}`}>
          {first.collectionName}
        </div>
      );

      for (const t of tokenArray) {
        divList.push(<AstraCartItem key={t.id} token={t} index={index++} onRemove={onRemove} />);
      }

      divList.push(<div key={Math.random()} className="h-1" />);
    });

    // min-w-0 is important. otherwise text doesn't truncate
    listComponent = <div className="min-w-0 flex p-6 flex-col space-y-2 items-start flex-1">{divList}</div>;
  } else {
    listComponent = (
      <div key={Math.random()} className="flex items-center justify-center text-sm text-gray-400 uppercase flex-1">
        <div>Cart empty</div>
      </div>
    );
  }

  return (
    // setting to w-64 so it doen't shrink and expand while animating
    <div className="h-full flex flex-col w-64">
      <div className="mb-2">
        {/* <GridHeader route={route} vertical={true} /> */}

        <div className="text-3xl font-bold text-gray-500 m-4">My Cart</div>
        <div className=" text-slate-600 m-4 leading-5">Add NFTs to the cart to do stuff.</div>
      </div>

      {listComponent}

      <div className="m-4 flex flex-col">
        <Button disabled={cardData.length === 0} onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

// ====================================================================

interface Props2 {
  token: NFTCard;
  index: number;
  onRemove: (token: NFTCard) => void;
}

export const AstraCartItem = ({ token, index, onRemove }: Props2) => {
  return (
    <div key={token.id} className="flex items-center w-full">
      <div className="w-4 mr-2 text-right">{index + 1}.</div>
      <BGImage className={twMerge(largeIconButtonStyle, 'rounded-lg')} src={token.image} />
      <div className="ml-2">{token.tokenId}</div>

      <Spacer />
      <Button
        size="plain"
        variant="round"
        onClick={() => {
          onRemove(token);
        }}
      >
        <XIcon className={iconButtonStyle} />
      </Button>
    </div>
  );
};
