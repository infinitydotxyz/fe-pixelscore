import Slider, { Settings } from 'react-slick';
import { NFTCard } from 'utils/types/be-types';
import { AnimationCard } from './animation_card';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import { Spacer } from 'components/common';
import { useState } from 'react';

interface Props {
  rtl?: boolean;
  speed?: number;
}

export const GalleryAnimation = ({ rtl = false, speed = 400 }: Props) => {
  const [slider, setSlider] = useState<Slider | null>();

  const settings: Settings = {
    infinite: true,
    speed: speed,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    easing: 'linear',
    rtl: rtl,
    draggable: false,
    arrows: false,
    vertical: false,
    swipe: true,
    touchMove: true,
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
          'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',
        tokenId: '2000',
        id: '11',
        title: 'League of Sacred Devils'
      },
      {
        image:
          'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',
        tokenId: '3129',
        id: '11',
        title: '0 N1 Frame'
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
          'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',
        tokenId: '3129',
        id: '11',
        title: '0 N1 Frame'
      },
      {
        image:
          'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',
        tokenId: '2000',
        id: '11',
        title: 'League of Sacred Devils'
      }
    ];

    return cards.map((card) => {
      return [
        <AnimationCard data={card} height={330} selected={false} onClick={() => console.log('dl')} className="p-4" />
      ];
    });
  };

  return (
    <div className="h-auto  text-3xl">
      <div className="flex items-center">
        <div className="dark:text-dark-body text-6xl">NFT Gallery</div>
        <Spacer />
        <div className="flex gap-6">
          <IoIosArrowDropleft className={twMerge('h-20 w-20', 'text-blue-600')} onClick={() => slider?.slickPrev()} />
          <IoIosArrowDropright className={twMerge('h-20 w-20', 'text-blue-600')} onClick={() => slider?.slickNext()} />
        </div>
      </div>

      <Slider ref={(slider) => setSlider(slider)} {...settings}>
        {tokenCards()}
      </Slider>
    </div>
  );
};
