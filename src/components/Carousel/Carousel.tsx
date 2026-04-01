import { forwardRef, createContext, useCallback, useEffect, KeyboardEvent, useState } from 'react';
import { getCommonProps, SpacingTokens } from '../../utils';
import classnames from 'classnames';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

export type CarouselApi = UseEmblaCarouselType[1];

// to expose more options from the embla carousel API
// see what is available in https://www.embla-carousel.com/api/options/
export interface CarouselProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'ul', CustomComponent, etc. Defaults to 'div'.
   */
  element?: React.ElementType;
  /**
   * Whether the carousel should loop.
   */
  loop?: boolean;
  /**
   * The index to start the carousel at. Can be used if you want the carousel to be controlled.
   */
  startIndex?: number;
  /**
   * Function to call when the slide changes.
   */
  onSlideChange?: (index: number) => void;
  /**
   * The horizontal gap between the carousel items.
   */
  columnGap?: SpacingTokens;
  /**
   * Whether the carousel should use wheel gestures.
   */
  useWheelGestures?: boolean;
  /**
   * Whether the carousel should disable dragging.
   */
  disableDrag?: boolean;
  /**
   * Whether to disable dragging to navigate between slides for different viewports.
   */
  disableNavigationDrag?: 'mobile' | 'desktop' | 'all' | null;
  /**
   *  The threshold for slides to be considered in view. A value of 0.1 means that 10% of the slide must be in view for it to be considered in view.
   */
  inViewThreshold?: number;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

export const CarouselContext = createContext<CarouselContextProps | null>(null);

/**
 * ## Overview
 *
 * Carousel component
 *
 * Combine with CarouselContent, CarouselItem, and CarouselDots to use
 *
 * API Inspired by https://ui.shadcn.com/docs/components/carousel#api
 *
 * Built on top of https://github.com/davidjerleke/embla-carousel
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=7068-6007&t=HYwLAd3xkKAOgjpo-1)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-carousel--overview)
 */
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      element: CustomElement,
      loop = false,
      startIndex = 0,
      onSlideChange,
      className,
      children,
      columnGap,
      useWheelGestures = false,
      disableDrag = false,
      disableNavigationDrag = null,
      inViewThreshold = 0.99,
      ...props
    },
    ref,
  ) => {
    const Component = CustomElement || 'div';
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');
    let disableNavigationDragBreakpoint = {};
    switch (disableNavigationDrag) {
      case 'mobile':
        disableNavigationDragBreakpoint = { breakpoints: { '(max-width: 960px)': { watchDrag: false } } };
        break;
      case 'desktop':
        disableNavigationDragBreakpoint = { breakpoints: { '(min-width: 961px)': { watchDrag: false } } };
        break;
      case 'all':
        disableNavigationDragBreakpoint = { watchDrag: false };
        break;
      default:
        disableNavigationDragBreakpoint = {};
    }

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const [carouselRef, api] = useEmblaCarousel(
      {
        loop,
        startIndex,
        inViewThreshold,
        ...disableNavigationDragBreakpoint,
      },
      [
        ...(useWheelGestures
          ? [
              WheelGesturesPlugin({
                forceWheelAxis: 'x',
              }),
            ]
          : []),
        ClassNames({
          snapped: 'carousel-item-in-view',
        }),
      ],
    );

    useEffect(() => {
      if (disableDrag) {
        api?.reInit({
          watchDrag: () => false,
        });
      } else {
        api?.reInit({
          watchDrag: () => true,
        });
      }
    }, [disableDrag, api]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          api?.scrollPrev();

          const prevNode = api?.slideNodes().filter((el) => el === document.activeElement)[0]
            ?.previousElementSibling as HTMLElement;

          if (prevNode) {
            prevNode?.focus();
          }
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          api?.scrollNext();
          const nextNode = api?.slideNodes().filter((el) => el === document.activeElement)[0]
            ?.nextElementSibling as HTMLElement;

          if (nextNode) {
            nextNode?.focus();
          }
        }
      },
      [api],
    );

    const onSlidesInView = useCallback(
      (api: CarouselApi) => {
        if (!api) return;

        setCanScrollPrev(api?.canScrollPrev());
        setCanScrollNext(api?.canScrollNext());

        const slideIndex = api.slidesInView()?.[0];
        if (slideIndex !== undefined) {
          onSlideChange?.(slideIndex);
        }
      },
      [onSlideChange],
    );

    useEffect(() => {
      if (!api) {
        return;
      }
      api.on('slidesInView', onSlidesInView);
      return () => {
        api.off('slidesInView', onSlidesInView);
      };
    }, [api, onSlidesInView]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          scrollPrev: () => api?.scrollPrev(),
          scrollNext: () => api?.scrollNext(),
          canScrollPrev,
          canScrollNext,
          columnGap,
          onSlideChange,
        }}
      >
        <Component
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={classnames(baseClassName, className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
          {...commonProps}
        >
          {children}
        </Component>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

export default Carousel;
