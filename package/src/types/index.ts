import type {
  EmblaOptionsType,
  UseEmblaCarouselType,
  EmblaCarouselType,
} from 'embla-carousel-react';

export type { EmblaOptionsType, EmblaCarouselType };

export type EmblaCarouelRefType = UseEmblaCarouselType[0];

export type CreateOptionsType<T> = T & {
  active: boolean;
  breakpoints: Record<
    string,
    Omit<Partial<CreateOptionsType<T>>, 'breakpoints' | 'axis'>
  >;
};

export type OptionsType = Partial<
  CreateOptionsType<
    Omit<EmblaOptionsType, 'breakpoints'> & {
      slidesPerView?: number;
      slidesGap?: string;
    }
  >
>;

export type CarouselOptionsType = Partial<OptionsType>;

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
