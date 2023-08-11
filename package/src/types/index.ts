import {
  EmblaOptionsType,
  UseEmblaCarouselType,
  EmblaCarouselType,
} from 'embla-carousel-react';

export type { EmblaOptionsType, EmblaCarouselType };

export type EmblaCarouelRefType = UseEmblaCarouselType[0];

export type CarouselOptionsType = Omit<EmblaOptionsType, 'breakpoints'> & {
  slidesPerView?: number;
  slidesGap?: string;
  breakpoints?: EmblaOptionsType['breakpoints'] & {
    [key: string]: {
      slidesPerView?: number;
      slidesGap?: string;
    };
  };
};

export type NavigationItemType = {
  canScrollNext: boolean;
  canScrollPrev: boolean;
  handleScrollNext: () => void;
  handleScrollPrev: () => void;
};

export type PaginationItemType = {
  selectedIndex: number;
  scrollSnaps: number[];
  handleScrollToIndex: (index: number) => void;
};
