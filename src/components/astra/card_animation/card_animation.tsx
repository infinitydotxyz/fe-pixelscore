import Slider, { Settings } from 'react-slick';
import { NFTCard } from 'utils/types/be-types';
import { AnimationCard } from './animation_card';

export const CardAnimation = () => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-9">
        <ScrollingCards rtl={true} />
        <ScrollingCards rtl={false} />
        <ScrollingCards rtl={true} />
        <ScrollingCards rtl={false} />
      </div>
    </div>
  );
};

interface Props {
  rtl?: boolean;
}

export const ScrollingCards = ({ rtl = false }: Props) => {
  const settings: Settings = {
    infinite: true,
    speed: 4610,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    // cssEase: '',
    // easing: '',
    rtl: rtl,
    draggable: false,
    arrows: false,
    vertical: true,
    swipe: false,
    touchMove: false,
    pauseOnHover: false,
    pauseOnFocus: false
  };

  const tokenCards = () => {
    const cards: NFTCard[] = [
      {
        image:
          'https://lh3.googleusercontent.com/Jf_xtDTJyd8t0EqoPpAclkwafPcOtX5PaAEk5UQsnFxpxaSpMcnm9YLum3K92KhpghIIzPfLOyfHlAZoqNZS2iEbN_9lHsMpltMzcw',
        tokenId: '1000',
        id: '11',
        title: 'Inverted Mutants'
      },
      {
        image:
          'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',
        tokenId: '2000',
        id: '11',
        title: 'League of Sacred Devils'
      },
      {
        image:
          'https://lh3.googleusercontent.com/YMMvZZ3fie646C1zkJcn60O7rY6GUCDQfW0JUMpWiTPrJscWcBhpK5PtQ7eX4tckZxYmHxFJzgfzfPtM4B0SUSS2e2MkOYec_srW',
        tokenId: '1000',
        id: '11',
        title: '0 N1 Frame'
      },
      {
        image:
          'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',
        tokenId: '3129',
        id: '11',
        title: '0 N1 Frame'
      }
    ];

    return cards.map((card) => {
      return [<AnimationCard data={card} height={330} selected={false} onClick={() => console.log('dl')} />];
    });
  };

  return (
    <div className="h-auto w-[290px] text-3xl">
      <Slider {...settings}>{tokenCards()}</Slider>
    </div>
  );
};
