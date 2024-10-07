import classNames from 'classnames';
import { EmblaCarouselType } from 'embla-carousel';
import { ComponentProps, forwardRef, useCallback, useEffect, useState, useId } from 'react';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';

export interface CarouselDotsProps extends ComponentProps<'div'> {
  /**
   * The maximum number of dots to display.
   */
  maxDots?: number;
  /**
   * The position of the dots.
   */
  position?: 'on-content' | 'inline';
  /**
   * The number of slides (used to pre-calc the number of dots to render before embla API initializes)
   * otherwise you can get slight layout shift before the number of slides is calculated
   */
  numberOfSlides?: number;
}

/**
 * ## Overview
 *
 * Carousel dots component that displays pagination for the carousel.
 * It supports a maximum number of visible dots
 * The dots animate left to right as the user navigates through the carousel.
 *
 */
const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, maxDots = 7, position = 'inline', numberOfSlides = 0, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');
    const componentId = useId();
    const { api, onSlideChange } = useCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>(
      Array.from({ length: numberOfSlides }, (_, index) => index),
    );

    const onDotButtonClick = useCallback(
      (index: number) => {
        if (!api) return;
        api.scrollTo(index, true);
        onSlideChange?.(index);
      },
      [api, onSlideChange],
    );

    console.log(api?.slideNodes());

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    const onSettle = useCallback(
      (emblaApi: EmblaCarouselType) => {
        onSlideChange?.(emblaApi.selectedScrollSnap());
      },
      [onSlideChange],
    );

    useEffect(() => {
      if (!api) {
        return;
      }

      onInit(api);
      onSelect(api);
      api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect).on('settle', onSettle);
      return () => {
        api.off('reInit', onInit).off('reInit', onSelect).off('select', onSelect).off('settle', onSettle);
      };
    }, [api, onInit, onSelect, onSettle]);

    const getVisibleDots = () => {
      if (scrollSnaps.length <= maxDots) return scrollSnaps;

      const halfMax = Math.floor(maxDots / 2);
      let start = Math.max(0, selectedIndex - halfMax);
      const end = Math.min(scrollSnaps.length, start + maxDots);

      if (end - start < maxDots) {
        start = Math.max(0, end - maxDots);
      }

      return scrollSnaps.slice(start, end);
    };

    const visibleDots = getVisibleDots();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="pagination"
        aria-label="pagination"
        className={classNames(`${baseClassName}-pagination`, className, `${baseClassName}-pagination-${position}`)}
        {...props}
        {...commonProps}
      >
        <div className={`${baseClassName}-pagination-container`}>
          <div className={`${baseClassName}-pagination-container-inner`}>
            {visibleDots.map((_, index) => {
              const actualIndex = scrollSnaps.indexOf(visibleDots[index]);
              const isSelected = selectedIndex === actualIndex;

              return (
                <button
                  key={`${componentId}-dot-${index}`}
                  role="button"
                  onClick={() => onDotButtonClick(actualIndex)}
                  className={classNames(`${baseClassName}-pagination-dot-container`)}
                >
                  <span
                    className={classNames(`${baseClassName}-pagination-dot`, {
                      [`${baseClassName}-pagination-dot-selected`]: isSelected,
                    })}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
CarouselDots.displayName = 'CarouselDots';

export default CarouselDots;
