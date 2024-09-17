import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';

export type CarouselItemProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * Overview of this component
 *
 */
const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Carousel');
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={classNames(`${baseClassName}-item`, className)}
      data-orientation={orientation}
      {...props}
      {...commonProps}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
