import { useCallback, useEffect, useRef, type MutableRefObject, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { SlideToActivateState } from '../slideToActivateReducer';
import { isGestureBusy } from '../slideToActivateUtils';

interface UseSlideKeyboardChargeOptions {
  isDisabled: boolean;
  stateRef: MutableRefObject<SlideToActivateState>;
  runActivation: () => Promise<void>;
}

export const useSlideKeyboardCharge = ({ isDisabled, stateRef, runActivation }: UseSlideKeyboardChargeOptions) => {
  const activeKeyRef = useRef<string | null>(null);

  const cancelKeyboardGesture = useCallback(() => {
    activeKeyRef.current = null;
  }, []);

  useEffect(() => {
    if (isDisabled) {
      cancelKeyboardGesture();
    }
  }, [cancelKeyboardGesture, isDisabled]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled || isGestureBusy(stateRef.current.status) || stateRef.current.progress >= 1) {
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
    },
    [cancelKeyboardGesture, isDisabled, stateRef],
  );

  const handleKeyUp = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== activeKeyRef.current) {
        return;
      }
      event.preventDefault();
      activeKeyRef.current = null;
      if (isDisabled || stateRef.current.status === 'pending') {
        return;
      }
      void runActivation();
    },
    [isDisabled, runActivation, stateRef],
  );

  const handleBlur = useCallback(() => {
    cancelKeyboardGesture();
  }, [cancelKeyboardGesture]);

  return {
    handleKeyDown,
    handleKeyUp,
    handleBlur,
    cancelKeyboardGesture,
  };
};
