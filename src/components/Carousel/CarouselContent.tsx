import { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';

export type CarouselContentProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * Overview of this component
 *
 */
const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');

  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={`${baseClassName}-content`}>
      <div
        ref={ref}
        className={classNames(`${baseClassName}-content-inner`, className)}
        data-orientation={orientation}
        {...props}
        {...commonProps}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

export default CarouselContent;
