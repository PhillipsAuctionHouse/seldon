import type { SlideToActivateStatus } from './slideToActivateUtils';

export interface SlideToActivateState {
  status: SlideToActivateStatus;
  progress: number;
  maxTravel: number;
  /** Text for the persistent aria-live region — see SlideToActivate.tsx. */
  announcement: string;
}

export const initialSlideToActivateState: SlideToActivateState = {
  status: 'idle',
  progress: 0,
  maxTravel: 0,
  announcement: '',
};

export type SlideToActivateAction =
  | { type: 'measured'; maxTravel: number }
  | { type: 'dragStarted' }
  | { type: 'progressChanged'; progress: number }
  | { type: 'activationStarted'; announcement: string }
  | { type: 'activationSucceeded'; announcement: string }
  | { type: 'activationFailed'; announcement: string }
  | { type: 'snapStarted'; immediate: boolean }
  | { type: 'snapCompleted' }
  | { type: 'reset' };

// Every branch bails out to the same `state` reference when nothing would actually change.
// useReducer only skips a re-render on reference equality (unlike useState's per-field
// Object.is check), so an unconditional `{ ...state, ... }` spread would re-render on every
// dispatch even when the value is identical — e.g. a ResizeObserver firing with an unchanged
// measurement.
export function slideToActivateReducer(
  state: SlideToActivateState,
  action: SlideToActivateAction,
): SlideToActivateState {
  switch (action.type) {
    case 'measured':
      return action.maxTravel === state.maxTravel ? state : { ...state, maxTravel: action.maxTravel };
    case 'dragStarted':
      return state.status === 'dragging' ? state : { ...state, status: 'dragging' };
    case 'progressChanged':
      return action.progress === state.progress ? state : { ...state, progress: action.progress };
    case 'activationStarted':
      return { ...state, status: 'pending', announcement: action.announcement };
    case 'activationSucceeded':
      return { ...state, status: 'idle', announcement: action.announcement };
    case 'activationFailed':
      return { ...state, announcement: action.announcement };
    case 'snapStarted': {
      const nextStatus = action.immediate ? 'idle' : 'snapping';
      return nextStatus === state.status ? state : { ...state, status: nextStatus };
    }
    case 'snapCompleted':
      return state.status === 'idle' ? state : { ...state, status: 'idle' };
    case 'reset':
      return state.status === 'idle' && state.progress === 0 ? state : { ...state, status: 'idle', progress: 0 };
    default:
      return state;
  }
}
