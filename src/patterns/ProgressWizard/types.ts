import { type MouseEvent, type Dispatch, type SetStateAction } from 'react';

/*                         *\
    ✨ Core Data Types ✨ 
\*                         */

/**
 * Describes the loading state of the ProgressWizard. Used to control UI feedback and button states. Mimics remix fetcher state.
 * - 'idle': No loading or submission in progress
 * - 'loading': Data is being loaded (e.g., async validation)
 * - 'submitting': Form is being submitted
 */
export enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Submitting = 'submitting',
}

type StrictLowercase<K> = K extends string ? Lowercase<K> : never;
type CapitalizationInsensitiveObject<T> = T & { [K in keyof T as StrictLowercase<K>]: T[K] };

const makeCapitalizationInsensitivePseudoEnum = <T extends object>(obj: T) =>
  Object.fromEntries(
    Object.keys(obj).flatMap((k) => [
      [k, k],
      [k.toLowerCase(), k],
    ]),
  ) as Readonly<CapitalizationInsensitiveObject<T>>;

export const DefaultButtonLabels = makeCapitalizationInsensitivePseudoEnum({
  Start: 'Start',
  Cancel: 'Cancel',
  Back: 'Back',
  Continue: 'Continue',
  Submit: 'Submit',
} as const);

export type SetCurrentStepIndex = Dispatch<SetStateAction<number>>;

/*                          *\
  ✨ ProgressWizard Props ✨ 
\*                          */

/**
 * Customizable button labels for ProgressWizard navigation and actions.
 * @property startLabel - Label for the start button (primary, first step)
 * @property cancelLabel - Label for the cancel button (secondary, first step)
 * @property continueLabel - Label for the continue button (primary, middle step)
 * @property backLabel - Label for the back button (secondary, middle step)
 * @property submitLabel - Label for the submit button (primary, last step)
 */

// duplicate documentation below for Storybook descriptions
export type ButtonLabels = {
  /**
   * Label for the start button (primary, first step)
   */
  start?: string;
  /**
   * Label for the cancel button (secondary, first step)
   */
  cancel?: string;
  /**
   * Label for the back button (secondary, middle step)
   */
  back?: string;
  /**
   * Label for the continue button (primary, middle step)
   */
  continue?: string;
  /**
   * Label for the submit button (primary, last step)
   */
  submit?: string;
};

/**
 * Base props for the ProgressWizard component.
 *
 * @property isFullHeight - Sets the wizard component to take up all available height of its container. Defaults true.
 * @property hideNavigation - If true, hides the default footer navigation (consumer is responsible for changing steps)
 * @property hideProgressIndicator - If true, hides the progress indicator bar entirely
 * @property isEnableHistoryManagement - If true (default) advancing steps pushes a browser history state so back/forward navigates steps
 * @property continueLabel - Label for the primary button on middle steps.
 * @property currentStepIndex - Controlled current step index (0‑based). When provided internal step state will not auto‑advance
 * @property defaultStepIndex - Default step index (0‑based). Used to initialize the internal step state.
 * @property shouldAllowContinue - If true, allows advancing to the next step.
 * @property loadingState - Current loading state (see LoadingState) used to show loading UI / disable buttons
 * @property buttonLabels - Button labels for the footer navigation buttons (start/cancel/back/continue/submit)
 */

// duplicate documentation below for Storybook descriptions
export type ProgressWizardBaseProps = {
  /**
   * Sets the wizard component to take up all available height of its container. Defaults true.
   */
  isFullHeight?: boolean;
  /**
   * If true, hides the default footer navigation (so you can implement your own)
   */
  hideNavigation?: boolean;
  /**
   * If true, hides the progress indicator bar.
   */
  hideProgressIndicator?: boolean;
  /**
   * If true, the wizard will push history states on step changes, allowing the browser back/forward buttons to navigate between steps. Default is true.
   */
  isEnableHistoryManagement?: boolean;
  /**
   * Set the current step index manually. If provided, the footer buttons will not automatically switch steps.
   */
  currentStepIndex?: number;
  /**
   * Default step index (0‑based). Used to initialize the internal step state.
   */
  defaultStepIndex?: number;
  /**
   *  Set false to disable continue/submit buttons
   */
  shouldAllowContinue?: boolean;
  /**
   * Current loading state (see LoadingState)
   */
  loadingState?: LoadingState;
  /**
   * Button labels for the footer navigation buttons (start/cancel/back/continue/submit)
   */
  buttonLabels?: ButtonLabels;
};

/**
 * Callback props for ProgressWizard navigation lifecycle.
 * @property onContinue - Called before advancing to the next step (async supported). Return false (or a Promise resolving to false) to block navigation.
 * @property onBack - Called before going back a step. Return false to block navigation.
 * @property onFormSubmit - Called when the last step primary button is clicked (async supported). Return false to block submission.
 * @property onCancel - Called when cancelling from the first step.
 */

export type OnClick = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => void | false | Promise<void | false>;
// duplicate documentation below for Storybook descriptions
export type CallbackProps = {
  /**
   * Called when going back to a previous step. Receives the click event.
   */
  onBack?: OnClick;
  /**
   * Called when cancelling the wizard. Receives the click event.
   */
  onCancel?: OnClick;
  /**
   * Called when continuing to next step. Receives the click event.
   */
  onContinue?: OnClick;
  /**
   * Called on final submit (receives the click event and a function that returns a promise resolving to whether the current step is valid).
   */
  onFormSubmit?: OnClick;
};
