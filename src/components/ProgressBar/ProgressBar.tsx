import { ComponentProps, forwardRef, useMemo } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import * as Popover from '@radix-ui/react-popover';
import type { ProgressBarLotObject } from './types';
import ProgressBarCard from './ProgressBarCard';
import {
  defaultProgressBarLabels,
  formatLotsAwayText,
  getClampedLotNumber,
  getProgressBarMetrics,
  getVisualWidthPercent,
  type ProgressBarLabels,
  type ProgressBarLotsAwayMessages,
} from './utils';

function defaultAriaValueText(safeCurrent: number, safeTotal: number): string {
  return `Lot ${safeCurrent} of ${safeTotal}`;
}

function defaultLotMarkerAriaLabel(lotNumber: number, artworkTitle: string): string {
  return `Lot ${lotNumber}, ${artworkTitle}`;
}

export interface ProgressBarProps extends ComponentProps<'div'> {
  /** Which lot the sale is on (display + markers fill toward this value). */
  currentLot: number;
  /** Total lots in the sale (denominator for display and clamping). */
  totalLots: number;
  /** Politeness of the live region wrapping `safeCurrent/safeTotal` in the track label. */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** Lots shown as markers/popovers; clamped to `[1, safeTotal]`. */
  lotObjects?: ProgressBarLotObject[];

  /** Copy for “lots away” strings (`formatLotsAwayText`); */
  lotsAwayMessages?: Partial<ProgressBarLotsAwayMessages>;
  /** Popover status labels (`statusCurrentLot`, `statusUpcoming`, `lotsAwayAdvanceBidCurrent`). */
  labels?: Partial<ProgressBarLabels>;
  /** Accessible name for the track (`role="progressbar"`). */
  progressAriaLabel?: string;
  /** Screen reader summary of progress; receives clamped current/total (defaults to English “Lot X of Y”). */
  getAriaValueText?: (safeCurrent: number, safeTotal: number) => string;
  /** `aria-label` for each lot-marker trigger (lot number + artwork title by default). */
  getLotMarkerAriaLabel?: (lotNumber: number, artworkTitle: string) => string;
  /** Label before the advance-bid amount in the popover card (card falls back if omitted or blank). */
  advanceBidLabel?: string;
  /** Label before the estimate range in the popover card (defaults to `'Estimate'`). */
  estimateLabel?: string;
  /** Accessible name for the popover card menu icon (kebab), when present. */
  menuAriaLabel?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      currentLot,
      totalLots,
      ariaLive = 'polite',
      lotObjects = [],
      className,
      lotsAwayMessages,
      labels,
      progressAriaLabel = 'Sale progress',
      getAriaValueText = defaultAriaValueText,
      getLotMarkerAriaLabel = defaultLotMarkerAriaLabel,
      advanceBidLabel,
      estimateLabel,
      menuAriaLabel,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');
    const { safeTotal, safeCurrent, visualPercent } = useMemo(
      () => getProgressBarMetrics(currentLot, totalLots),
      [currentLot, totalLots],
    );

    const progressBarCardLabels: ProgressBarLabels = { ...defaultProgressBarLabels, ...labels };

    const visibleLotMarkerCount = useMemo(
      () =>
        lotObjects.reduce((count, lotObject) => {
          const clampedLot = getClampedLotNumber(lotObject.lotNumber, safeTotal);
          return safeCurrent > clampedLot ? count : count + 1;
        }, 0),
      [lotObjects, safeCurrent, safeTotal],
    );

    const ariaValueText = getAriaValueText(safeCurrent, safeTotal);

    return (
      <div {...commonProps} ref={ref} className={classnames(baseClassName, className)}>
        <div
          className={classnames(`${baseClassName}__track`, {
            [`${baseClassName}__track--with-lot-objects`]: visibleLotMarkerCount > 0,
          })}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={safeTotal}
          aria-valuenow={safeCurrent}
          aria-valuetext={ariaValueText}
          aria-label={progressAriaLabel}
        >
          <div className={`${baseClassName}__fill`} style={{ width: `${visualPercent}%` }}>
            <div className={`${baseClassName}__label`}>
              <Text
                element="span"
                variant={TextVariants.labelLarge}
                className={`${baseClassName}__label-text`}
                aria-live={ariaLive}
              >
                {`${safeCurrent}/${safeTotal}`}
              </Text>
            </div>
          </div>

          <div className={`${baseClassName}__lot-object`}>
            {lotObjects.map((lotObject, index) => {
              const clampedLot = getClampedLotNumber(lotObject.lotNumber, safeTotal);
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
                      aria-label={getLotMarkerAriaLabel(clampedLot, lotObject.lotTitle)}
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
                          statusText={
                            safeCurrent === clampedLot
                              ? progressBarCardLabels.statusCurrentLot
                              : progressBarCardLabels.statusUpcoming
                          }
                          lotsAwayText={
                            lotObject.advBid?.trim() && safeCurrent === clampedLot
                              ? progressBarCardLabels.lotsAwayAdvanceBidCurrent
                              : formatLotsAwayText(safeCurrent, clampedLot, lotsAwayMessages)
                          }
                          isCurrentLot={safeCurrent === clampedLot}
                          advanceBidLabel={advanceBidLabel}
                          estimateLabel={estimateLabel}
                          menuAriaLabel={menuAriaLabel}
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
