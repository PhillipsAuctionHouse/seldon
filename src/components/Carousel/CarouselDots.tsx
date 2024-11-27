import classNames from 'classnames';
import { EmblaCarouselType } from 'embla-carousel';
import { ComponentProps, forwardRef, useCallback, useEffect, useState, useId, useRef, useMemo } from 'react';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';
import { CarouselDot } from './CarouselDot';

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
  ({ className, maxDots = 9, position = 'inline', numberOfSlides = 0, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');
    const componentId = useId();
    const { api, onSlideChange } = useCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>(
      Array.from({ length: numberOfSlides }, (_, index) => index),
    );
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const [inViewDots, setInViewDots] = useState<number[]>([]);

    const scrollToDot = useCallback((index: number) => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTo?.({
          // 8 + 12 = width of dot plus gap
          left: index * (8 + 12) - scrollableContainerRef.current.offsetWidth / 2 + 10, // Center dot in container
          behavior: 'smooth',
        });
      }
    }, []);

    const onDotButtonClick = useCallback(
      (index: number) => {
        if (!api) return;
        api.scrollTo(index, true);
        onSlideChange?.(index);
      },
      [api, onSlideChange],
    );

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback(
      (emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        scrollToDot(emblaApi.selectedScrollSnap());
      },
      [scrollToDot],
    );

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

    const sortedInViewDots = useMemo(() => inViewDots.sort((a, b) => a - b), [inViewDots]);

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
          <div
            style={{ '--max-width': `${maxDots * 8 + (maxDots - 1) * 12}px` } as React.CSSProperties}
            className={`${baseClassName}-pagination-container-inner`}
            ref={scrollableContainerRef}
          >
            {scrollSnaps.map((_, index) => {
              const isSelected = selectedIndex === index;
              const indexOfInViewDots = sortedInViewDots.indexOf(index);
              const isShrinked =
                indexOfInViewDots !== -1 &&
                (indexOfInViewDots <= 1 || indexOfInViewDots >= sortedInViewDots.length - 2) &&
                !(index <= 1 && sortedInViewDots.includes(0) && sortedInViewDots.includes(1)) &&
                !(
                  index >= scrollSnaps.length - 2 &&
                  sortedInViewDots.includes(scrollSnaps.length - 1) &&
                  sortedInViewDots.includes(scrollSnaps.length - 2)
                );

              return (
                <CarouselDot
                  key={`${componentId}-dot-${index}`}
                  onClick={() => onDotButtonClick(index)}
                  isSelected={isSelected}
                  baseClassName={baseClassName}
                  scrollableContainerRef={scrollableContainerRef}
                  onInViewChange={(inView) => {
                    if (inView) {
                      setInViewDots((prev) => [...prev, index]);
                    } else {
                      setInViewDots((prev) => prev.filter((dot) => dot !== index));
                    }
                  }}
                  isShrinked={isShrinked || !inViewDots.includes(index)}
                />
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
