import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { UseEmblaCarouselType, EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
export { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';

type EmblaCarouelRefType = UseEmblaCarouselType[0];
type CarouselOptionsType = Omit<EmblaOptionsType, 'breakpoints'> & {
    slidesPerView?: number;
    slidesGap?: string;
    breakpoints?: EmblaOptionsType['breakpoints'] & {
        [key: string]: {
            slidesPerView?: number;
            slidesGap?: string;
        };
    };
};
type NavigationItemType = {
    canScrollNext: boolean;
    canScrollPrev: boolean;
    handleScrollNext: () => void;
    handleScrollPrev: () => void;
};
type PaginationItemType = {
    selectedIndex: number;
    scrollSnaps: number[];
    handleScrollToIndex: (index: number) => void;
};

interface CarouselRoot extends React.HTMLAttributes<HTMLDivElement> {
    options?: CarouselOptionsType;
}
declare const Root: React.ForwardRefExoticComponent<CarouselRoot & React.RefAttributes<HTMLDivElement>>;
interface CarouselViewportProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const Viewport: (props: CarouselViewportProps) => react_jsx_runtime.JSX.Element;
interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}
declare const Slide: React.ForwardRefExoticComponent<CarouselSlideProps & React.RefAttributes<HTMLDivElement>>;
interface CarouselNavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onNavigation?: (e: React.MouseEvent) => void;
}
declare const PrevButton: React.ForwardRefExoticComponent<CarouselNavigationButtonProps & React.RefAttributes<HTMLButtonElement>>;
declare const NextButton: React.ForwardRefExoticComponent<CarouselNavigationButtonProps & React.RefAttributes<HTMLButtonElement>>;
type PaginationItemProps = {
    index: number;
    isActive: boolean;
    props: any;
};
interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    renderItem?: (props: PaginationItemProps) => React.ReactNode;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;

type UseCarouselType = {
    carouselRef: EmblaCarouelRefType;
    carouselApi: EmblaCarouselType;
    navigation: NavigationItemType;
    pagination: PaginationItemType;
    computedStyles: string;
};
declare const useCarousel: (options?: CarouselOptionsType) => UseCarouselType;

export { CarouselNavigationButtonProps, CarouselOptionsType, CarouselRoot, CarouselSlideProps, CarouselViewportProps, EmblaCarouelRefType, NavigationItemType, NextButton, Pagination, PaginationItemType, PaginationProps, PrevButton, Root, Slide, UseCarouselType, Viewport, useCarousel };
