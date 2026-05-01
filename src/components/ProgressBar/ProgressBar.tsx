import { ComponentProps, forwardRef, useMemo } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import * as Popover from '@radix-ui/react-popover';
import type { ProgressBarLotMarker } from './types';

export interface ProgressBarProps extends ComponentProps<'div'> {
  currentLot: number;
  totalLots: number;
  ariaLive?: 'polite' | 'assertive' | 'off';
  lotMarkers?: ProgressBarLotMarker[];
}
function getVisualWidthPercent(rawLot: number, rawTotal: number): number {
  const safeTotal = Math.max(Math.round(rawTotal), 1);
  const safeCurrent = Math.min(Math.max(Math.round(rawLot), 1), safeTotal);

  const minVisiblePercent = safeTotal < 1000 ? 3 : 5;
  const trueProgression = safeCurrent / safeTotal;

  if (safeCurrent <= 0) {
    return 0;
  }
  if (trueProgression >= 0.5) {
    return 100 * trueProgression;
  }
  return (
    (1 - 2 * trueProgression) ** 2 * (minVisiblePercent + (100 - minVisiblePercent) * trueProgression) +
    (1 - (1 - 2 * trueProgression) ** 2) * (100 * trueProgression)
  );
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ currentLot, totalLots, ariaLive = 'polite', lotMarkers = [], className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');

    const { safeTotal, safeCurrent, visualPercent } = useMemo(() => {
      const safeTotal = Math.max(Math.round(totalLots), 1);
      const safeCurrent = Math.min(Math.max(Math.round(currentLot), 1), safeTotal);
      const visualPercent = getVisualWidthPercent(currentLot, totalLots);

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

          <div className={`${baseClassName}__markers`}>
            {lotMarkers.map((marker, index) => {

              const clampedLot = Math.min(Math.max(Math.round(marker.lotNumber), 1), safeTotal);
              if (safeCurrent > clampedLot) {
                return null;
              }
              const leftPercent = getVisualWidthPercent(clampedLot, totalLots);
              const isDiamond = Boolean(marker.advBid?.trim());

              return (
                <Popover.Root key={`${marker.lotNumber}-${index}`}>
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className={classnames(`${baseClassName}__marker-trigger`, {
                        [`${baseClassName}__marker-trigger--diamond`]: isDiamond,
                      })}
                      style={{ left: `${leftPercent}%` }}
                      aria-label={`Lot ${clampedLot}, ${marker.lotTitle}`}
                    >
                      <span
                        className={classnames(`${baseClassName}__marker-shape`, {
                          [`${baseClassName}__marker-shape--diamond`]: isDiamond,
                          [`${baseClassName}__marker-shape--dot`]: !isDiamond,
                        })}
                        aria-hidden
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className={`${baseClassName}__marker-popover`}
                      side="top"
                      sideOffset={8}
                      align="center"
                      collisionPadding={12}
                    >
                      <div className={`${baseClassName}__marker-popover-inner`}>
                        <Text variant={TextVariants.labelMedium}>{`Lot ${clampedLot}`}</Text>
                        <Text variant={TextVariants.bodySmall}>{marker.lotArtist}</Text>
                        <Text variant={TextVariants.bodySmall}>{marker.lotTitle}</Text>
                        <Text variant={TextVariants.bodySmall}>{marker.estimate}</Text>
                        {marker.advBid ? (
                          <Text variant={TextVariants.bodySmall}>{`Advance bid ${marker.advBid}`}</Text>
                        ) : (
                          <Text variant={TextVariants.bodySmall}>Upcoming</Text>
                        )}
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;