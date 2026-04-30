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
  ({ currentLot, totalLots, ariaLive = 'polite', className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');

    const { safeTotal, safeCurrent, visualPercent } = useMemo(() => {
      const safeTotal = Math.max(Math.round(totalLots), 1);
      const safeCurrent = Math.min(Math.max(Math.round(currentLot), 1), safeTotal);

      const minVisiblePercent = safeTotal < 1000 ? 4 : 5;
      const trueProgression = safeCurrent / safeTotal;

      let visualPercent: number;
      if (safeCurrent <= 0) {
        visualPercent = 0;
      } else if (trueProgression >= 0.5) {
        // honest progression
        visualPercent = 100 * trueProgression;
      } else {
        // tapered blend of boosted progression + honest progression (easing slider to prevent jumpiness)
        visualPercent =
          (1 - 2 * trueProgression) ** 2 * (minVisiblePercent + (100 - minVisiblePercent) * trueProgression) +
          (1 - (1 - 2 * trueProgression) ** 2) * (100 * trueProgression);
      }

      return { safeTotal, safeCurrent, visualPercent };
    }, [currentLot, totalLots]);

    return (
      <div {...commonProps} ref={ref} className={classnames(baseClassName, className)}>
        <div
          className={`${baseClassName}__track`}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={safeTotal}
          aria-valuenow={safeCurrent}
          aria-valuetext={`Lot ${safeCurrent} of ${safeTotal}`}
          aria-label="Sale progress"
        >
          <div className={`${baseClassName}__fill`} style={{ width: `${visualPercent}%` }}>
            <div className={`${baseClassName}__label`}>
              <Text
                element="span"
                variant={TextVariants.labelMedium}
                className={`${baseClassName}__label-text`}
                aria-live={ariaLive}
              >
                {`${safeCurrent}/${safeTotal}`}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;
