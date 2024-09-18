import { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';

export type CarouselContentProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * The wrapper for the carousel content.
 *
 */
const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');

  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className={`${baseClassName}-content`}>
      <div ref={ref} className={classNames(`${baseClassName}-content-inner`, className)} {...props} {...commonProps} />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

export default CarouselContent;
