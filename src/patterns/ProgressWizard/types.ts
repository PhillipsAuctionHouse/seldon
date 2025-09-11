// Core Data Types
import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type Dispatch,
  type ForwardRefExoticComponent,
  type SetStateAction,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
} from 'react';
``;
import { type UnknownKeysParam, type z } from 'zod';
import { type useForm, type Form } from 'react-hook-form';
import { type InputProps } from '../../components/Input/Input';
import { type SelectProps } from '../../components/Select/Select';
import { type UUID } from 'crypto';

// ==============================
//  Core Data Types
// ==============================
export type FieldName = string;
export type HTMLFormInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type InputValue = string | number | boolean | string[] | null | undefined;
export type Primitive = string | number | boolean | symbol | bigint | null | void | undefined;
export type GenericFormState = Record<string, InputValue>;
export type StepId = FormStep['id'];
export type ConsumerDefinedFunction = (..._args: unknown[]) => void;

// ==============================
//  Form Registration Types
// ==============================
type FormMethods = ReturnType<typeof useForm>;
type RegisterProgressWizardInput = <FN extends FieldName, TT extends TriggerTypes>(
  _fieldName: FN,
  _options?: RegisterProgressWizardInputOptions<FN, TT>,
) => RegisterProgressWizardInputReturn<FN>;
type RegisterProgressWizardInputOptions<N extends FieldName = string, T extends TriggerTypes = TriggerTypes> = {
  isRequired?: boolean;
  overrides?: Overrides<N>;
  translationFunction?: (_key: N | `${N}Required`) => string;
  trigger?: T;
};
type RegisterProgressWizardInputReturn<N extends FieldName> = (Omit<
  ReturnType<FormMethods['register']>,
  'ref' | 'form' | 'onChange' | 'onBlur'
> & { ref: React.Ref<HTMLFormInputElement> | string }) & {
  onBlur?: OnInputTrigger<'onBlur'>;
  onChange?: OnInputTrigger<'onChange'>;
} & (Omit<Overrides<N>, 'id' | 'labelText'> & Required<Pick<Overrides<N>, 'id' | 'labelText'>>);
export type TriggerTypes = 'onChange' | 'onBlur';
export type Overrides<N extends FieldName> = Omit<
  Partial<ComponentPropsWithoutRef<'input' | 'select' | 'textarea'>> & (Partial<SelectProps> & Partial<InputProps>),
  TriggerTypes
> & {
  id?: N;
  invalid?: boolean;
  invalidText?: string;
  labelText?: string;
};
export type OnInputTrigger<T extends TriggerTypes> = T extends 'onBlur'
  ? FocusEventHandler<HTMLInputElement>
  : ChangeEventHandler<HTMLFormInputElement>;

// ==============================
//  Step Schema Types
// ==============================
export type StepSchema = z.ZodObject<Record<string, z.ZodTypeAny>, UnknownKeysParam, z.ZodTypeAny>;
export type StepSchemaFunction = (schema: StepSchema, formState?: GenericFormState) => z.ZodEffects<StepSchema>;
export type FormStep<T extends StepSchema = StepSchema> = {
  component: React.FC<Record<string, unknown>>;
  id: string;
  label: string;
  refineSchema?: StepSchemaFunction;
  schema: T;
  hiddenFields: string[];
};

// ==============================
//  State Management Types
// ==============================
export type FormStateManagement =
  | {
      isControlled: true;
      dataToSubmit: GenericFormState;
      setDataToSubmit: SetDataToSubmit;
      isCanContinue: boolean | undefined;
      setIsCanContinue: undefined;
      stepId: StepId;
      setStepId: undefined;
      isLoading: boolean | undefined;
      setIsLoading: undefined;
      stepForward: () => void;
      stepBackward: () => void;
      jumpToStep: (_stepId: StepId) => void;
      handlers: ConfigureHandlersForVariantReturnValue;
    }
  | {
      isControlled: false;
      dataToSubmit: GenericFormState;
      setDataToSubmit: SetDataToSubmit;
      isCanContinue: boolean;
      setIsCanContinue: Dispatch<SetStateAction<boolean>>;
      stepId: StepId;
      setStepId: Dispatch<SetStateAction<StepId>>;
      isLoading: boolean;
      setIsLoading: Dispatch<SetStateAction<boolean>>;
      stepForward: () => void;
      stepBackward: () => void;
      jumpToStep: (_stepId: StepId) => void;
      handlers: ConfigureHandlersForVariantReturnValue;
    };
export type updateDataToSubmit = (
  _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
) => void;

type SetDataToSubmit = Dispatch<SetStateAction<GenericFormState>>;
export type HandleContinue = () => void;
export type HandleSubmit = (_formId: UUID) => void;
export type UsePendingValue<FormState extends GenericFormState = GenericFormState> = (_fieldName: keyof FormState) => {
  applyPendingValue: () => void;
  pendingValue: InputValue;
  setPendingValue: Dispatch<SetStateAction<InputValue>>;
};
export type UseWizardForm = () => {
  registerProgressWizardInput: RegisterProgressWizardInput;
};

// ==============================
//  Props Types
// ==============================

type FooterTextValues = {
  start?: string;
  cancel?: string;
  back?: string;
  continue?: string;
  submit?: string;
};

type ExtKeysFooterTextValues = {
  [k in keyof FooterTextValues as `${k}Label`]?: FooterTextValues[k];
};

export type ProgressWizardBaseProps = {
  activeStepId: StepId;
  defaultValues?: GenericFormState;
  steps: FormStep[];
  customHeader?: ReactNode;

  fetcher?: ApproximatedFetcherType;
  action?: string;
};
export type ProgressWizardProps =
  | (ProgressWizardBaseProps &
      ComponentPropsWithRef<'div'> &
      ExternalStates &
      ExtKeysFooterTextValues &
      OptionalTriggeredFunctions &
      RequiredControlledVariantHandlers & {
        isControlled: true;
      })
  | (ProgressWizardBaseProps &
      ComponentPropsWithRef<'div'> &
      ExternalStates &
      ExtKeysFooterTextValues &
      OptionalTriggeredFunctions & {
        isControlled: false;
        handleStepPrev?: undefined;
        handleStepNext?: undefined;
        handleSubmit?: undefined;
      });
export type InnerProgressWizardProps = ComponentPropsWithRef<'div'> &
  ProgressWizardBaseProps &
  ExtKeysFooterTextValues & { isControlled: boolean; formId: UUID };

export type FooterProps = ExternalStates & {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  baseClassName?: string;
  formId: UUID;
  fetcher: ApproximatedFetcherType | undefined;
  labels: FooterTextValues;
};
type ProgressWizardStepFormUniqueProps = {
  formId: string;
  fetcher?: ApproximatedFetcherType;
  action?: string;
  schema?: StepSchema | z.ZodEffects<StepSchema>;
  hiddenFields?: string[];
};
export type ProgressWizardStepFormProps = Omit<
  ComponentPropsWithRef<typeof Form>,
  keyof ProgressWizardStepFormUniqueProps
> &
  ProgressWizardStepFormUniqueProps;

// ==============================
//  Handler Types
// ==============================

export type ConfigureHandlersForVariant = ({
  incomingHandlers,
  isControlled,
  formMethods,
  setDataToSubmit,
  stepForward,
  stepBackward,
  steps,
  stepId,
}: ConfigureHandlersForVariantParams) => ConfigureHandlersForVariantReturnValue;

export type ConfigureHandlersForVariantParams = {
  incomingHandlers: IncomingHandlers;
  isControlled: boolean;
  formMethods: FormMethods;
  setDataToSubmit: SetDataToSubmit;
  stepForward: () => void;
  stepBackward: () => void;
  steps: FormStep[];
  stepId: StepId;
};
type RequiredControlledVariantHandlers = {
  handleStepPrev: ConsumerDefinedFunction;
  handleStepNext: ConsumerDefinedFunction;
  handleSubmit: ConsumerDefinedFunction;
};

type OptionalTriggeredFunctions = {
  onContinue?: () => boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
};

type ExternalStates = {
  isLoading?: boolean;
  isCanContinue?: boolean;
};
export type IncomingHandlers = Partial<Handlers>;
export type Handlers = RequiredControlledVariantHandlers & OptionalTriggeredFunctions;
type ConfigureHandlersForVariantReturnValue = Partial<Omit<Handlers, 'handleSubmit'>> & {
  updateDataToSubmit: updateDataToSubmit;
  handleContinue: HandleContinue;
  handleSubmit: HandleSubmit;
  handleBack: () => void;
  handleCancel: () => void;
};

// ==============================
//  Utility Types
// ==============================
export type ApproximatedFetcherType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form?: ForwardRefExoticComponent<any>;
  formAction?: string;
  formData?: FormData;
  formEncType?: string;
  formMethod?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load?: (_href: string, _opts?: any) => void;
  state: 'idle' | 'submitting' | 'loading';
  submit: (_data: FormData) => void;
  text?: string;
};

export type HandleHiddenFields = (allFields: string[], hiddenFields: string[]) => void;