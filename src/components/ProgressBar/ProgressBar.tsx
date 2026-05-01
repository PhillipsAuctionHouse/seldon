import { ComponentProps, forwardRef, useMemo } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import * as Popover from '@radix-ui/react-popover';
import type { ProgressBarLotObject } from './types';
import ProgressBarCard from './ProgressBarCard';
export interface ProgressBarProps extends ComponentProps<'div'> {
  currentLot: number;
  totalLots: number;
  ariaLive?: 'polite' | 'assertive' | 'off';
  lotObjects?: ProgressBarLotObject[];
}

function getVisualWidthPercent(rawLot: number, rawTotal: number): number {
  const safeTotal = Math.max(Math.round(rawTotal), 1);
  const safeCurrent = Math.min(Math.max(Math.round(rawLot), 1), safeTotal);

  const minVisiblePercent = safeTotal < 199 ? 3 : 5;
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

function formatLotsAwayText(currentLot: number, markerLot: number): string {
  const delta = Math.round(markerLot) - Math.round(currentLot);
  if (delta <= 0) {
    return 'In Progress';
  }
  if (delta === 1) {
    return '1 lot away';
  }
  return `${delta} lots away`;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ currentLot, totalLots, ariaLive = 'polite', lotObjects = [], className, ...props }, ref) => {
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

          <div className={`${baseClassName}__lot-object`}>
            {lotObjects.map((lotObject, index) => {
              const clampedLot = Math.min(Math.max(Math.round(lotObject.lotNumber), 1), safeTotal);
              if (safeCurrent > clampedLot) {
                return null;
              }
              const leftPercent = getVisualWidthPercent(clampedLot, totalLots);
              const isDiamond = Boolean(lotObject.advBid?.trim());

              return (
                <Popover.Root key={`${lotObject.lotNumber}-${index}`}>
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className={classnames(`${baseClassName}__lot-object-trigger`, {
                        [`${baseClassName}__lot-object-trigger--diamond`]: isDiamond,
                        [`${baseClassName}__lot-object-trigger--current`]: safeCurrent === clampedLot,
                      })}
                      style={{ left: `${leftPercent}%` }}
                      aria-label={`Lot ${clampedLot}, ${lotObject.lotTitle}`}
                    >
                      <span
                        className={classnames(`${baseClassName}__lot-object-shape`, {
                          [`${baseClassName}__lot-object-shape--diamond`]: isDiamond,
                          [`${baseClassName}__lot-object-shape--dot`]: !isDiamond,
                        })}
                        aria-hidden
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                  <Popover.Content
                      className={`${baseClassName}__lot-object-popover`}
                      side="top"
                      sideOffset={8}
                      align="center"
                      collisionPadding={12}
                    >
                      <div className={`${baseClassName}__lot-object-popover-inner`}>
                        <ProgressBarCard
                          imageSrc={lotObject.imageSrc}
                          imageAlt={lotObject.imageAlt}
                          lotNumber={clampedLot}
                          artistName={lotObject.lotArtist}
                          artworkTitle={lotObject.lotTitle}
                          estimateRange={lotObject.estimate}
                          advanceBidAmount={lotObject.advBid?.trim() || undefined}
                          statusText={safeCurrent === clampedLot ? 'Current Lot' : 'Upcoming'}
                          lotsAwayText={
                            lotObject.advBid?.trim() && safeCurrent === clampedLot
                              ? 'In progress'
                              : formatLotsAwayText(safeCurrent, clampedLot)
                          }
                          isCurrentLot={safeCurrent === clampedLot}
                        />
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
