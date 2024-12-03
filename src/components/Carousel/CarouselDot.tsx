import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

interface Props {
  /** Whether the dot is selected */
  isSelected: boolean;
  /** Callback function when the dot is clicked */
  onClick: () => void;
  /** Base class name for styling */
  baseClassName: string;
  /** Reference to the scrollable container */
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
  /** Callback function when the dot comes into view within the scrollable container */
  onInViewChange: (inView: boolean) => void;
  /** Variant of the dot */
  variant?: 'sm' | 'md';
}

export const CarouselDot = ({
  isSelected,
  onClick,
  baseClassName,
  scrollableContainerRef,
  onInViewChange,
  variant = 'md',
}: Props) => {
  const { ref } = useInView({
    threshold: 0,
    root: scrollableContainerRef.current,
    onChange(inView) {
      onInViewChange(inView);
    },
  });

  return (
    <button
      ref={ref}
      role="button"
      onClick={onClick}
      className={classNames(`${baseClassName}-pagination-dot__container`)}
    >
      <span
        className={classNames(`${baseClassName}-pagination-dot`, {
          [`${baseClassName}-pagination-dot--selected`]: isSelected,
          [`${baseClassName}-pagination-dot--${variant}`]: variant,
        })}
      />
    </button>
  );
};
