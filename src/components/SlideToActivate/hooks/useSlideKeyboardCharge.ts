import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  clampProgress,
  easeOutCubic,
  isGestureBusy,
  KEYBOARD_CHARGE_MS,
  KEYBOARD_CHARGE_TARGET,
  KEYBOARD_FINISH_MS,
  linear,
  type SlideToActivateStatus,
} from '../slideToActivateUtils';

interface UseSlideKeyboardChargeOptions {
  isDisabled: boolean;
  reduceMotion: boolean;
  statusRef: React.MutableRefObject<SlideToActivateStatus>;
  progressRef: React.MutableRefObject<number>;
  updateStatus: (status: SlideToActivateStatus) => void;
  emitProgress: (progress: number) => void;
  runActivation: () => Promise<void>;
  snapToIdle: () => void;
}

export const useSlideKeyboardCharge = ({
  isDisabled,
  reduceMotion,
  statusRef,
  progressRef,
  updateStatus,
  emitProgress,
  runActivation,
  snapToIdle,
}: UseSlideKeyboardChargeOptions) => {
  const activeKeyRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const cancelKeyboardGesture = useCallback(() => {
    if (!activeKeyRef.current && statusRef.current !== 'dragging') {
      stopRaf();
      return;
    }
    activeKeyRef.current = null;
    stopRaf();
    if (statusRef.current === 'dragging' || statusRef.current === 'snapping') {
      snapToIdle();
    }
  }, [snapToIdle, statusRef, stopRaf]);

  useEffect(() => () => stopRaf(), [stopRaf]);

  useEffect(() => {
    if (isDisabled) {
      cancelKeyboardGesture();
    }
  }, [cancelKeyboardGesture, isDisabled]);

  // Shared driver for both the held-charge (handleKeyDown) and release-finish (finishAndActivate)
  // ramps: they only differ in target/duration/easing and what happens once `t` reaches 1.
  const animateProgressTo = useCallback(
    (
      target: number,
      durationMs: number,
      ease: (t: number) => number,
      options?: { onDone?: () => void; shouldContinue?: () => boolean },
    ) => {
      const startProgress = progressRef.current;
      const startTime = performance.now();
      const tick = (now: number) => {
        if (options?.shouldContinue && !options.shouldContinue()) {
          return;
        }
        const t = Math.min(1, (now - startTime) / durationMs);
        emitProgress(clampProgress(startProgress + (target - startProgress) * ease(t)));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        options?.onDone?.();
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [emitProgress, progressRef],
  );

  const finishAndActivate = useCallback(() => {
    stopRaf();
    // Only reachable with reduceMotion false — handleKeyUp already handles the reduceMotion case.
    if (progressRef.current >= 1) {
      void runActivation();
      return;
    }
    animateProgressTo(1, KEYBOARD_FINISH_MS, linear, { onDone: () => void runActivation() });
  }, [animateProgressTo, progressRef, runActivation, stopRaf]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled || isGestureBusy(statusRef.current)) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelKeyboardGesture();
        return;
      }
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      if (event.repeat || activeKeyRef.current) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      activeKeyRef.current = event.key;

      if (reduceMotion) {
        return;
      }

      updateStatus('dragging');
      animateProgressTo(KEYBOARD_CHARGE_TARGET, KEYBOARD_CHARGE_MS, easeOutCubic, {
        shouldContinue: () => activeKeyRef.current !== null && statusRef.current === 'dragging',
      });
    },
    [animateProgressTo, cancelKeyboardGesture, isDisabled, reduceMotion, statusRef, updateStatus],
  );

  const handleKeyUp = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== activeKeyRef.current) {
        return;
      }
      event.preventDefault();
      activeKeyRef.current = null;
      stopRaf();

      if (isDisabled || statusRef.current === 'pending') {
        return;
      }

      if (reduceMotion) {
        void runActivation();
        return;
      }

      if (statusRef.current !== 'dragging') {
        updateStatus('dragging');
      }
      finishAndActivate();
    },
    [finishAndActivate, isDisabled, reduceMotion, runActivation, statusRef, stopRaf, updateStatus],
  );

  const handleBlur = useCallback(() => {
    if (activeKeyRef.current || rafRef.current !== null) {
      cancelKeyboardGesture();
    }
  }, [cancelKeyboardGesture]);

  return {
    handleKeyDown,
    handleKeyUp,
    handleBlur,
    cancelKeyboardGesture,
  };
};
