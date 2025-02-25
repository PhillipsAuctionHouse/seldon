import classNames from 'classnames';
import { ComponentProps, forwardRef, useCallback } from 'react';
import { getCommonProps } from '../../utils';
import { useCarousel } from './utils';
import { CarouselArrowNext, CarouselArrowPrev } from '../../assets/icons';

export type CarouselArrowsProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * Arrow naivigation for the carousel.
 *
 */
const CarouselArrows = forwardRef<HTMLDivElement, CarouselArrowsProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselArrows');
  const { api } = useCarousel();
  const onPrevArrowClick = useCallback(() => {
    if (!api) return;
    api.scrollPrev(true);
  }, [api]);

  const onNextArrowClick = useCallback(() => {
    if (!api) return;
    api.scrollNext(true);
  }, [api]);

  return (
    <div
      ref={ref}
      aria-roledescription="carousel-arrow-navigation"
      className={classNames(`${baseClassName}`, className)}
      {...props}
      {...commonProps}
    >
      <button data-testid="prev-arrow" className={`${baseClassName}-prev-btn`} onClick={() => onPrevArrowClick()}>
        <div className={`${baseClassName}-prev-btn__icon`}>
          <CarouselArrowPrev />
        </div>
      </button>
      <button data-testid="next-arrow" className={`${baseClassName}-next-btn`} onClick={() => onNextArrowClick()}>
        <div className={`${baseClassName}-next-btn__icon`}>
          <CarouselArrowNext />
        </div>
      </button>
    </div>
  );
});
CarouselArrows.displayName = 'CarouselArrows';

export default CarouselArrows;
