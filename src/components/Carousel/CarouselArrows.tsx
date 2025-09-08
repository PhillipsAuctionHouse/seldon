import classNames from 'classnames';
import { ComponentProps, forwardRef, useCallback } from 'react';
import { getCommonProps } from '../../utils';
import { useCarousel } from './utils';
import { Icon } from '../Icon';

export type CarouselArrowsProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * Arrow navigation for the carousel.
 *
 */
const CarouselArrows = forwardRef<HTMLDivElement, CarouselArrowsProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselArrows');
  const { api } = useCarousel();
  const onPrevArrowClick = useCallback(() => {
    if (!api) return;
    if (api?.slidesInView().length <= 1) {
      api.scrollPrev(true);
    } else {
      const slidesInView = api?.slidesInView();
      api?.scrollTo(slidesInView[0] - (slidesInView.length ?? 1));
    }
  }, [api]);

  const onNextArrowClick = useCallback(() => {
    if (!api) return;

    if (api?.slidesInView().length <= 1) {
      api?.scrollNext(true);
    } else {
      const slidesInView = api?.slidesInView();
      const lastSlideInView = slidesInView.slice(-1)[0] + 1;
      api?.scrollTo(lastSlideInView);
    }
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
          <Icon icon="ChevronLeft" height="2rem" />
        </div>
      </button>
      <button data-testid="next-arrow" className={`${baseClassName}-next-btn`} onClick={() => onNextArrowClick()}>
        <div className={`${baseClassName}-next-btn__icon`}>
          <Icon icon="ChevronRight" height="2rem" />
        </div>
      </button>
    </div>
  );
});
CarouselArrows.displayName = 'CarouselArrows';

export default CarouselArrows;
