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
      'https://lh3.googleusercontent.com/KWgK5YzNYNTvXp4CAMBNXeJqGqFWa0VdOetSfXjub72ym5AfLmXfKWNxIdg3s-Tn79MNEaViiDYdigIOrryry9XgLbVg2Z7mrGHNW-o',

      'https://lh3.googleusercontent.com/klaHZJTr_FDTSu_9EAyCJF5b28lKQMBVkYJ-V4YyyBkZxfZTfyydW-SPWY-IYLmD3KslTNGY4lP-XPb05-yr8hBSN412TMXxnfBpj5Y',

      'https://lh3.googleusercontent.com/u5N34xTSVkOzAL8edkTR_j1Akfx0qx7z7uoDg_tL3sKgIKi-RrZFwlomfwNjFsiUg9eaU-6R8F0dl1a4Zgk8dG9pv9H47nuq2eRn',

      'https://lh3.googleusercontent.com/enz6ouKqA5TuoWHNoct5oWR_S3lD5IKPJv6ZReAsDhBBAjGJGe2YjymdF8mrgwaTRCxtmX06LxnGHDyAoP-C-djFWU-7wpyGaHYifA',

      'https://lh3.googleusercontent.com/zmpX1Jd-zkGqw23axJLGdINaas_CY9gjdDmPZKUIG5wRrQfpEKtnp0AR_qqcV2upOZUtmvniuEeF9bK_CQUYBSdLfSWzYwTq36pQ'
    ];

    const fcards = first.map((card) => {
      return [<GallaryCard data={card} />];
    });

    const sec: string[] = [
      'https://lh3.googleusercontent.com/RkXgUsHyjpMktcAQHziSDTODjQaj-qPvsin6_zLAjZaC5G8rrSwpRdmr2_70p9abXVxwwf_fCo_IJz4GRHGVTlGjeOZm2kSGgzMrZA',

      'https://lh3.googleusercontent.com/yFtnRNxGwwNITszT4xy4KRr6I2_D-QuMa8LmwhjeyUgtxbp_L41fAuNcGFI9MgxQAE_LCTnbuWryP7y8i8mHSuGM94u1kHlTxlvd',

      'https://lh3.googleusercontent.com/AuQQdFnOhsN-7H2ANOr7pJ6Us7tzM5Fm8zCZ1pG5H0ZKfXFkYMUvbjtjekHizMwEuf8YYx6_dRODgdb6tZoJxf31qFi4HBVG71IT1w',

      'https://lh3.googleusercontent.com/jtgvaBtPxjbWBEbTJSXyiYV1jDzLOWjq29m7MCtCu31Yq8_G-f8hQ1ZTPhCVqXsgySE1kRhxm09D9WHjNrizpkA3lj-osH-14NzFydA',

      'https://lh3.googleusercontent.com/Q47cZ2fW4dN5hkPY62r2zvnKSEkfQSOVtMG0Ckmime7QkNIMvDcnDdvRzRTId6hJsH-Owts4_YJNpTQzPol7D36y73ml3ERGT9Wn'
    ];
    const scards = sec.map((card) => {
      return [<GallaryCard data={card} />];
    });

    return [<GallaryCardRow>{fcards}</GallaryCardRow>, <GallaryCardRow>{scards}</GallaryCardRow>];
  };

  return (
    <div className="h-auto  text-3xl overflow-clip ">
      <div className="flex items-center mb-10">
        <div className="dark:text-dark-body text-6xl">Some NFTs we analyzed</div>
        <Spacer />
        <div className="flex gap-6">
          <IoIosArrowDropleft className={twMerge('h-12 w-12', 'text-dark-blue')} onClick={() => slider?.slickPrev()} />
          <IoIosArrowDropright className={twMerge('h-12 w-12', 'text-dark-blue')} onClick={() => slider?.slickNext()} />
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
