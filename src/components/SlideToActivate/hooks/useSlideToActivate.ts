import { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import type { SlideToActivateStatus } from '../slideToActivateUtils';
import {
  initialSlideToActivateState,
  slideToActivateReducer,
  type SlideToActivateAction,
} from '../slideToActivateReducer';
import { measureMaxTravel, SNAP_MS } from '../slideToActivateUtils';
import { SlideToActivateDirections } from '../types';
import { useSlideDragHandlers } from './useSlideDragHandlers';
import { useSlideKeyboardActivate } from './useSlideKeyboardActivate';

export type { SlideToActivateStatus } from '../slideToActivateUtils';
export { SNAP_MS } from '../slideToActivateUtils';

export interface UseSlideToActivateOptions {
  direction: SlideToActivateDirections | `${SlideToActivateDirections}`;
  isDisabled: boolean;
  reduceMotion: boolean;
  pendingAnnouncement: string;
  successAnnouncement: string;
  errorAnnouncement: string;
  resetOnError: boolean;
  onActivation?: () => void | Promise<void>;
  onError?: (error: unknown) => void;
  onProgress?: (progress: number) => void;
  onStatusChange?: (status: SlideToActivateStatus) => void;
}

export const useSlideToActivate = ({
  direction,
  isDisabled,
  reduceMotion,
  pendingAnnouncement,
  successAnnouncement,
  errorAnnouncement,
  resetOnError,
  onActivation,
  onError,
  onProgress,
  onStatusChange,
}: UseSlideToActivateOptions) => {
  const [state, reactDispatch] = useReducer(slideToActivateReducer, initialSlideToActivateState);
  const stateRef = useRef(state);
  // Updated synchronously (not via a useEffect) so pointer/keyboard handlers that close over
  // stateRef always see the value from the most recent dispatch rather than the last commit.
  const dispatch = useCallback((action: SlideToActivateAction) => {
    stateRef.current = slideToActivateReducer(stateRef.current, action);
    reactDispatch(action);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const measureTravel = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) {
      return;
    }
    dispatch({ type: 'measured', maxTravel: measureMaxTravel({ track, thumb, direction }) });
  }, [direction, dispatch]);

  useLayoutEffect(() => {
    measureTravel();
  }, [measureTravel]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => measureTravel());
    observer.observe(track);
    return () => observer.disconnect();
  }, [measureTravel]);

  const emitProgress = useCallback(
    (nextProgress: number) => {
      dispatch({ type: 'progressChanged', progress: nextProgress });
      onProgress?.(nextProgress);
    },
    [dispatch, onProgress],
  );

  const clearSnapTimeout = useCallback(() => {
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearSnapTimeout();
    };
  }, [clearSnapTimeout]);

  const snapToIdle = useCallback(() => {
    clearSnapTimeout();
    emitProgress(0);
    dispatch({ type: 'snapStarted', immediate: reduceMotion });
    if (reduceMotion) {
      return;
    }
    snapTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }
      dispatch({ type: 'snapCompleted' });
      snapTimeoutRef.current = null;
    }, SNAP_MS);
  }, [clearSnapTimeout, dispatch, emitProgress, reduceMotion]);

  const runActivation = useCallback(async () => {
    if (stateRef.current.status === 'pending') {
      return;
    }
    emitProgress(1);
    dispatch({ type: 'activationStarted', announcement: pendingAnnouncement });
    try {
      await onActivation?.();
      if (!isMountedRef.current) {
        return;
      }
      clearSnapTimeout();
      dispatch({ type: 'activationSucceeded', announcement: successAnnouncement });
    } catch (error: unknown) {
      if (!isMountedRef.current) {
        return;
      }
      if (onError) {
        onError(error);
      } else {
        console.error(error);
      }
      if (resetOnError) {
        dispatch({ type: 'activationFailed', announcement: errorAnnouncement });
        snapToIdle();
      } else {
        // Keep progress=1 (thumb latched); consumer owns the reset via isDisabled or remount.
        dispatch({ type: 'activationFailedHeld', announcement: errorAnnouncement });
      }
    }
  }, [
    clearSnapTimeout,
    dispatch,
    emitProgress,
    errorAnnouncement,
    onActivation,
    onError,
    pendingAnnouncement,
    resetOnError,
    snapToIdle,
    successAnnouncement,
  ]);

  const wasDisabledRef = useRef(isDisabled);
  useEffect(() => {
    if (wasDisabledRef.current && !isDisabled) {
      clearSnapTimeout();
      dispatch({ type: 'reset' });
      onProgress?.(0);
    }
    wasDisabledRef.current = isDisabled;
  }, [clearSnapTimeout, dispatch, isDisabled, onProgress]);

  const hasEmittedStatusRef = useRef(false);
  useEffect(() => {
    if (!hasEmittedStatusRef.current) {
      hasEmittedStatusRef.current = true;
      return;
    }
    onStatusChange?.(state.status);
  }, [state.status, onStatusChange]);

  const { handleKeyDown, handleKeyUp, handleBlur, cancelKeyboardGesture } = useSlideKeyboardActivate({
    isDisabled,
    stateRef,
    runActivation,
  });

  const { handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel } = useSlideDragHandlers({
    direction,
    isDisabled,
    stateRef,
    measureTravel: () => {
      cancelKeyboardGesture();
      measureTravel();
    },
    dispatch,
    emitProgress,
    runActivation,
    snapToIdle,
  });

  return {
    progress: state.progress,
    status: state.status,
    announcement: state.announcement,
    trackRef,
    thumbRef,
    thumbTranslatePx: state.progress * state.maxTravel * (direction === SlideToActivateDirections.rtl ? -1 : 1),
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleKeyDown,
    handleKeyUp,
    handleBlur,
    snapDurationMs: reduceMotion ? 0 : SNAP_MS,
  };
};
