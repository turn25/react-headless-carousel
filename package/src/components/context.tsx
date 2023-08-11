import * as React from 'react';
import {
  EmblaCarouelRefType,
  NavigationItemType,
  PaginationItemType,
} from '@/types';

export interface CarouselContextType {
  navigation: NavigationItemType;
  pagination: PaginationItemType;
  carouselRef: EmblaCarouelRefType;
}

const CarouselContext = React.createContext<CarouselContextType | null>(null);

const useCarouselContext = () => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error(
      'Carousel.* component must be rendered as child of CarouselRoot component'
    );
  }

  return context;
};

interface CarouselViewportContextType {
  totalSlides: number;
}

const CarouselViewportContext =
  React.createContext<CarouselViewportContextType | null>(null);

const useCarouselViewportContext = () => {
  const context = React.useContext(CarouselViewportContext);

  if (!context) {
    throw new Error(
      'Carousel Slide component must be rendered as child of CarouselViewport component'
    );
  }

  return context;
};
export {
  CarouselContext,
  useCarouselContext,
  CarouselViewportContext,
  useCarouselViewportContext,
};
