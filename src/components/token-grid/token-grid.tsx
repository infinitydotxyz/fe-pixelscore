import { useState, useEffect } from 'react';
import { ScrollLoader } from 'components/common';
import { useIsMounted } from 'hooks/useIsMounted';
import { twMerge } from 'tailwind-merge';
import { TokenCard } from './token-card';
import { TokenFetcher } from './token-fetcher';
import { ErrorOrLoading } from '../astra/error-or-loading';
import { NFTCard } from 'utils/types/be-types';

interface Props {
  tokenFetcher: TokenFetcher;
  className?: string;
  wrapWidth?: number;
  onClick?: (data: NFTCard) => void;
  isSelected: (data: NFTCard) => boolean;
  onLoad: (numItems: number) => void;
}

export const TokensGrid = ({ tokenFetcher, className = '', onLoad, onClick, isSelected, wrapWidth = 0 }: Props) => {
  const [cardData, setCardData] = useState<NFTCard[]>([]);
  const [error, setError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    setCardData([]);
    setLoading(true);
    handleFetch(false);
  }, [tokenFetcher]);

  const handleFetch = async (loadMore: boolean) => {
    const { fhasNextPage, fcardData, ferror } = await tokenFetcher.fetch(loadMore);

    // can't update react state after unmount
    if (!isMounted()) {
      return;
    }

    setHasNextPage(fhasNextPage);
    setError(ferror);

    if (!ferror) {
      setCardData(fcardData);

      setNoData(fcardData.length === 0);

      onLoad(fcardData.length);
    }

    setLoading(false);
  };

  let contents;
  let cardHeight = 290;

  if (error || loading || noData) {
    contents = <ErrorOrLoading error={error} noData={noData} />;
  } else {
    if (wrapWidth > 0) {
      const cols = Math.round(wrapWidth / 360);
      const gridColumns = `repeat(${cols}, minmax(0, 1fr))`;

      cardHeight = wrapWidth / cols;

      contents = (
        <>
          <div className={twMerge('grid gap-8')} style={{ gridTemplateColumns: gridColumns }}>
            {cardData.map((data) => {
              return (
                <TokenCard
                  height={cardHeight}
                  key={data.id}
                  data={data}
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
    <div className={twMerge('h-full w-full', className)}>
      {contents}

      <div className="h-1/3" />
    </div>
  );
};
