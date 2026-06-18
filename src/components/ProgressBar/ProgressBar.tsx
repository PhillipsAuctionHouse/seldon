import { ComponentProps, forwardRef, ReactNode, useMemo, useState } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import { getProgressBarMetrics } from './utils';

function defaultAriaValueText(safeCurrent: number, safeTotal: number): string {
  return `${safeCurrent} of ${safeTotal}`;
}

export interface ProgressBarProps extends ComponentProps<'div'> {
  /** Current step (display + fill toward this value). */
  current: number;
  /** Total steps (denominator for display and clamping). */
  total: number;
  /** Politeness of the live region wrapping `safeCurrent/safeTotal` in the track label. */
  ariaLive?: 'polite' | 'assertive' | 'off';
  /** Optional track hover tooltip content (app-specific copy, e.g. from Remix). */
  tooltipContent?: ReactNode;
  /** Accessible name for the progressbar live region. */
  progressAriaLabel?: string;
  /** Screen reader summary of progress; receives clamped current/total. */
  getAriaValueText?: (safeCurrent: number, safeTotal: number) => string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      current,
      total,
      ariaLive = 'polite',
      className,
      tooltipContent,
      progressAriaLabel = 'Progress',
      getAriaValueText = defaultAriaValueText,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressBar');
    const { safeTotal, safeCurrent, visualPercent } = useMemo(
      () => getProgressBarMetrics(current, total),
      [current, total],
    );

    const ariaValueText = getAriaValueText(safeCurrent, safeTotal);
    const [hoverPreview, setHoverPreview] = useState<{ isVisible: boolean; x: number }>({
      isVisible: false,
      x: 0,
    });

    const updateHoverPreview = (clientX: number, trackRect: DOMRect) => {
      const clampedX = Math.min(Math.max(clientX - trackRect.left, 0), trackRect.width);
      setHoverPreview({
        isVisible: true,
        x: clampedX,
      });
    };

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
          onMouseEnter={
            tooltipContent
              ? (event) => updateHoverPreview(event.clientX, event.currentTarget.getBoundingClientRect())
              : undefined
          }
          onMouseMove={
            tooltipContent
              ? (event) => updateHoverPreview(event.clientX, event.currentTarget.getBoundingClientRect())
              : undefined
          }
          onMouseLeave={tooltipContent ? () => setHoverPreview((prev) => ({ ...prev, isVisible: false })) : undefined}
        >
          <div className={`${baseClassName}__fill`} style={{ width: `${visualPercent}%` }}>
            <div className={`${baseClassName}__label`}>
              <Text element="span" variant={TextVariants.stringSmall} aria-live={ariaLive}>
                {`${safeCurrent}/${safeTotal}`}
              </Text>
            </div>
          </div>
          {tooltipContent && hoverPreview.isVisible && (
            <div className={`${baseClassName}__hover-tooltip`} style={{ left: `${hoverPreview.x}px` }} aria-hidden>
              {tooltipContent}
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
