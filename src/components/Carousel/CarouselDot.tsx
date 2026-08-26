import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { getCommonProps } from '../../utils';
import { ComponentProps } from 'react';

export interface CarouselDotProps extends ComponentProps<'button'> {
  /** Whether the dot is selected */
  isSelected: boolean;
  /** Callback function when the dot is clicked */
  onClick: () => void;
  /** Reference to the scrollable container */
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
  /** Index of this dot among its siblings, forwarded to onInViewChange */
  index: number;
  /** Callback function when the dot comes into view within the scrollable container */
  onInViewChange: (index: number, inView: boolean) => void;
  /** Variant of the dot */
  variant?: 'sm' | 'md';
}

export const CarouselDot = ({
  isSelected,
  onClick,
  scrollableContainerRef,
  index,
  onInViewChange,
  variant = 'md',
  ...props
}: CarouselDotProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CarouselDot');
  const { ref } = useInView({
    threshold: 0,
    root: scrollableContainerRef.current,
    onChange(inView) {
      onInViewChange(index, inView);
    },
  });

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={classNames(`${baseClassName}__container`)}
      {...commonProps}
    >
      <span
        className={classNames(`${baseClassName}`, {
          [`${baseClassName}--selected`]: isSelected,
          [`${baseClassName}--${variant}`]: variant,
        })}
      />
    </button>
  );
};
