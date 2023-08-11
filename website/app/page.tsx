'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import * as Carousel from '@turn25/react-headless-carousel';

export default function Page() {
  return (
    <main className='container mx-auto py-16'>
      <Carousel.Root
        options={{
          slidesPerView: 2,
          slidesGap: '12px',
          slidesToScroll: 2,
          breakpoints: {
            '1200px': {
              slidesPerView: 3,
              slidesToScroll: 3,
              slidesGap: '16px',
            },
            '1500px': {
              slidesPerView: 4,
              slidesToScroll: 4,
              slidesGap: '20px',
            },
          },
        }}
        className='relative rounded-lg border p-6'
      >
        <Carousel.Viewport>
          {new Array(12).fill('').map((i, index) => (
            <Carousel.Slide key={index} index={index + 1}>
              <div
                tabIndex={0}
                className='flex aspect-video items-center justify-center rounded-lg bg-neutral-200 text-5xl font-bold text-neutral-500'
              >
                {index}
              </div>
            </Carousel.Slide>
          ))}
        </Carousel.Viewport>

        <Carousel.Pagination
          className='mt-6 flex h-12 w-full items-center justify-center space-x-2 max-lg:hidden'
          renderItem={({ index, props }) => (
            <span
              {...props}
              className='inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-neutral-100 text-xs shadow-medium transition-all hover:bg-neutral-200 aria-[current]:bg-neutral-300'
            >
              {index}
            </span>
          )}
        />

        <Carousel.PrevButton className='absolute left-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-neutral-100 shadow-medium transition-all hover:bg-neutral-200 disabled:invisible disabled:opacity-0 max-lg:hidden'>
          <ChevronRightIcon className='rotate-180' />
        </Carousel.PrevButton>
        <Carousel.NextButton className='absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-neutral-100 shadow-medium transition-all hover:bg-neutral-200 disabled:invisible disabled:opacity-0 max-lg:hidden'>
          <ChevronRightIcon />
        </Carousel.NextButton>
      </Carousel.Root>
    </main>
  );
}
