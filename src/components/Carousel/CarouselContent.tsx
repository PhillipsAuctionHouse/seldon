import { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';
import { useCarousel } from './utils';
import { getCommonProps } from '../../utils';

export interface CarouselContentProps extends ComponentProps<'div'> {
  /**
   * The className for the carousel content container.
   */
  containerClassName?: string;
  /**
   * The styles for the carousel content container.
   */
  containerStyles?: React.CSSProperties;
}

/**
 * ## Overview
 *
 * The wrapper for the carousel content.
 *
 */
const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, containerClassName, containerStyles, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselContent');

    const { carouselRef, columnGap } = useCarousel();

    return (
      <div ref={carouselRef} className={classNames(`${baseClassName}`, containerClassName)} style={containerStyles}>
        <div
          ref={ref}
          className={classNames(`${baseClassName}-inner`, className, {
            [`${baseClassName}-inner--gap-${columnGap}`]: !!columnGap,
          })}
          {...props}
          {...commonProps}
        />
      </div>
    );
  },
);
CarouselContent.displayName = 'CarouselContent';

export default CarouselContent;
