import { useEffect, useRef } from 'react';
import { type SetCurrentStepIndex } from '../types';

/**
 * Hook to manage browser history state for a multi-step wizard.
 *
 * This hook (when enabled) pushes a new history entry whenever the user advances
 * to a later step, and listens for `popstate` events so the wizard can respond
 * to back/forward navigation by restoring the step index from history state.
 *
 * Notes:
 * - Only numeric step indices within [0, stepsLength) are accepted from history state.
 * - History entries are only pushed when `enabled` is true and the current
 *   step index is greater than the previous one (i.e. moving forward).
 *
 * @param params - Configuration object for the hook
 * @param params.enabled - When false, the hook is inert (does not push or listen).
 * @param params.currentStepIndex - The current step index of the wizard. When this
 *   value increases the hook will push a new history state (if enabled).
 * @param params.stepCount - Total number of steps in the wizard. Used to validate
 *   indices read from history state before applying them via `setCurrentStepIndex`.
 * @param params.setCurrentStepIndex - Setter callback used to update the current
 *   step index when a valid index is found in the popstate event state.
 */
export const useHistoryManagement = ({
  enabled,
  currentStepIndex,
  stepCount,
  setCurrentStepIndex,
}: {
  enabled: boolean;
  currentStepIndex: number;
  stepCount: number;
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
      if (state && typeof state.step === 'number' && state.step >= 0 && state.step < stepCount) {
        setCurrentStepIndex(state.step);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, stepCount, setCurrentStepIndex]);
};
