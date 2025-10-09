import { useEffect, useRef } from 'react';
import { type SetCurrentStepIndex } from '../types';

export const useHistoryManagement = ({
  manageHistory,
  currentStepIndex,
  stepsLength,
  setCurrentStepIndex,
}: {
  manageHistory: boolean;
  currentStepIndex: number;
  stepsLength: number;
  setCurrentStepIndex: SetCurrentStepIndex;
}) => {
  const prevStepIndexRef = useRef<number>(0);
  useEffect(() => {
    if (!manageHistory) return;
    if (currentStepIndex > prevStepIndexRef.current) {
      window.history.pushState({ step: currentStepIndex }, '', window.location.pathname + window.location.search);
    }
    prevStepIndexRef.current = currentStepIndex;
  }, [currentStepIndex, manageHistory]);

  useEffect(() => {
    if (!manageHistory) return;
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
  }, [manageHistory, stepsLength, setCurrentStepIndex]);
};
