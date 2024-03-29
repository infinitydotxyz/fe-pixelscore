import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const WhatIsPr = () => {
  // const navigate = useNavigate();

  return (
    <div className="mt-24">
      <div className="block dark:text-dark-body text-light-body font-bold text-6xl">
        What is <span className="dark:text-dark-body text-light-body font-pixel">Pixelrank</span>?
      </div>
      <div className="mt-6 max-w-xlg text-5xl lg:text-2xl dark:text-dark-body text-light-body leading-normal">
        Pixelrank is a novel method for estimating the global rarity of NFTs. It ranks NFTs by calculating how rare an
        NFT's pixels are compared to all NFTs in existence.
      </div>

      <div className={twMerge('mt-24 mx-24 grid gap-16 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2')}>
        <WhatIsPrItem>
          Ranking is based on our unbiased PixelScore algorithm. See our methodology{' '}
          <a href="./paper.pdf" target="_blank" className="  cursor-pointer dark:text-dark-body text-light-body">
            here
          </a>
          .
        </WhatIsPrItem>

        <WhatIsPrItem>
          About 55,000 collections analyzed and 10M NFTs ranked. Ranks for all but the top 5% and a few randomly chosen
          NFTs within each collection are revealed by default.
        </WhatIsPrItem>

        <WhatIsPrItem>
          Global and within collection rank for each NFT. Portfolio score for NFTs owned by you.
        </WhatIsPrItem>

        <WhatIsPrItem>
          Upcoming, free to mint 10k collection with global NFT ranks based on our PixelScore algorithm.
        </WhatIsPrItem>
      </div>
    </div>
  );
};

interface Props2 {
  children: ReactNode;
  className?: string;
}

export const WhatIsPrItem = ({ children, className = ' bg-gray-600 bg-opacity-10' }: Props2) => {
  return (
    <div
      className={twMerge(
        'text-5xl lg:text-2xl rounded-3xl p-16 bg-opacity-25 dark:text-dark-body text-light-body leading-normal',
        className
      )}
    >
      {children}
    </div>
  );
};
