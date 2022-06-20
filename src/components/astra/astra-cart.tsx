import { BGImage, Button, Spacer } from 'components/common';
import { smallIconButtonStyle, largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';
import { NFTCard } from 'utils/types/be-types';
import { BiTrash } from 'react-icons/bi';
import { PIXELRANK_PRICE_PER_ITEM } from 'utils';

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
        <div className="w-full rounded-md px-4 font-bold truncate" key={`header-${first.id}`}>
          {first.collectionName}
        </div>
      );

      for (const t of tokenArray) {
        divList.push(<AstraCartItem key={t.id} token={t} index={index++} onRemove={onRemove} />);
      }

      divList.push(<div key={Math.random()} className="h-1" />);
    });

    // min-w-0 is important. otherwise text doesn't truncate
    listComponent = (
      <div className="min-w-0 flex p-6 flex-col space-y-2 items-start flex-1 text-dark-body">{divList}</div>
    );
  } else {
    listComponent = (
      <div key={Math.random()} className="flex items-center justify-center text-dark-body uppercase flex-1">
        <div>Cart empty</div>
      </div>
    );
  }

  return (
    // setting to  w-72 so it doen't shrink and expand while animating
    <div className="h-full flex flex-col w-72">
      <div className="mb-2">
        {/* <GridHeader route={route} vertical={true} /> */}

        <div className="text-4xl lg:text-3xl font-bold text-dark-body m-4">My Cart</div>
        <div className=" text-dark-body ml-4 mr-4 leading-5 text-lg lg:text-md">
          Add NFTs you want to reveal ranks for. Each NFT costs ${PIXELRANK_PRICE_PER_ITEM} ETH
        </div>
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
      <div className="w-4 mr-2 text-right pr-2 text-xl">{index + 1}</div>
      <BGImage className={twMerge(largeIconButtonStyle, 'rounded-lg')} src={token.image} />
      <div>{token.tokenId}</div>
      <Spacer />
      <Button
        size="plain"
        variant="round"
        onClick={() => {
          onRemove(token);
        }}
      >
        <BiTrash className={twMerge(smallIconButtonStyle, 'opacity-75 text-dark-body')} />
      </Button>
    </div>
  );
};
