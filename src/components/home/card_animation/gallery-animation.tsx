import Slider, { Settings } from 'react-slick';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Spacer, BGImage } from 'components/common';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  rtl?: boolean;
  speed?: number;
}

export const GalleryAnimation = ({ rtl = false, speed = 400 }: Props) => {
  const [slider, setSlider] = useState<Slider | null>();

  const settings: Settings = {
    infinite: true,
    speed: speed,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    const first: string[] = [
      'https://lh3.googleusercontent.com/Jf_xtDTJyd8t0EqoPpAclkwafPcOtX5PaAEk5UQsnFxpxaSpMcnm9YLum3K92KhpghIIzPfLOyfHlAZoqNZS2iEbN_9lHsMpltMzcw',

      'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',

      'https://lh3.googleusercontent.com/YMMvZZ3fie646C1zkJcn60O7rY6GUCDQfW0JUMpWiTPrJscWcBhpK5PtQ7eX4tckZxYmHxFJzgfzfPtM4B0SUSS2e2MkOYec_srW',

      'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',

      'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn'
    ];

    const fcards = first.map((card) => {
      return [<GallaryCard data={card} />];
    });

    const sec: string[] = [
      'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',

      'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',

      'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn',

      'https://lh3.googleusercontent.com/0HqZ1QL3unovSgTHyLJS8lJswR4s2YYYj3K0dR9iufxj9bOWp_LXJLKO7fblhhxpYo5iwrVy8v9aBYCLMqYHhvhCz_bX5EHgoVqWiQ',

      'https://lh3.googleusercontent.com/Q21eS9tBnD50VzdbXWQUHM3GgQ4qIgIoZL8yCLGj_3V0fL6yxkzN8ICZ_X7ISItbuXZLQ-GZGWGTPMkY51EIgFHrsGfF3MztO5Zn'
    ];
    const scards = sec.map((card) => {
      return [<GallaryCard data={card} />];
    });

    return [<GallaryCardRow>{fcards}</GallaryCardRow>, <GallaryCardRow>{scards}</GallaryCardRow>];
  };

  return (
    <div className="h-auto  text-3xl overflow-clip ">
      <div className="flex items-center mb-10">
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

// ===========================================================================

interface Props2 {
  data: string;
}

export const GallaryCard = ({ data }: Props2): JSX.Element => {
  return (
    <div className={twMerge('rounded-2xl overflow-clip aspect-square ')}>
      <BGImage src={data} className="hover:scale-110 transition-all" />
    </div>
  );
};

// ===========================================================================

interface Props3 {
  children: ReactNode;
}

export const GallaryCardRow = ({ children }: Props3): JSX.Element => {
  return <div className={twMerge('grid grid-cols-5 gap-4   ')}>{children}</div>;
};
