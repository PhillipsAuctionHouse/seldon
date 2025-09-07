import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type Dispatch,
  type ForwardRefExoticComponent,
  type ReactNode,
  type SetStateAction,
  type FC,
  type ReactElement,
} from 'react';
import { type UnknownKeysParam, type z } from 'zod';
import { type useForm, type Form, type ChangeHandler } from 'react-hook-form';

import { type InputProps } from '../../components/Input/Input';
import { type SelectProps } from '../../components/Select/Select';

export type InputValue = string | number | boolean | string[] | null | undefined;
type HTMLFormControlElement = HTMLElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type ProbablyFormFields = Record<string, InputValue>;

export type ApproximatedFetcherType = {
  state: 'idle' | 'submitting' | 'loading';

  // it is a fake type, I am okay with anys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form?: ForwardRefExoticComponent<any>;
  submit: (data: FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load?: (href: string, opts?: any) => void;
  formMethod?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  formAction?: string;
  formEncType?: string;
  text?: string;
  formData?: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

type FieldName = string;
type UsedForm = ReturnType<typeof useForm>;
export type TriggerTypes = 'onChange' | 'onBlur'; // this is all `register` gives us

type Overrides<N extends FieldName> = Omit<
  Partial<ComponentPropsWithoutRef<'input' | 'select' | 'textarea'>> & (Partial<SelectProps> & Partial<InputProps>),
  TriggerTypes
> & {
  id?: N;
  labelText?: string;
  invalid?: boolean;
  invalidText?: string;
};

export type RegisterProgressWizardInputOptions<N extends FieldName, T extends TriggerTypes> = {
  isRequired?: boolean;
  trigger?: T;
  overrides?: Overrides<N>;
  translationFunction?: (key: N | `${N}Required`) => string;
};

export type RegisterProgressWizardInputReturn<N extends FieldName> = (Omit<
  ReturnType<UsedForm['register']>,
  'ref' | 'form'
> & { ref: React.Ref<HTMLFormControlElement> | string }) & {
  onBlur?: ChangeHandler;
  onChange?: ChangeHandler;
} & (Omit<Overrides<N>, 'id' | 'labelText'> & Required<Pick<Overrides<N>, 'id' | 'labelText'>>);

export type RegisterProgressWizardInput = <N extends FieldName, T extends TriggerTypes>(
  fieldName: N,
  options?: RegisterProgressWizardInputOptions<N, T>,
) => RegisterProgressWizardInputReturn<N>;

export type SetCanContinue<T extends 'internal' | 'external' | undefined = undefined> = T extends 'internal'
  ? Dispatch<SetStateAction<boolean>>
  : T extends 'external'
    ? (isValid: boolean) => void
    : Dispatch<SetStateAction<boolean>> | ((isValid: boolean) => void);

export type UseWizardFormStep<FS extends ProbablyFormFields = ProbablyFormFields> = () => {
  formMethods: ReturnType<typeof useForm>;
  goToStep: (step: string) => void;
  commitInputValue: (fieldName: keyof FS) => void;
  currentFormState: FS;
  setCanContinue: SetCanContinue;
  setHiddenFields: Dispatch<SetStateAction<(keyof FS)[]>>;
  registerProgressWizardInput: RegisterProgressWizardInput;
};

type UsePendingValue<T extends ProbablyFormFields = ProbablyFormFields> = (fieldName: keyof T) => {
  setPendingValue: Dispatch<SetStateAction<InputValue>>;
  applyPendingValue: () => void;
  pendingValue: InputValue;
};

export type ProgressWizardStepComponentProps<Schema extends ProbablyFormFields = ProbablyFormFields> = {
  useWizardFormStep: UseWizardFormStep<Schema>;
  usePendingValue: UsePendingValue<Schema>;
};

export type ProgressWizardStepComponent = ReactElement<ProgressWizardStepComponentProps>;

type StepSchema = z.ZodObject<Record<string, z.ZodTypeAny>, UnknownKeysParam, z.ZodTypeAny>;

type ca<T> = T extends z.ZodTypeAny ? T : z.ZodTypeAny;

export type StepSchemaFunction = <T extends z.ZodTypeAny>(
  schema: ca<T>,
  formState?: ProbablyFormFields,
) => z.ZodEffects<ca<T>>;

export type FormStep<T extends StepSchema = StepSchema> = {
  label: string;
  id: string;
  schema: T;
  refineSchema?: StepSchemaFunction;
  component: FC<ProgressWizardStepComponentProps>; // not ReactElement yet, just sitting there as a function
};

export type ProgressWizardStepForm = ReactElement<ProgressWizardStepFormProps>;

type ProgressWizardStepFormUniqueProps = {
  formId: string;
  fetcher?: ApproximatedFetcherType;
  action?: string;
  schema?: StepSchema | z.ZodEffects<StepSchema>;
  hiddenFields?: string[];
};

export type ProgressWizardStepFormProps =
  | Omit<ComponentPropsWithRef<typeof Form>, keyof ProgressWizardStepFormUniqueProps>
  | ProgressWizardStepFormUniqueProps;

export interface ProgressWizardProps extends ComponentPropsWithRef<'div'> {
  /**
   * Optional custom header to render above the wizard steps.
   */
  customHeader?: ReactNode;

  /**
   * Label for the "Start" button. Defaults to a standard label if not provided.
   */
  startLabel?: string;

  /**
   * Label for the "Cancel" button. Defaults to a standard label if not provided.
   */
  cancelLabel?: string;

  /**
   * Label for the "Back" button. Defaults to a standard label if not provided.
   */
  backLabel?: string;

  /**
   * Label for the "Continue" button. Defaults to a standard label if not provided.
   */
  continueLabel?: string;

  /**
   * Label for the "Submit" button. Defaults to a standard label if not provided.
   */
  submitLabel?: string;

  /**
   * Optional fetcher function to handle form submission.
   * If supplied, this function will be used to submit the wizard form data,
   * overriding other submit handlers. 🎺TODO this might not be true when I fix the nav stuff
   */
  fetcher?: ApproximatedFetcherType;

  /**
   * Optional action string for the form submission endpoint.
   */
  action?: string;

  /**
   * An array of step objects. 🎺TODO update comments
   * Represents the steps in the wizard. The order of the steps in the array is fixed. IDs can be whatever.
   */
  steps: FormStep[];
  /**
   * Optional default values for the form fields.
   */
  currentFormState?: ProbablyFormFields;

  // 🎺TODO comment
  setCurrentFormState?: Dispatch<SetStateAction<ProbablyFormFields>>;

  // 🎺TODO comment
  canContinue?: boolean;

  // 🎺TODO comment
  setCanContinue?: SetCanContinue<'external'>;

  /**
   * The index of the current step (0-based).
   */
  currentStepId?: string;

  /**
   * Callback to be called when the Back button is pressed.
   * Receives the current step index.
   */
  onStepBack?: (stepId: string) => void;

  /**
   * Callback when step changes (for controlled mode).
   */
  onStepChange?: (stepId: string) => void;

  /**
   * Callback to be called when a step is submitted (before advancing).
   * Optionally receives the current step index. Can return false` to prevent advancing.
   */
  onStepSubmit?: (stepId?: string) => boolean | void;

  /**
   * Optional callback function to be called when the wizard is submitted, if not supplied the wizard will use the default form submit
   */
  onSubmit?: () => void;

  // 🎺TODO
  onError?: (error: unknown) => void;

  /**
   * Optional callback function to be called when the wizard is canceled.
   */
  onCancel?: () => void;
}
