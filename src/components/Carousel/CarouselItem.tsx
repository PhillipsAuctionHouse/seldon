import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { useCarousel } from './utils';

export type CarouselItemProps = ComponentProps<'div'>;

/**
 * ## Overview
 *
 * An individual item within the carousel.
 * It will stretch to fill the width of the carousel viewport.
 *
 */
const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselItem');
  const { columnGap } = useCarousel();

  return (
    <div
      ref={ref}
      role={props.onClick ? 'button' : 'group'}
      aria-roledescription="slide"
      className={classNames(`${baseClassName}`, className, {
        [`${baseClassName}--gap-${columnGap}`]: !!columnGap,
        [`${baseClassName}--cursor-pointer`]: !!props.onClick,
      })}
      {...props}
      {...commonProps}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
