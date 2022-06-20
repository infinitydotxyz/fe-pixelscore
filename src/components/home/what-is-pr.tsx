import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const WhatIsPr = () => {
  return (
    <div className="mt-24 ">
      <div className="block text-dark-scarlet font-bold text-7xl">What is Pixelrank?</div>
      <div className="mt-6 max-w-xlg text-2xl text-dark-body">
        Pixelrank is a novel method for estimating the global rarity of NFTs. It ranks NFTs by calculating how rare an
        NFT's pixels are compared to all NFTs in existence.
      </div>

      <div className={twMerge('mt-24   grid gap-16 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2')}>
        <WhatIsPrItem className="border-fuchsia-300 bg-pink-400">
          Ranking based on our unbiased PixelScore algorithm. See our methodology{' '}
          <a href="/paper.pdf" target="_blank" className="underline">
            here
          </a>
        </WhatIsPrItem>

        <WhatIsPrItem className="border-fuchsia-300   bg-pink-400   ">
          About 55,000 collections analyzed and 10M NFTs ranked. All but the top 5% NFTs are revealed by default.
        </WhatIsPrItem>

        <WhatIsPrItem className="border-pink-500 bg-pink-400">
          Global and within collection rank for each NFT. Portfolio score for NFTs owned by you.
        </WhatIsPrItem>

        <WhatIsPrItem className="border-fuchsia-300 bg-pink-400">
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

export const WhatIsPrItem = ({ children, className = 'border-fuchsia-300 bg-pink-400' }: Props2) => {
  return (
    <div className={twMerge('text-3xl   border-4 rounded-3xl p-20  bg-opacity-25  text-dark-body ', className)}>
      {children}
    </div>
  );
};
