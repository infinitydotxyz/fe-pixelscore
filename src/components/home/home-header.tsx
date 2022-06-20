import { LargeButton } from 'components/common';
import { useNavigate } from 'react-router-dom';
import { CardAnimation } from './card_animation/card_animation';

export const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <CardAnimation />
      <div className="absolute bottom-0 top-0 left-0 w-full bg-gradient-to-r from-dark-bg" />
      <div className="absolute bottom-0 right-0 left-0 h-96 bg-gradient-to-t from-dark-bg" />
      <div className="absolute top-0 right-0 left-0 h-96 bg-gradient-to-b from-dark-bg" />

      <div className="absolute bottom-0 mt-44 top-0 left-0 right-0">
        {/* <HomePageLogo /> */}

        <div className="mt-28">
          <div className="block dark:text-dark-scarlet font-bold text-9xl">Pixelrank</div>
          <div className="mt-6 max-w-lg text-2xl dark:text-dark-body">
            The world's only global NFT ranking. Pure Math. No bias.
          </div>
          <div className="mt-16">
            <div className="space-x-14 ">
              <LargeButton onClick={() => navigate('app')} className="dark:text-dark-blue hover:opacity-75">
                Rankings
              </LargeButton>
              <LargeButton onClick={() => navigate('paper')} className="dark:text-dark-blue hover:opacity-75">
                Paper
              </LargeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};