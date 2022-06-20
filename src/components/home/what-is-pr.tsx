import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const WhatIsPr = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-24">
      <div className="block text-dark-scarlet font-bold text-7xl">What is Pixelrank?</div>
      <div className="mt-6 max-w-xlg text-2xl text-dark-body">
        Pixelrank is a novel method for estimating the global rarity of NFTs. It ranks NFTs by calculating how rare an
        NFT's pixels are compared to all NFTs in existence.
      </div>

      <div className={twMerge('mt-24 mx-12  grid gap-16 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2')}>
        <WhatIsPrItem>
          Ranking based on our unbiased PixelScore algorithm. See our methodology{' '}
          <span onClick={() => navigate('paper')} className="underline cursor-pointer">
            here
          </span>
        </WhatIsPrItem>

        <WhatIsPrItem>
          About 55,000 collections analyzed and 10M NFTs ranked. All but the top 5% NFTs are revealed by default.
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

export const WhatIsPrItem = ({ children, className = 'bg-gray-100 bg-opacity-10' }: Props2) => {
  return (
    <div className={twMerge('text-3xl rounded-3xl p-20  bg-opacity-25  text-dark-body ', className)}>{children}</div>
  );
};
