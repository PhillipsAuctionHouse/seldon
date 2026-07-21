import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { measureMaxTravel, SNAP_MS, type SlideToActivateStatus } from '../slideToActivateUtils';
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
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<SlideToActivateStatus>('idle');
  const [announcement, setAnnouncement] = useState('');
  const [maxTravel, setMaxTravel] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef(status);
  const progressRef = useRef(progress);
  const maxTravelRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateStatus = useCallback((next: SlideToActivateStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const measureTravel = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) {
      return;
    }
    const nextTravel = measureMaxTravel({ track, thumb, direction });
    maxTravelRef.current = nextTravel;
    setMaxTravel(nextTravel);
  }, [direction]);

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
      setProgress(nextProgress);
      progressRef.current = nextProgress;
      onProgress?.(nextProgress);
    },
    [onProgress],
  );

  const clearSnapTimeout = useCallback(() => {
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = null;
    }
  }, []);

  const snapToIdle = useCallback(() => {
    clearSnapTimeout();
    if (reduceMotion) {
      emitProgress(0);
      updateStatus('idle');
      return;
    }
    updateStatus('snapping');
    emitProgress(0);
    snapTimeoutRef.current = setTimeout(() => {
      updateStatus('idle');
      snapTimeoutRef.current = null;
    }, SNAP_MS);
  }, [clearSnapTimeout, emitProgress, reduceMotion, updateStatus]);

  const settleAtEnd = useCallback(() => {
    clearSnapTimeout();
    emitProgress(1);
    updateStatus('idle');
  }, [clearSnapTimeout, emitProgress, updateStatus]);

  const runActivation = useCallback(async () => {
    if (statusRef.current === 'pending') {
      return;
    }
    emitProgress(1);
    updateStatus('pending');
    setAnnouncement(pendingAnnouncement);
    try {
      await onActivation?.();
      setAnnouncement(successAnnouncement);
      settleAtEnd();
    } catch (error: unknown) {
      if (onError) {
        onError(error);
      } else {
        console.error(error);
      }
      setAnnouncement(errorAnnouncement);
      snapToIdle();
    }
  }, [
    emitProgress,
    errorAnnouncement,
    onActivation,
    onError,
    pendingAnnouncement,
    settleAtEnd,
    snapToIdle,
    successAnnouncement,
    updateStatus,
  ]);

  const wasDisabledRef = useRef(isDisabled);
  useEffect(() => {
    if (wasDisabledRef.current && !isDisabled) {
      clearSnapTimeout();
      emitProgress(0);
      updateStatus('idle');
    }
    wasDisabledRef.current = isDisabled;
  }, [clearSnapTimeout, emitProgress, isDisabled, updateStatus]);

  const { handleKeyDown, handleKeyUp, handleBlur, cancelKeyboardGesture } = useSlideKeyboardCharge({
    isDisabled,
    reduceMotion,
    statusRef,
    progressRef,
    updateStatus,
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
    statusRef,
    progressRef,
    maxTravelRef,
    measureTravel: () => {
      cancelKeyboardGesture();
      measureTravel();
    },
    updateStatus,
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
    progress,
    status,
    announcement,
    trackRef,
    thumbRef,
    thumbTranslatePx: progress * maxTravel * (direction === 'rtl' ? -1 : 1),
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleKeyDown,
    handleKeyUp,
    handleBlur,
    snapDurationMs: reduceMotion ? 0 : SNAP_MS,
  };
};
