import { ComponentProps, forwardRef, useMemo, useState } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import { defaultProgressBarLabels, getProgressBarMetrics, type ProgressBarLabels } from './utils';

function defaultAriaValueText(safeCurrent: number, safeTotal: number): string {
  return `Lot ${safeCurrent} of ${safeTotal}`;
}

export interface ProgressBarProps extends ComponentProps<'div'> {
  /** Which lot the sale is on (display + fill toward this value). */
  currentLot: number;
  /** Total lots in the sale (denominator for display and clamping). */
  totalLots: number;
  /** Politeness of the live region wrapping `safeCurrent/safeTotal` in the track label. */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** Track hover tooltip copy (`hoverLiveLot` uses `{current}` / `{total}` tokens). */
  labels?: Partial<ProgressBarLabels>;
  /** Accessible name for the track (`role="progressbar"`). */
  progressAriaLabel?: string;
  /** Screen reader summary of progress; receives clamped current/total (defaults to English “Lot X of Y”). */
  getAriaValueText?: (safeCurrent: number, safeTotal: number) => string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      currentLot,
      totalLots,
      ariaLive = 'polite',
      className,
      labels,
      progressAriaLabel = 'Sale progress',
      getAriaValueText = defaultAriaValueText,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');
    const { safeTotal, safeCurrent, visualPercent } = useMemo(
      () => getProgressBarMetrics(currentLot, totalLots),
      [currentLot, totalLots],
    );

    const progressBarLabels: ProgressBarLabels = { ...defaultProgressBarLabels, ...labels };
    const ariaValueText = getAriaValueText(safeCurrent, safeTotal);
    const [hoverPreview, setHoverPreview] = useState<{ isVisible: boolean; x: number; lot: number }>({
      isVisible: false,
      x: 0,
      lot: safeCurrent,
    });

    const updateHoverPreview = (clientX: number, trackRect: DOMRect) => {
      const clampedX = Math.min(Math.max(clientX - trackRect.left, 0), trackRect.width);
      setHoverPreview({
        isVisible: true,
        x: clampedX,
        lot: safeCurrent,
      });
    };

    const hoverPreviewText = progressBarLabels.hoverLiveLot
      .replace(/\{current\}/g, String(hoverPreview.lot))
      .replace(/\{total\}/g, String(safeTotal));

    return (
      <div {...commonProps} ref={ref} className={classnames(baseClassName, className)}>
        <span
          className={`${baseClassName}__live-region`}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={safeTotal}
          aria-valuenow={safeCurrent}
          aria-valuetext={ariaValueText}
          aria-label={progressAriaLabel}
        />
        <div
          className={`${baseClassName}__track`}
          onMouseEnter={(event) => {
            updateHoverPreview(event.clientX, event.currentTarget.getBoundingClientRect());
          }}
          onMouseMove={(event) => {
            updateHoverPreview(event.clientX, event.currentTarget.getBoundingClientRect());
          }}
          onMouseLeave={() => {
            setHoverPreview((prev) => ({ ...prev, isVisible: false }));
          }}
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
          {hoverPreview.isVisible && (
            <div className={`${baseClassName}__hover-tooltip`} style={{ left: `${hoverPreview.x}px` }} aria-hidden>
              <Text element="span" variant={TextVariants.headingExtraSmall} className={`${baseClassName}__hover-copy`}>
                {hoverPreviewText}
              </Text>
              <span className={`${baseClassName}__hover-tooltip-caret`} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;
