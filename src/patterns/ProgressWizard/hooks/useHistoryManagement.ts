import { useEffect, useRef } from 'react';
import { type SetCurrentStepIndex } from '../types';

export const useHistoryManagement = ({
  enabled,
  currentStepIndex,
  stepsLength,
  setCurrentStepIndex,
}: {
  enabled: boolean;
  currentStepIndex: number;
  stepsLength: number;
  setCurrentStepIndex: SetCurrentStepIndex;
}) => {
  const prevStepIndexRef = useRef<number>(0);
  useEffect(() => {
    if (!enabled) return;
    if (currentStepIndex > prevStepIndexRef.current) {
      window.history.pushState({ step: currentStepIndex }, '', window.location.pathname + window.location.search);
    }
    prevStepIndexRef.current = currentStepIndex;
  }, [currentStepIndex, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && typeof state.step === 'number' && state.step >= 0 && state.step < stepsLength) {
        setCurrentStepIndex(state.step);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, stepsLength, setCurrentStepIndex]);
};
