import {
  type ComponentProps,
  type ReactNode,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
  type Ref,
} from 'react';
import { ZodEffects, ZodObject, ZodTypeAny, type UnknownKeysParam } from 'zod';
import {
  type useForm,
  type FieldValues,
  type UseFormReturn,
  type FieldName,
  type UseFormRegisterReturn,
  type RegisterOptions,
} from 'react-hook-form';
import { type InputProps } from '../../components/Input/Input';
import { type SelectProps } from '../../components/Select/Select';

/*                         *\
    ✨ Core Data Types ✨ 
\*                         */

/**
 * This component doesn't know the actual form shape until runtime, this is a placeholder
 */
type GenericFormState = Record<string, unknown>;

/**
 * Union of all HTML input element types supported by ProgressWizard. Used for refs and event handlers.
 */
type HTMLFormInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Describes the loading state of the ProgressWizard. Used to control UI feedback and button states. Mimics remix fetcher state.
 * - 'idle': No loading or submission in progress
 * - 'loading': Data is being loaded (e.g., async validation)
 * - 'submitting': Form is being submitted
 */
export type LoadingState = 'idle' | 'loading' | 'submitting';

/*                       *\
   ✨ Form Step Types ✨ 
\*                       */

/**
 * Zod base schema for a single step in the ProgressWizard. Like StepSchema but without effects.
 * @see https://github.com/colinhacks/zod
 */
export type BaseStepSchema = ZodObject<Record<string, ZodTypeAny>, UnknownKeysParam, ZodTypeAny>;

/**
 * Zod schema for a single step in the ProgressWizard. Used for validating the fields in a step.
 * @see https://github.com/colinhacks/zod
 */
export type StepSchema = BaseStepSchema | ZodEffects<BaseStepSchema>;

/**
 * Represents a schema object where each key is the `id` of a `FormStep` and the value is the corresponding `StepSchema`.
 * This allows for organizing step schemas by their unique identifiers within the progress wizard.
 */
export type NamespacedSchemas = Record<FormStep['id'], StepSchema>;

/**
 * Describes a single step in the ProgressWizard. Each step can have its own schema, label, and UI component.
 * @property componentFactory - Function that returns the ReactElement for the step, given the form context and helpers.
 *   See type `ComponentFactory` for available props.
 * @property id - Unique identifier for the step (used for navigation, not publicly visible and also not very important anymore)
 * @property label - Display label for the step (shown in progress indicator)
 * @property schema - Optional Zod schema for validation of this step's fields. No schema means everything is valid.
 * @property hiddenFields - Optional list of field names to hide in this step, useful for conditional fields or using
 *   inputs to store data that the user doesn't enter.
 *
 * @example
 * const step: FormStep = {
 *   id: 'personal',
 *   label: 'Personal Info',
 *   schema: object({ name: string() }),
 *   componentFactory: (ctx) => <Input {...ctx.registerProgressWizardInput('name')} />,
 * };
 */
export type FormStep = {
  componentFactory: ComponentFactory;
  id: string;
  label: string;
  schema?: StepSchema;
  hiddenFields?: string[];
};

/**
 * Factory function type for rendering a ProgressWizard step component.
 *
 * @param formContext - The context object containing form state, wizard helpers, and navigation handlers.
 *   Properties from react-hook-form's useForm hook, minus some that we have replaced
 *     @property {any} control
 *     @property {Function} watch
 *     @property {Function} setValue
 *     @property {Function} getValues
 *     @property {Function} reset
 *     @property {Function} trigger
 *     @property {object} formState
 *     @property {Function} unregister
 *     @property {Function} setError
 *     @property {Function} clearErrors
 *     @see UseFormReturn<FieldValues>
 *   Properties from useProgressWizardForm hook.
 *     @property {Function} registerProgressWizardInput
 *     @see ReturnType<UseProgressWizardForm>
 *   Consumer-facing wizard state.
 *     @property {number} currentStepIndex
 *     @property {Dispatch<SetStateAction<number>>} setCurrentStepIndex
 *     @property {LoadingState} loadingState
 *     @property {Dispatch<SetStateAction<LoadingState>>} setLoadingState
 *     @see PublicState
 *   Navigation and action handlers.
 *     @property {Function} handleContinue
 *     @property {Function} handleBack
 *     @property {Function} handleSubmit
 *     @property {Function} handleCancel
 *     @see Handlers
 *   @property {string} formId - Unique form ID attribute.
 *
 * @returns {ReactElement} The rendered step component for the wizard.
 *
 * @example
 * const factory: ComponentFactory = ({registerProgressWizardInput, }) => (
 *   <Input {...formContext.registerProgressWizardInput('email')} />
 * );
 */

type ComponentFactory = (
  formContext: Omit<UseFormReturn<FieldValues>, 'handleSubmit' | 'register'> &
    ReturnType<UseProgressWizardForm> &
    PublicState &
    Handlers & { formId: string },
) => ReactElement;

/**
 * State shared across ProgressWizard steps and form context.
 * @property currentStepIndex - The index of the current step (0-based)
 * @property setCurrentStepIndex - Setter for the current step index (use to navigate between steps)
 * @property loadingState - Current loading state (see type LoadingState)
 * @property setLoadingState - Setter for the loading state
 */
export type PublicState = {
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  loadingState?: LoadingState;
  setLoadingState?: Dispatch<SetStateAction<LoadingState>>;
};

/*                             *\
  ✨ Form Registration Types ✨ 
\*                             */

/**
 * Internal convenience type for form methods returned by useForm from react-hook-form.
 */
type FormMethods = ReturnType<typeof useForm>;

/**
 * Allows overriding default input/select/textarea props for ProgressWizard fields.
 * Used as part of the parameters to `registerProgressWizardInput` from `useProgressWizardForm`
 *
 * You can pass any valid props for <input>, <select>, <textarea>, or custom Input/Select components,
 * or anything normally provided by react-hook-form's register function. This gives you the power to break things.
 */
export type Overrides = Partial<
  ComponentProps<'input' | 'select' | 'textarea'> & (SelectProps & InputProps) & UseFormRegisterReturn
>;

/*                              *\
  ✨ Input Registration Types ✨ 
\*                              */

/**
 * Options for registering a ProgressWizard input field. Used to customize field behavior and appearance.
 * @template N - Field name type
 * @property isRequired - Marks field as required (adds * to label and enables validation)
 * @property overrides - Custom props for the field (see type Overrides)
 * @property translationFunction - Function for translating field labels/errors (for i18n)
 * @property registerOptions - Additional options passed to react-hook-form's register function
 * @property displayName - Optional field that overrides internal label translation logic
 *
 * @example
 * registerProgressWizardInput('age', { isRequired: true, overrides: { type: 'number' }, registerOptions: { valueAsNumber: true } })
 */
export type RegisterProgressWizardInputOptions<N extends FieldName<GenericFormState> = string> = {
  isRequired?: boolean;
  overrides?: Overrides;
  translationFunction?: (key: N | `${N}Required`) => string | undefined;
  registerOptions?: RegisterOptions;
  displayName?: string;
};

/**
 * Return type for registering a ProgressWizard input field. Contains refs, event handlers, and override props.
 * @properties from react-hook-form's register function (except form, which is not needed here, and ref which is replaced in this type)
 * @property ref - Ref for the input element (pass to your input component)
 * @property id - Required field id
 * @property labelText - Required label text (for accessibility)
 *
 * @example
 * <Input {...registerProgressWizardInput('email')} />
 */
export type RegisterProgressWizardInputReturn = (Omit<ReturnType<FormMethods['register']>, 'ref' | 'form'> & {
  ref: Ref<HTMLFormInputElement> | string;
}) &
  (Omit<Overrides, 'id' | 'labelText'> & Required<Pick<Overrides, 'id' | 'labelText'>>);

/**
 * Hook for ProgressWizard form logic. Provides input registration for wizard steps.
 *
 * @returns Object with registerProgressWizardInput function
 * @function registerProgressWizardInput - Registers a field for use in the wizard, returns props and handlers for your input
 *
 * @example
 * const { registerProgressWizardInput } = useProgressWizardForm();
 * <Input {...registerProgressWizardInput('email')} />
 */
export type UseProgressWizardForm = () => {
  registerProgressWizardInput: <FN extends FieldName<GenericFormState>>(
    fieldName: FN,
    options?: RegisterProgressWizardInputOptions<FN>,
    stepId?: string,
  ) => RegisterProgressWizardInputReturn;
};

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
   * Initial values for the form (optional)
   */
  defaultValues?: FieldValues;
  /**
   * Array of FormStep objects defining the wizard steps (see type FormStep, this is the _big_ part of the config)
   */
  steps: FormStep[];
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
   * Optional form action URL (for native form submission, moot if `onFormSubmit` is provided)
   */
  action?: string;
  /**
   * If true, the wizard will push history states on step changes, allowing the browser back/forward buttons to navigate between steps. Default is true.
   */
  manageHistory?: boolean;
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

// duplicate documentation below for Storybook descriptions
export type CallbackProps = {
  /**
   * Called when continuing to next step. Return false to block navigation. Receives full form data.
   */
  onContinue?: (formData: FieldValues) => boolean;
  /**
   * Called when going back to a previous step. Return false to block navigation.
   */
  onBack?: (formData: FieldValues) => boolean;
  /**
   * Called on final submit (receives all form data, overrides native form submission [though you can still trigger that in a component factory!]).
   * Also receives a function that returns a promise resolving to whether the current step is valid, so you can still use step schema
   * validation without native submit.
   */
  onFormSubmit?: (formData: FieldValues, getIsCurrentStepValid: () => Promise<boolean>) => void;
  /**
   * Called when cancelling the wizard. If not provided, cancelling navigates back in browser history if possible. Useful for unsaved changes warnings and similar,
   */
  onCancel?: (formData: FieldValues) => void;
  /**
   * Called when validation errors occur
   */
  onError?: (error: unknown, type: string, logMsg: string) => void;
};

/**
 * Internal handler functions for ProgressWizard navigation and actions. Not exposed to consumers.
 * @property handleContinue - Advances to the next step (calls onContinue if provided)
 * @property handleBack - Returns to the previous step (calls onBack if provided)
 * @property handleSubmit - Submits the form (calls onFormSubmit instead of doing the native form submit if provided)
 * @property handleCancel - Cancels the wizard (calls onCancel if provided, otherwise navigates back in the browser history)
 */
export type Handlers = {
  handleContinue: () => void;
  handleBack: () => void;
  handleSubmit?: () => void;
  handleCancel?: () => void;
};
