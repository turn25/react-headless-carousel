import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react';

const defaultOptions: EmblaOptionsType = {};
const globalOptions: EmblaOptionsType = {};

// Plugin
const SlideFocus = (userOptions?: any) => {
  const options = Object.assign({}, defaultOptions, globalOptions, userOptions);
  let carousel: EmblaCarouselType;
  let lastTabPressTime = 0;

  function init(embla: EmblaCarouselType) {
    carousel = embla;
    const { eventStore } = carousel.internalEngine();

    eventStore.add(document, 'keydown', registerTabPress, false);
    carousel.slideNodes().forEach(addSlideFocusEvent);
  }

  function destroy() {}

  function registerTabPress(event: KeyboardEvent) {
    if (event.code !== 'Tab') return;
    lastTabPressTime = new Date().getTime();
  }

  function addSlideFocusEvent(slide: EventTarget, index: number) {
    const { scrollTo, eventStore, options } = carousel.internalEngine();

    const focus = (): void => {
      const nowTime = new Date().getTime();
      const diffTime = nowTime - lastTabPressTime;

      if (diffTime > 10) return;

      carousel.rootNode().scrollLeft = 0;
      const selectedIndex = Math.floor(index / +options?.slidesToScroll);
      scrollTo.index(selectedIndex, 0);
    };

    eventStore.add(slide, 'focus', focus, true);
  }

  const self = {
    name: 'SlideFocus',
    options,
    init,
    destroy,
  };
  return self;
};

export { SlideFocus };
