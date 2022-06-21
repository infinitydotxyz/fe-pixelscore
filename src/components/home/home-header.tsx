import { LargeButton } from 'components/common';
import { useNavigate } from 'react-router-dom';
import { CardAnimation } from './card_animation/card_animation';

export const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <CardAnimation />
      <div className="absolute bottom-0 top-0 left-0 w-full bg-gradient-to-r dark:from-dark-bg from-light-bg" />
      <div className="absolute bottom-0 right-0 left-0 h-96 bg-gradient-to-t dark:from-dark-bg from-light-bg" />
      <div className="absolute top-0 right-0 left-0 h-96 bg-gradient-to-b dark:from-dark-bg from-light-bg" />

      <div className="absolute bottom-0 mt-44 top-0 left-0 right-0">
        {/* <HomePageLogo /> */}

        <div className="mt-28">
          <div className="block dark:text-dark-blue text-light-blue font-bold text-9xl font-pixel">Pixelrank</div>
          <div className="mt-6 max-w-lg text-6xl lg:text-2xl dark:text-dark-body text-light-body leading-normal">
            The world's only global NFT ranking. Pure math. No bias.
          </div>
          <div className="mt-16">
            <div className="space-x-14 ">
              <LargeButton
                onClick={() => navigate('app')}
                className="dark:text-dark-body text-light-body hover:opacity-75 text-6xl lg:text-2xl"
              >
                Rankings
              </LargeButton>
              <LargeButton
                onClick={() => ''}
                propagateClick={true}
                className="dark:text-dark-body text-light-body hover:opacity-75 text-6xl lg:text-2xl"
              >
                <a href="./paper.pdf" target="_blank">
                  Paper
                </a>
              </LargeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
