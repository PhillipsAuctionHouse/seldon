import { ComponentProps, forwardRef, createContext, useCallback, useEffect, KeyboardEvent } from 'react';
import { getCommonProps, SpacingTokens } from '../../utils';
import classnames from 'classnames';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

export type CarouselApi = UseEmblaCarouselType[1];

// to expose more options from the embla carousel API
// see what is available in https://www.embla-carousel.com/api/options/
export interface CarouselProps extends ComponentProps<'div'> {
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
      loop = false,
      startIndex = 0,
      onSlideChange,
      className,
      children,
      columnGap,
      useWheelGestures = false,
      disableDrag = false,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');

    const [carouselRef, api] = useEmblaCarousel(
      {
        loop,
        startIndex,
      },
      [
        ...(useWheelGestures
          ? [
              WheelGesturesPlugin({
                forceWheelAxis: 'x',
              }),
            ]
          : []),
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
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          api?.scrollNext();
        }
      },
      [api],
    );

    const onSettle = useCallback(
      (api: CarouselApi) => {
        if (!api) {
          return;
        }
        onSlideChange?.(api.selectedScrollSnap());
      },
      [onSlideChange],
    );

    useEffect(() => {
      if (!api) {
        return;
      }
      onSettle(api);
      api.on('reInit', onSettle);
      api.on('settle', onSettle);

      return () => {
        api?.off('settle', onSettle);
        api?.off('reInit', onSettle);
      };
    }, [api, onSettle]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          scrollPrev: () => api?.scrollPrev(),
          scrollNext: () => api?.scrollNext(),
          canScrollPrev: api?.canScrollPrev() ?? false,
          canScrollNext: api?.canScrollNext() ?? false,
          columnGap,
          onSlideChange,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={classnames(baseClassName, className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
          {...commonProps}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

export default Carousel;
