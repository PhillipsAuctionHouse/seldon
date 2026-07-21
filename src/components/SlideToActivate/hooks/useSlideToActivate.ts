import { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import {
  initialSlideToActivateState,
  slideToActivateReducer,
  type SlideToActivateAction,
} from '../slideToActivateReducer';
import { measureMaxTravel, SNAP_MS } from '../slideToActivateUtils';
import { useSlideDragHandlers } from './useSlideDragHandlers';
import { useSlideKeyboardCharge } from './useSlideKeyboardCharge';

export type { SlideToActivateStatus } from '../slideToActivateUtils';
export { SNAP_MS } from '../slideToActivateUtils';

export interface UseSlideToActivateOptions {
  requiredProgress: number;
  deadZone: number;
  sensitivity: number;
  direction: 'ltr' | 'rtl';
  isDisabled: boolean;
  reduceMotion: boolean;
  pendingAnnouncement: string;
  successAnnouncement: string;
  errorAnnouncement: string;
  onActivation?: () => void | Promise<void>;
  onError?: (error: unknown) => void;
  onProgress?: (progress: number) => void;
}

export const useSlideToActivate = ({
  requiredProgress,
  deadZone,
  sensitivity,
  direction,
  isDisabled,
  reduceMotion,
  pendingAnnouncement,
  successAnnouncement,
  errorAnnouncement,
  onActivation,
  onError,
  onProgress,
}: UseSlideToActivateOptions) => {
  const [state, reactDispatch] = useReducer(slideToActivateReducer, initialSlideToActivateState);
  const stateRef = useRef(state);
  // Updated synchronously (not via a useEffect) so native document-level pointer listeners and
  // requestAnimationFrame callbacks — which close over stale state otherwise — always see the
  // value from the most recent dispatch rather than the last committed render.
  const dispatch = useCallback((action: SlideToActivateAction) => {
    stateRef.current = slideToActivateReducer(stateRef.current, action);
    reactDispatch(action);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const snapToIdle = useCallback(() => {
    clearSnapTimeout();
    emitProgress(0);
    dispatch({ type: 'snapStarted', immediate: reduceMotion });
    if (reduceMotion) {
      return;
    }
    snapTimeoutRef.current = setTimeout(() => {
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
      clearSnapTimeout();
      dispatch({ type: 'activationSucceeded', announcement: successAnnouncement });
    } catch (error: unknown) {
      if (onError) {
        onError(error);
      } else {
        console.error(error);
      }
      dispatch({ type: 'activationFailed', announcement: errorAnnouncement });
      snapToIdle();
    }
  }, [
    clearSnapTimeout,
    dispatch,
    emitProgress,
    errorAnnouncement,
    onActivation,
    onError,
    pendingAnnouncement,
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

  const { handleKeyDown, handleKeyUp, handleBlur, cancelKeyboardGesture } = useSlideKeyboardCharge({
    isDisabled,
    reduceMotion,
    stateRef,
    dispatch,
    emitProgress,
    runActivation,
    snapToIdle,
  });

  const { handlePointerDown, handlePointerUp, handlePointerCancel } = useSlideDragHandlers({
    requiredProgress,
    deadZone,
    sensitivity,
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

  useEffect(
    () => () => {
      clearSnapTimeout();
    },
    [clearSnapTimeout],
  );

  return {
    progress: state.progress,
    status: state.status,
    announcement: state.announcement,
    trackRef,
    thumbRef,
    thumbTranslatePx: state.progress * state.maxTravel * (direction === 'rtl' ? -1 : 1),
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleKeyDown,
    handleKeyUp,
    handleBlur,
    snapDurationMs: reduceMotion ? 0 : SNAP_MS,
  };
};
