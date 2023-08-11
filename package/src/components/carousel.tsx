import * as React from 'react';
import { useCarousel } from '@/hooks';
import { CarouselOptionsType } from '@/types';
import {
  CarouselContext,
  CarouselViewportContext,
  useCarouselContext,
  useCarouselViewportContext,
} from './context';

export interface CarouselRoot extends React.HTMLAttributes<HTMLDivElement> {
  options?: CarouselOptionsType;
}

const Root = React.forwardRef<HTMLDivElement, CarouselRoot>((props, ref) => {
  const { children, options, ...rest } = props;
  const { carouselRef, navigation, pagination, computedStyles } = useCarousel({
    ...options,
  });

  return (
    <CarouselContext.Provider
      value={{
        navigation: navigation,
        pagination: pagination,
        carouselRef: carouselRef,
      }}
    >
      <div
        ref={ref}
        rhc-root=''
        dir={options?.direction || undefined}
        data-vertial-scroll={options?.axis === 'y' ? '' : undefined}
        {...rest}
      >
        <style
          scoped
          suppressHydrationWarning
          style={{
            display: 'none !important',
            margin: '0px !important',
            padding: '0px !important',
          }}
        >
          {`
            [rhc-viewport] {
              ${computedStyles}
              overflow: hidden;
            }

            [rhc-container] {
              display: flex;
              backface-visibility: hidden;
              flex-direction: row;
              touch-action: pan-y;
              height: auto;
              margin-left: calc(-1 * var(--rhc-slides-gap) / 2);
              margin-right: calc(-1 * var(--rhc-slides-gap) / 2);
            }

            [rhc-slide] {
              position: relative;
              min-width: 0px;
              max-width: 100%;
              flex: 0 0 calc(100% / var(--rhc-slides-per-view));
              padding-left: calc(var(--rhc-slides-gap) / 2);
              padding-right: calc(var(--rhc-slides-gap) / 2);
            }

            [rhc-root][data-vertial-scroll] [rhc-container] {
              touch-action: pan-x;
              flex-direction: column;
              margin: 0;
              margin-top: calc(-1 * var(--rhc-slides-gap) / 2);
              margin-bottom: calc(-1 * var(--rhc-slides-gap) / 2);
            }
            [rhc-root][data-vertial-scroll] [rhc-slide] {
              padding: 0;
              padding-top: calc(var(--rhc-slides-gap) / 2);
              padding-bottom: calc(var(--rhc-slides-gap) / 2);
            }
          `}
        </style>
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Root.displayName = 'Root';

export interface CarouselViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Viewport = (props: CarouselViewportProps) => {
  const { children, ...rest } = props;
  const { carouselRef } = useCarouselContext();

  return (
    <CarouselViewportContext.Provider
      value={{ totalSlides: React.Children.count(children) ?? 0 }}
    >
      <div ref={carouselRef} rhc-viewport=''>
        <div rhc-container='' aria-live='polite' {...rest}>
          {children}
        </div>
      </div>
    </CarouselViewportContext.Provider>
  );
};

export interface CarouselSlideProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const Slide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  (props, ref) => {
    const { children, index = 0, ...rest } = props;
    const { totalSlides } = useCarouselViewportContext();

    return (
      <div
        rhc-slide=''
        ref={ref}
        role='group'
        aria-label={`Slide ${index} / ${totalSlides}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
Slide.displayName = 'Slide';

export interface CarouselNavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onNavigation?: (e: React.MouseEvent) => void;
}

const PrevButton = React.forwardRef<
  HTMLButtonElement,
  CarouselNavigationButtonProps
>((props, ref) => {
  const { onNavigation, ...rest } = props;
  const { navigation } = useCarouselContext();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!navigation.canScrollPrev) return;
      navigation.handleScrollPrev();
      onNavigation?.(e);
    },
    [onNavigation, navigation.handleScrollPrev, navigation.canScrollPrev]
  );

  return (
    <button
      rhc-nav-prev=''
      aria-label={'Navigate Next Slide Button'}
      ref={ref}
      onClick={handleClick}
      disabled={!navigation.canScrollPrev}
      data-disabled={!navigation.canScrollPrev}
      {...rest}
    />
  );
});
PrevButton.displayName = 'PrevButton';

const NextButton = React.forwardRef<
  HTMLButtonElement,
  CarouselNavigationButtonProps
>((props, ref) => {
  const { onNavigation, ...rest } = props;
  const { navigation } = useCarouselContext();

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (!navigation.canScrollNext) return;
      navigation.handleScrollNext();
      onNavigation?.(e);
    },
    [onNavigation, navigation.handleScrollNext, navigation.canScrollNext]
  );

  return (
    <button
      rhc-nav-next=''
      ref={ref}
      aria-label={'Navigate Previous Slide Button'}
      onClick={handleClick}
      disabled={!navigation.canScrollNext}
      data-disabled={!navigation.canScrollNext}
      {...rest}
    />
  );
});
NextButton.displayName = 'NextButton';

type PaginationItemProps = {
  index: number;
  isActive: boolean;
  props: any;
};

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  renderItem?: (props: PaginationItemProps) => React.ReactNode;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const { renderItem: renderItemProps, ...rest } = props;
    const { pagination } = useCarouselContext();

    const renderItem = React.useCallback(
      (_, index, array) => {
        const isActive = index === pagination.selectedIndex;
        const defaultProps = {
          'rhc-pagination-dot': '',
          'aria-current': isActive || undefined,
          'data-active': isActive,
          'aria-label': `Go to slide ${index + 1}/${array.length}`,
          onClick: () => pagination.handleScrollToIndex(index),
        } as React.HTMLAttributes<HTMLDivElement>;

        if (renderItemProps)
          return (
            <React.Fragment key={index}>
              {renderItemProps({
                index,
                isActive,
                props: defaultProps,
              })}
            </React.Fragment>
          );

        return <span role='button' key={index} {...defaultProps} />;
      },
      [
        renderItemProps,
        pagination.selectedIndex,
        pagination.handleScrollToIndex,
      ]
    );

    return (
      <div rhc-pagination='' ref={ref} {...rest}>
        {pagination.scrollSnaps.map(renderItem)}
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Root, Viewport, Slide, PrevButton, NextButton, Pagination };
