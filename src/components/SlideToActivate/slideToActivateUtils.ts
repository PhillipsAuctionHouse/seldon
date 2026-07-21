import type { PointerEvent as ReactPointerEvent } from 'react';

export type SlideToActivateStatus = 'idle' | 'dragging' | 'pending' | 'snapping';

export const SNAP_MS = 200;
/** Hold Enter/Space: ease to full travel; activation still waits for keyup. */
export const KEYBOARD_CHARGE_TARGET = 1;
export const KEYBOARD_CHARGE_MS = 900;
/** Keyup before full charge: burst remaining travel, then activate. */
export const KEYBOARD_FINISH_MS = 100;

export const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

/** True while a gesture shouldn't start a new drag/keyboard charge. */
export const isGestureBusy = (status: SlideToActivateStatus) => status === 'pending' || status === 'snapping';

export const linear = (t: number) => t;
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export const measureMaxTravel = ({
  track,
  thumb,
  direction,
}: {
  track: HTMLElement;
  thumb: HTMLElement;
  direction: 'ltr' | 'rtl';
}) => {
  const trackRect = track.getBoundingClientRect();
  const thumbRect = thumb.getBoundingClientRect();
  // Prefer live layout boxes over computed `left`/`right` (more reliable when width changes).
  const inset =
    direction === 'rtl' ? Math.max(0, trackRect.right - thumbRect.right) : Math.max(0, thumbRect.left - trackRect.left);
  return Math.max(0, trackRect.width - thumbRect.width - inset * 2);
};

/** Clicking the track (outside the thumb) focuses the thumb instead of leaving focus stuck on nothing. */
export const focusThumbFromTrack = ({
  event,
  thumb,
  isInteractive,
  isThumbHidden,
}: {
  event: ReactPointerEvent<HTMLDivElement>;
  thumb: HTMLButtonElement | null;
  isInteractive: boolean;
  isThumbHidden: boolean;
}) => {
  if (!isInteractive || isThumbHidden || !thumb || thumb.contains(event.target as Node)) {
    return;
  }
  event.preventDefault();
  thumb.focus();
};
