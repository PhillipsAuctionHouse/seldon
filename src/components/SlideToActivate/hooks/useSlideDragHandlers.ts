import { useCallback, useEffect, useRef, type MutableRefObject, type PointerEvent as ReactPointerEvent } from 'react';
import type { SlideToActivateAction, SlideToActivateState } from '../slideToActivateReducer';
import { SlideToActivateDirections } from '../types';
import { clampProgress, isGestureBusy } from '../slideToActivateUtils';

const REQUIRED_PROGRESS = 0.95;
const DEAD_ZONE = 8;
const SENSITIVITY = 1;

interface UseSlideDragHandlersOptions {
  direction: SlideToActivateDirections | `${SlideToActivateDirections}`;
  isDisabled: boolean;
  stateRef: MutableRefObject<SlideToActivateState>;
  measureTravel: () => void;
  dispatch: (action: SlideToActivateAction) => void;
  emitProgress: (progress: number) => void;
  runActivation: () => Promise<void>;
  snapToIdle: () => void;
}

const trySetPointerCapture = (thumb: HTMLButtonElement, pointerId: number) => {
  try {
    thumb.setPointerCapture(pointerId);
    return typeof thumb.hasPointerCapture === 'function' ? thumb.hasPointerCapture(pointerId) : false;
  } catch {
    // Capture can fail in jsdom / some embedded contexts.
    return false;
  }
};

export const useSlideDragHandlers = ({
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

  const applyPointerMove = useCallback(
    (clientX: number, pointerId: number) => {
      if (pointerId !== activePointerIdRef.current || stateRef.current.status !== 'dragging') {
        return;
      }
      let travel = stateRef.current.maxTravel;
      if (travel <= 0) {
        measureTravel();
        travel = stateRef.current.maxTravel;
        if (travel <= 0) {
          return;
        }
      }
      const rawDelta = clientX - dragStartXRef.current;
      const signedDelta = direction === SlideToActivateDirections.rtl ? -rawDelta : rawDelta;
      if (!hasClearedDeadZoneRef.current) {
        if (Math.abs(signedDelta) < DEAD_ZONE) {
          return;
        }
        hasClearedDeadZoneRef.current = true;
      }
      const nextProgress = clampProgress(dragOriginProgressRef.current + (signedDelta * SENSITIVITY) / travel);
      emitProgress(nextProgress);
    },
    [direction, emitProgress, measureTravel, stateRef],
  );

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
    if (stateRef.current.progress >= REQUIRED_PROGRESS || stateRef.current.progress >= 1) {
      void runActivation();
      return;
    }
    snapToIdle();
  }, [detachDocumentListeners, runActivation, snapToIdle, stateRef]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.pointerId !== activePointerIdRef.current) {
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      applyPointerMove(event.clientX, event.pointerId);
    },
    [applyPointerMove],
  );

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
      const captureSucceeded = trySetPointerCapture(thumb, event.pointerId);
      dragStartXRef.current = event.clientX;
      dragOriginProgressRef.current = stateRef.current.progress;
      hasClearedDeadZoneRef.current = false;
      dispatch({ type: 'dragStarted' });

      detachDocumentListeners();

      // Prefer setPointerCapture + React handlers on the thumb. Document listeners are only a
      // fallback when capture is unavailable (jsdom, odd embeds) so moves outside the thumb still track.
      if (!captureSucceeded) {
        const onPointerMove = (moveEvent: PointerEvent) => {
          if (moveEvent.cancelable) {
            moveEvent.preventDefault();
          }
          applyPointerMove(moveEvent.clientX, moveEvent.pointerId);
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
      }
    },
    [applyPointerMove, detachDocumentListeners, dispatch, finishDrag, isDisabled, measureTravel, stateRef],
  );

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: finishDrag,
    handlePointerCancel: finishDrag,
  };
};
