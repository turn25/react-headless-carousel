import * as React from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import {
  CarouselOptionsType,
  EmblaCarouelRefType,
  NavigationItemType,
  PaginationItemType,
} from '@/types';
import { removeKeys } from '@/utils';
import { SlideFocus } from '@/plugins';

export type UseCarouselType = {
  carouselRef: EmblaCarouelRefType;
  carouselApi: EmblaCarouselType;
  navigation: NavigationItemType;
  pagination: PaginationItemType;
  computedStyles: string;
};

const createEmblaConfig = (config: CarouselOptionsType) => {
  const newBreakpoints = config?.breakpoints
    ? Object.keys(config.breakpoints).reduce(
        (acc, cur) => (
          (acc[`(min-width: ${cur})`] = config.breakpoints[cur]), acc
        ),
        {}
      )
    : {};

  return removeKeys({ ...config, breakpoints: { ...newBreakpoints } }, [
    'slidesPerView',
    'slidesGap',
  ]);
};

const useCarousel = (options?: CarouselOptionsType): UseCarouselType => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      align: 'start',
      containScroll: 'trimSnaps',
      loop: false,
      ...createEmblaConfig(options),
    },
    [SlideFocus()]
  );

  const computedStyles = React.useMemo(() => {
    const cssVarTokens = {
      slidesPerView: '--rhc-slides-per-view',
      slidesGap: '--rhc-slides-gap',
    };
    const defaultSlidesPerView = `${cssVarTokens.slidesPerView}:${
      options?.slidesPerView ?? 1
    };${cssVarTokens.slidesGap}:${options?.slidesGap ?? '0px'}`;
    const breakpointsSlidesPerView =
      options.breakpoints &&
      Object.keys(options.breakpoints).map((key) => {
        const breakpoints = options.breakpoints[key];
        const slidesPerViews = breakpoints?.slidesPerView
          ? `${cssVarTokens.slidesPerView}:${breakpoints.slidesPerView};`
          : '';
        const slidesGap = breakpoints?.slidesGap
          ? `${cssVarTokens.slidesGap}:${breakpoints.slidesGap};`
          : '';

        return `@media (min-width: ${key}) {${slidesPerViews}${slidesGap}}`;
      });

    const result = [defaultSlidesPerView].concat(breakpointsSlidesPerView);

    return result.join('; ');
  }, [options.breakpoints, options.slidesPerView, options.slidesGap]);

  const [canScrollPrev, setCanScrollPrev] = React.useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const handleScrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const handleScrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const handleScrollToIndex = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    carouselRef: emblaRef,
    carouselApi: emblaApi,
    navigation: {
      canScrollNext,
      canScrollPrev,
      handleScrollNext,
      handleScrollPrev,
    },
    pagination: {
      selectedIndex,
      scrollSnaps,
      handleScrollToIndex,
    },
    computedStyles: computedStyles,
  };
};

export { useCarousel };
