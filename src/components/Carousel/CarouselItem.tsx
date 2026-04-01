import classNames from 'classnames';
import { forwardRef } from 'react';
import React from 'react';
import { getCommonProps } from '../../utils';
import { useCarousel } from './utils';

export interface CarouselItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional element to render as the top-level component e.g. 'div', 'li', CustomComponent, etc. Defaults to 'div'.
   */
  element?: React.ElementType;
}

/**
 * ## Overview
 *
 * An individual item within the carousel.
 * It will stretch to fill the width of the carousel viewport.
 *
 */
const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ element: CustomElement, className, ...props }, ref) => {
    const Component = CustomElement || 'div';
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselItem');
    const { columnGap } = useCarousel();

    return (
      <Component
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
  },
);
CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
