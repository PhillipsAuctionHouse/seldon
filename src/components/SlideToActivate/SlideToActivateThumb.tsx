import classnames from 'classnames';
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode, Ref } from 'react';
import { Icon } from '../Icon';
import type { SlideToActivateStatus } from './slideToActivateUtils';

interface SlideToActivateThumbProps {
  baseClassName: string;
  thumbRef: Ref<HTMLButtonElement>;
  thumbClassName?: string;
  thumbWidth?: number;
  thumbIcon?: ReactNode;
  thumbHitTolerance: number;
  thumbTranslatePx: number;
  labelText: string;
  isHeld: boolean;
  isPending: boolean;
  isDisabled: boolean;
  isThumbHidden: boolean;
  isInteractive: boolean;
  status: SlideToActivateStatus;
  snapDurationMs: number;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: () => void;
  onPointerCancel?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onBlur?: () => void;
}

const DefaultThumbChevrons = ({ baseClassName }: { baseClassName: string }) => (
  <span className={`${baseClassName}__thumb-chevrons`} aria-hidden>
    <Icon icon="ChevronRight" height={22} width={22} color="currentColor" />
    <Icon icon="ChevronRight" height={22} width={22} color="currentColor" />
  </span>
);

export const SlideToActivateThumb = ({
  baseClassName,
  thumbRef,
  thumbClassName,
  thumbWidth,
  thumbIcon,
  thumbHitTolerance,
  thumbTranslatePx,
  labelText,
  isHeld,
  isPending,
  isDisabled,
  isThumbHidden,
  isInteractive,
  status,
  snapDurationMs,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
}: SlideToActivateThumbProps) => {
  // `null` opts out of the Figma default double-chevron; `undefined` keeps it.
  const resolvedThumbIcon =
    thumbIcon === undefined ? <DefaultThumbChevrons baseClassName={baseClassName} /> : thumbIcon;

  return (
    <button
      ref={thumbRef}
      type="button"
      className={classnames(`${baseClassName}__thumb`, thumbClassName, {
        [`${baseClassName}__thumb--pill`]: thumbWidth !== undefined,
        [`${baseClassName}__thumb--held`]: isHeld,
        [`${baseClassName}__thumb--hidden`]: isThumbHidden,
      })}
      style={
        {
          '--seldon-slide-hit-tolerance': `${thumbHitTolerance}px`,
          width: thumbWidth !== undefined ? `${thumbWidth}px` : undefined,
          transform: `translateY(-50%) translateX(${thumbTranslatePx}px)`,
          transition:
            status === 'snapping' && snapDurationMs > 0
              ? `transform ${snapDurationMs}ms ease-out, opacity 100ms ease-out`
              : 'opacity 100ms ease-out',
        } as CSSProperties
      }
      aria-label={labelText}
      aria-busy={isPending ? true : undefined}
      aria-disabled={isDisabled || isPending ? true : undefined}
      aria-hidden={isThumbHidden ? true : undefined}
      disabled={isDisabled}
      tabIndex={isThumbHidden ? -1 : undefined}
      onPointerDown={isInteractive ? onPointerDown : undefined}
      onPointerUp={isInteractive ? onPointerUp : undefined}
      onPointerCancel={isInteractive ? onPointerCancel : undefined}
      onKeyDown={isInteractive ? onKeyDown : undefined}
      onKeyUp={isInteractive ? onKeyUp : undefined}
      onBlur={isInteractive ? onBlur : undefined}
    >
      <span className={`${baseClassName}__thumb-face`} aria-hidden={resolvedThumbIcon ? true : undefined}>
        {resolvedThumbIcon ? (
          <span
            className={classnames(`${baseClassName}__thumb-icon`, {
              [`${baseClassName}__thumb-icon--held`]: isHeld,
            })}
          >
            {resolvedThumbIcon}
          </span>
        ) : null}
      </span>
    </button>
  );
};
