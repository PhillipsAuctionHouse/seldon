import type { PointerEvent as ReactPointerEvent } from 'react';

export type SlideToActivateStatus = 'idle' | 'dragging' | 'pending' | 'snapping';

export const SNAP_MS = 200;

export const DEFAULT_KEYBOARD_HINT = 'Press Space or Enter to activate. Press Escape to cancel.';

export const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

/** True while a new gesture should not start. */
export const isGestureBusy = (status: SlideToActivateStatus) => status === 'pending' || status === 'snapping';

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
