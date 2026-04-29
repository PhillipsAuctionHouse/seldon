import { ComponentProps, forwardRef, useMemo } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';

export interface ProgressBarProps extends ComponentProps<'div'> {
  currentLot: number;
  totalLots: number;
  ariaLive?: 'polite' | 'assertive' | 'off';
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      currentLot,
      totalLots,
      ariaLive = 'polite',
      className,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');

    const { safeTotal, safeCurrent, visualPercent } = useMemo(() => {
        const safeTotal = Math.max(totalLots, 1);
        const safeCurrent = Math.min(Math.max(currentLot, 0), safeTotal);
        const percent = Math.round((safeCurrent / safeTotal) * 100);
      
        const minVisiblePercent = 10;
        const visualPercent = safeCurrent > 0
          ? Math.min(100, Math.max(percent, minVisiblePercent))
          : 0;
      
        return { safeTotal, safeCurrent, percent, visualPercent };
      }, [currentLot, totalLots]);

    return (
      <div
        {...commonProps}
        ref={ref}
        className={classnames(baseClassName, className)}
      >
        <div
          className={`${baseClassName}__track`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={safeTotal}
          aria-valuenow={safeCurrent}
          aria-valuetext={`Lot ${safeCurrent} of ${safeTotal}`}
          aria-label="Sale progress"
        >
        <div className={`${baseClassName}__fill`} style={{ width: `${visualPercent}%` }} />
          <div className={`${baseClassName}__label`}>
          <Text
            element="span"
            variant={TextVariants.labelMedium}
            className={`${baseClassName}__label-text`}
            >
            {`Lot ${safeCurrent}/${safeTotal}`}
            </Text>
          </div>
        </div>

      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;