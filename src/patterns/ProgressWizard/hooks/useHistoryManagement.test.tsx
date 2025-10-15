import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHistoryManagement } from './useHistoryManagement';

const getLocation = () => window.location.pathname + window.location.search;

describe('useHistoryManagement', () => {
  let originalPushState: typeof window.history.pushState;
  let originalAddEventListener: typeof window.addEventListener;
  let originalRemoveEventListener: typeof window.removeEventListener;

  beforeEach(() => {
    originalPushState = window.history.pushState;
    originalAddEventListener = window.addEventListener;
    originalRemoveEventListener = window.removeEventListener;
  });

  afterEach(() => {
    window.history.pushState = originalPushState;
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  it('pushes state when moving forward', () => {
    const pushStateSpy = vi.spyOn(window.history, 'pushState');
    const setCurrentStepIndex = vi.fn();
    const { rerender } = renderHook(
      ({ idx }) =>
        useHistoryManagement({
          enabled: true,
          currentStepIndex: idx,
          stepsLength: 3,
          setCurrentStepIndex,
        }),
      { initialProps: { idx: 0 } },
    );
    rerender({ idx: 1 });
    expect(pushStateSpy).toHaveBeenCalledWith({ step: 1 }, '', getLocation());
  });

  it('does not push state if enabled is false', () => {
    const pushStateSpy = vi.spyOn(window.history, 'pushState');
    const setCurrentStepIndex = vi.fn();
    renderHook(() =>
      useHistoryManagement({
        enabled: false,
        currentStepIndex: 1,
        stepsLength: 3,
        setCurrentStepIndex,
      }),
    );
    expect(pushStateSpy).not.toHaveBeenCalled();
  });

  it('handles popstate event and sets step index', () => {
    const setCurrentStepIndex = vi.fn();
    let popHandler: ((event: PopStateEvent) => void) | undefined;
    vi.spyOn(window, 'addEventListener').mockImplementation((event, cb) => {
      if (event === 'popstate') popHandler = cb as (event: PopStateEvent) => void;
    });
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => void 0);
    renderHook(() =>
      useHistoryManagement({
        enabled: true,
        currentStepIndex: 1,
        stepsLength: 3,
        setCurrentStepIndex,
      }),
    );
    if (popHandler) {
      popHandler({ state: { step: 2 } } as PopStateEvent);
      expect(setCurrentStepIndex).toHaveBeenCalledWith(2);
    }
  });
});
