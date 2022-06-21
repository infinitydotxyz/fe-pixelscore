import { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { ScrollLoader } from 'components/common';
import { useIsMounted } from 'hooks/useIsMounted';
import { twMerge } from 'tailwind-merge';
import { ErrorOrLoading } from '../astra/error-or-loading';
import { RevealOrder, TokenInfo } from 'utils/types/be-types';
import { RevealedOrderCard } from './revealed-order-card';
import { RevealOrderFetcher } from 'components/reveal-order-grid/reveal-order-fetcher';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  className?: string;
  onClick?: (data: TokenInfo) => void;
  isSelected: (data: TokenInfo) => boolean;
  onLoad: (numItems: number) => void;
  orderFetcher: RevealOrderFetcher;
}

export const RevealedOrderGrid = ({ orderFetcher, className = '', onLoad, onClick, isSelected }: Props) => {
  const [revealOrders, setRevealOrders] = useState<RevealOrder[]>([]);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [error, setError] = useState(false);
  const [noData, setNoData] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width, ref } = useResizeDetector();

  const isMounted = useIsMounted();

  useEffect(() => {
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);
  }, [width]);

  useEffect(() => {
    setRevealOrders([]);
    setLoading(true);
    handleFetch(false);
  }, [orderFetcher]);

  useEffect(() => {
    const ts: TokenInfo[] = [];

    for (const order of revealOrders) {
      ts.push(...order.revealItems);
    }

    setTokens(ts);
  }, [revealOrders]);

  const handleFetch = async (loadMore: boolean) => {
    if (orderFetcher) {
      const { fhasNextPage, frevealOrders, ferror } = await orderFetcher.fetch(loadMore);

      // can't update react state after unmount
      if (!isMounted()) {
        return;
      }

      setHasNextPage(fhasNextPage);
      setError(ferror);

      if (!ferror) {
        setRevealOrders(frevealOrders);

        setNoData(frevealOrders.length === 0);

        onLoad(frevealOrders.length);
      }

      setLoading(false);
    }
  };

  let contents;

  if (error || loading || noData) {
    contents = <ErrorOrLoading error={error} noData={noData} />;
  } else {
    if (gridWidth > 0) {
      const cols = Math.round(gridWidth / 360);
      const gridColumns = `repeat(${cols}, minmax(0, 1fr))`;

      contents = (
        <>
          <div className={twMerge('grid gap-10')} style={{ gridTemplateColumns: gridColumns }}>
            {tokens.map((data) => {
              return (
                <RevealedOrderCard
                  onRefreshToken={(data) => {
                    const newTokens = [];

                    for (const token of tokens) {
                      if (token.tokenId === data.tokenId && token.collectionAddress === data.collectionAddress) {
                        newTokens.push(data);
                      } else {
                        newTokens.push(token);
                      }
                    }
                    setTokens(newTokens);
                  }}
                  key={uuidv4()}
                  token={data}
                  selected={isSelected(data)}
                  onClick={(data) => {
                    if (onClick) {
                      return onClick(data);
                    }
                  }}
                />
              );
            })}
          </div>

          {hasNextPage && (
            <ScrollLoader
              onFetchMore={async () => {
                handleFetch(true);
              }}
            />
          )}
        </>
      );
    }
  }

  return (
    <div ref={ref} className={twMerge('h-full w-full', className)}>
      {contents}

      <div className="h-1/3" />
    </div>
  );
};
