import { useState, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { ScrollLoader } from 'components/common';
import { useIsMounted } from 'hooks/useIsMounted';
import { twMerge } from 'tailwind-merge';
import { ErrorOrLoading } from '../astra/error-or-loading';
import { RevealOrder } from 'utils/types/be-types';
import { RevealOrderFetcher } from './reveal-order-fetcher';
import { RevealOrderCard } from './reveal-order-card';

interface Props {
  className?: string;
  isComplete: boolean;
  onClick?: (data: RevealOrder) => void;
  isSelected: (data: RevealOrder) => boolean;
  onLoad: (numItems: number) => void;
  orderFetcher: RevealOrderFetcher;
}

export const RevealOrderGrid = ({ orderFetcher, isComplete, className = '', onLoad, onClick, isSelected }: Props) => {
  const [revealOrders, setRevealOrders] = useState<RevealOrder[]>([]);
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
  let cardHeight = 290;

  if (error || loading || noData) {
    contents = <ErrorOrLoading error={error} noData={noData} />;
  } else {
    if (gridWidth > 0) {
      const cols = Math.round(gridWidth / 400);
      const gridColumns = `repeat(${cols}, minmax(0, 1fr))`;

      cardHeight = gridWidth / (cols - 1);

      contents = (
        <>
          <div className={twMerge('grid gap-8')} style={{ gridTemplateColumns: gridColumns }}>
            {revealOrders.map((data) => {
              return (
                <RevealOrderCard
                  isComplete={isComplete}
                  userAddress={orderFetcher.userAddress}
                  height={cardHeight}
                  key={data.txnHash + data.timestamp}
                  revealOrder={data}
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
