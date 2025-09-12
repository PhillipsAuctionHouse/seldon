import {
  type ComponentProps,
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type UnknownKeysParam, type z } from 'zod';
import { type useForm, type FieldValues, type FieldErrors, type UseFormReturn } from 'react-hook-form';
import { type InputProps } from '../../components/Input/Input';
import { type SelectProps } from '../../components/Select/Select';

/*                         *\
    ✨ Core Data Types ✨ 
\*                         */
export type FieldName = string;
export type HTMLFormInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export type LoadingState = 'idle' | 'loading' | 'submitting';

/*                       *\
   ✨ Form Step Types ✨ 
\*                       */
export type StepSchema = z.ZodObject<Record<string, z.ZodTypeAny>, UnknownKeysParam, z.ZodTypeAny>;
export type FormStep<T extends StepSchema = StepSchema> = {
  componentFactory: (formContext: UseFormReturn<FieldValues> & ReturnType<UseProgressWizardForm> & PublicState) => ReactElement;
  id: string;
  label: string;
  schema?: T;
  hiddenFields?: string[];
};

export type PublicState = {
    currentStepIndex: number;
    setCurrentStepIndex: Dispatch<SetStateAction<number>>;
    loadingState?: LoadingState;
    setLoadingState?: Dispatch<SetStateAction<LoadingState>>;
}

/*                             *\
  ✨ Form Registration Types ✨ 
\*                             */
type FormMethods = ReturnType<typeof useForm>;
export type TriggerTypes = 'onChange' | 'onBlur';
export type OnInputTrigger<T extends TriggerTypes> = T extends 'onBlur'
  ? FocusEventHandler<HTMLInputElement>
  : ChangeEventHandler<HTMLFormInputElement>;
export type Overrides<N extends FieldName> = Omit<
  Partial<ComponentProps<'input' | 'select' | 'textarea'>> & (Partial<SelectProps> & Partial<InputProps>),
  TriggerTypes
> & {
  id?: N;
  invalid?: boolean;
  invalidText?: string;
  labelText?: string;
};

/*                              *\
  ✨ Input Registration Types ✨ 
\*                              */
export type RegisterProgressWizardInputOptions<N extends FieldName = string, T extends TriggerTypes = TriggerTypes> = {
  isRequired?: boolean;
  overrides?: Overrides<N>;
  translationFunction?: (key: N | `${N}Required`) => string;
  trigger?: T;
};
export type RegisterProgressWizardInputReturn<N extends FieldName> = (Omit<
  ReturnType<FormMethods['register']>,
  'ref' | 'form' | 'onChange' | 'onBlur'
> & { ref: React.Ref<HTMLFormInputElement> | string }) & {
  onBlur?: OnInputTrigger<'onBlur'>;
  onChange?: OnInputTrigger<'onChange'>;
} & (Omit<Overrides<N>, 'id' | 'labelText'> & Required<Pick<Overrides<N>, 'id' | 'labelText'>>);

export type UseProgressWizardForm = () => {
  registerProgressWizardInput: <FN extends FieldName, TT extends TriggerTypes>(
    fieldName: FN,
    options?: RegisterProgressWizardInputOptions<FN, TT>,
  ) => RegisterProgressWizardInputReturn<FN>;
};

/*                          *\
  ✨ ProgressWizard Props ✨ 
\*                          */
export type ButtonLabels = {
  startLabel?: string;
  cancelLabel?: string;
  backLabel?: string;
  continueLabel?: string;
  submitLabel?: string;
};
export type ProgressWizardBaseProps = {
  defaultValues?: FieldValues;
  steps: FormStep[];
  customHeader?: ReactNode;
  loadingState: LoadingState;
  action?: string;
};
export type CallbackProps = {
  onContinue?: (formData: FieldValues) => boolean;
  onBack?: (formData: FieldValues) => boolean;
  onSubmit?: (data: FieldValues) => void;
  onCancel?: (formData: FieldValues) => void;
  onError?: (error: FieldErrors) => void;
};
export type Handlers = {
  handleContinue: () => void;
  handleBack: () => void;
  handleSubmit?: () => void;
  handleCancel?: () => void;
  handleError?: (error: FieldErrors) => void;
};
