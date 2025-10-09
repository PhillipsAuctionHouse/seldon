import { type MouseEvent, type ReactNode } from 'react';

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
  startLabel?: string;
  /**
   * Label for the cancel button (secondary, first step)
   */
  cancelLabel?: string;
  /**
   * Label for the continue button (primary, middle step)
   */
  continueLabel?: string;
  /**
   * Label for the back button (secondary, middle step)
   */
  backLabel?: string;
  /**
   * Label for the submit button (primary, last step)
   */
  submitLabel?: string;
};

/**
 * Base props for the ProgressWizard component. These are important to render and control the wizard.
 * @property defaultValues - Initial values for the form (optional)
 * @property steps - Array of FormStep objects defining the wizard steps (see type FormStep, this is the _big_ part of the config)
 * @property customHeader - Optional custom header ReactNode (renders above progress indicator)
 * @property loadingState - Current loading state (see LoadingState)
 * @property action - Optional form action URL (for native form submission, moot if `onFormSubmit` is provided)
 */

// duplicate documentation below for Storybook descriptions
export type ProgressWizardBaseProps = {
  /**
   * Optional custom header ReactNode (renders above progress indicator)
   */
  customHeader?: ReactNode;
  /**
   * If true, hides the default footer navigation (so you can implement your own)
   */
  hideNavigation?: boolean;
  /**
   * If true, hides the progress indicator bar.
   */
  hideProgressIndicator?: boolean;
  /**
   * Current loading state (see LoadingState)
   */
  loadingState?: LoadingState;
  /**
   * If true, the wizard will push history states on step changes, allowing the browser back/forward buttons to navigate between steps. Default is true.
   */
  manageHistory?: boolean;
  /**
   * Set the current step index manually. If provided, the footer buttons will not automatically switch steps.
   */
  currentStepIndex?: number;
};

/**
 * Callback props for ProgressWizard actions. Used to handle navigation and submission events. Receives full form data.
 * @property onContinue - Called when continuing to next step. Return false to block navigation. Receives full form data.
 * @property onBack - Called when going back to a previous step. Return false to block navigation. Receives full form data.
 * @property onFormSubmit - Called on final submit (receives all form data, overrides native form submission [though you can still trigger that in a component factory!]).
 *   Also receives a function that returns a promise resolving to whether the current step is valid, so you can still use step schema validation without native submit.
 * @property onCancel - Called when cancelling the wizard, return false to block cancellation. Receives full form data.
 * @property onError - Called when validation errors occur
 *
 * @example
 * <ProgressWizard onContinue={(data) => { ... }} onFormSubmit={(data) => { ... }} />
 */

export type OnClick = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => void | false | Promise<void | false>;
// duplicate documentation below for Storybook descriptions
export type CallbackProps = {
  /**
   * Called when continuing to next step. Receives the click event.
   */
  onContinue?: OnClick;
  /**
   * Called when going back to a previous step. Receives the click event.
   */
  onBack?: OnClick;
  /**
   * Called on final submit (receives the click event and a function that returns a promise resolving to whether the current step is valid).
   */
  onFormSubmit?: OnClick;
  /**
   * Called when cancelling the wizard. Receives the click event.
   */
  onCancel?: OnClick;
};
