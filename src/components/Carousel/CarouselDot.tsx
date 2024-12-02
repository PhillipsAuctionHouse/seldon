import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  baseClassName: string;
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
  onInViewChange: (inView: boolean) => void;
  variant?: 'sm' | 'md';
};

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
      className={classNames(`${baseClassName}-pagination-dot-container`)}
    >
      <span
        className={classNames(`${baseClassName}-pagination-dot`, {
          [`${baseClassName}-pagination-dot-selected`]: isSelected,
          [`${baseClassName}-pagination-dot-${variant}`]: variant,
        })}
      />
    </button>
  );
};
