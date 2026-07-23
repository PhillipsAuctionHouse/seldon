import { useCallback, useEffect, useRef, type MutableRefObject, type PointerEvent as ReactPointerEvent } from 'react';
import type { SlideToActivateAction, SlideToActivateState } from '../slideToActivateReducer';
import { clampProgress, isGestureBusy } from '../slideToActivateUtils';

interface UseSlideDragHandlersOptions {
  requiredProgress: number;
  deadZone: number;
  sensitivity: number;
  direction: 'ltr' | 'rtl';
  isDisabled: boolean;
  stateRef: MutableRefObject<SlideToActivateState>;
  measureTravel: () => void;
  dispatch: (action: SlideToActivateAction) => void;
  emitProgress: (progress: number) => void;
  runActivation: () => Promise<void>;
  snapToIdle: () => void;
}

export const useSlideDragHandlers = ({
  requiredProgress,
  deadZone,
  sensitivity,
  direction,
  isDisabled,
  stateRef,
  measureTravel,
  dispatch,
  emitProgress,
  runActivation,
  snapToIdle,
}: UseSlideDragHandlersOptions) => {
  const dragStartXRef = useRef(0);
  const dragOriginProgressRef = useRef(0);
  const hasClearedDeadZoneRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const thumbElementRef = useRef<HTMLButtonElement | null>(null);

  const clearDocumentListenersRef = useRef<(() => void) | null>(null);

  const detachDocumentListeners = useCallback(() => {
    clearDocumentListenersRef.current?.();
    clearDocumentListenersRef.current = null;
  }, []);

  useEffect(() => () => detachDocumentListeners(), [detachDocumentListeners]);

  const finishDrag = useCallback(() => {
    detachDocumentListeners();
    const thumb = thumbElementRef.current;
    const pointerId = activePointerIdRef.current;
    try {
      if (thumb && pointerId !== null && thumb.hasPointerCapture(pointerId)) {
        thumb.releasePointerCapture(pointerId);
      }
    } catch {
      // hasPointerCapture/releasePointerCapture unsupported in some environments (e.g. jsdom).
    }
    activePointerIdRef.current = null;
    thumbElementRef.current = null;

    if (stateRef.current.status !== 'dragging') {
      return;
    }
    if (stateRef.current.progress >= requiredProgress || stateRef.current.progress >= 1) {
      void runActivation();
      return;
    }
    snapToIdle();
  }, [detachDocumentListeners, requiredProgress, runActivation, snapToIdle, stateRef]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (isDisabled || isGestureBusy(stateRef.current.status) || stateRef.current.progress >= 1) {
        return;
      }
      // Avoid text selection / scroll stealing the gesture (esp. Storybook iframe + touch).
      // preventDefault also blocks the browser's default focus — restore it so Space/Enter work.
      event.preventDefault();
      measureTravel();
      const thumb = event.currentTarget;
      thumb.focus();
      thumbElementRef.current = thumb;
      activePointerIdRef.current = event.pointerId;
      try {
        thumb.setPointerCapture(event.pointerId);
      } catch {
        // Capture can fail in some embedded contexts; document listeners still drive the drag.
      }
      dragStartXRef.current = event.clientX;
      dragOriginProgressRef.current = stateRef.current.progress;
      hasClearedDeadZoneRef.current = false;
      dispatch({ type: 'dragStarted' });

      detachDocumentListeners();

      const onPointerMove = (moveEvent: PointerEvent) => {
        if (moveEvent.pointerId !== activePointerIdRef.current || stateRef.current.status !== 'dragging') {
          return;
        }
        // Keep the gesture from promoting to a scroll (wide tracks / overflow parents).
        if (moveEvent.cancelable) {
          moveEvent.preventDefault();
        }
        let travel = stateRef.current.maxTravel;
        if (travel <= 0) {
          measureTravel();
          travel = stateRef.current.maxTravel;
          if (travel <= 0) {
            return;
          }
        }
        const rawDelta = moveEvent.clientX - dragStartXRef.current;
        const signedDelta = direction === 'rtl' ? -rawDelta : rawDelta;
        if (!hasClearedDeadZoneRef.current) {
          if (Math.abs(signedDelta) < deadZone) {
            return;
          }
          hasClearedDeadZoneRef.current = true;
        }
        const nextProgress = clampProgress(dragOriginProgressRef.current + (signedDelta * sensitivity) / travel);
        emitProgress(nextProgress);
      };

      const onPointerUp = (upEvent: PointerEvent) => {
        if (upEvent.pointerId !== activePointerIdRef.current) {
          return;
        }
        finishDrag();
      };

      document.addEventListener('pointermove', onPointerMove, { passive: false });
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('pointercancel', onPointerUp);
      clearDocumentListenersRef.current = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointercancel', onPointerUp);
      };
    },
    [
      deadZone,
      detachDocumentListeners,
      direction,
      dispatch,
      emitProgress,
      finishDrag,
      isDisabled,
      measureTravel,
      sensitivity,
      stateRef,
    ],
  );

  return {
    handlePointerDown,
    handlePointerUp: finishDrag,
    handlePointerCancel: finishDrag,
  };
};
