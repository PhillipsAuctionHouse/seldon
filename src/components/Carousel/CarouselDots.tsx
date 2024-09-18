import classNames from 'classnames';
import { EmblaCarouselType } from 'embla-carousel';
import { ComponentProps, forwardRef, useCallback, useEffect, useState } from 'react';
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
  ({ className, maxDots = 7, position = 'inline', ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');
    const { api } = useCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
      (index: number) => {
        if (!api) return;
        api.scrollTo(index, true);
      },
      [api],
    );

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
      if (!api) {
        return;
      }

      onInit(api);
      onSelect(api);
      api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
    }, [api, onInit, onSelect]);

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
        <div
          className={`${baseClassName}-pagination-container`}
          style={{
            transform: `translateX(${selectedIndex * 20}px)`,
          }}
        >
          <div
            className={`${baseClassName}-pagination-container-inner`}
            style={{
              transform: `translateX(${-selectedIndex * 20}px)`,
            }}
          >
            {visibleDots.map((_, index) => {
              const actualIndex = scrollSnaps.indexOf(visibleDots[index]);
              const isSelected = selectedIndex === actualIndex;
              const isNeighbor = Math.abs(selectedIndex - actualIndex) === 1;
              const isLocalEdge = index === 0 || index === visibleDots.length - 1;
              const isEdge = !isSelected && !isNeighbor && isLocalEdge;

              return (
                <button
                  key={actualIndex}
                  role="button"
                  onClick={() => onDotButtonClick(actualIndex)}
                  className={classNames(`${baseClassName}-pagination-dot-container`)}
                >
                  <span
                    className={classNames(`${baseClassName}-pagination-dot`, {
                      [`${baseClassName}-pagination-dot-selected`]: isSelected,
                      [`${baseClassName}-pagination-dot-neighbor`]: isNeighbor,
                      [`${baseClassName}-pagination-dot-edge`]: isEdge || (isLocalEdge && !isSelected),
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
