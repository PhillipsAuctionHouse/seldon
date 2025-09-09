import { forwardRef, useState, useEffect, useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
import Icon from '../../components/Icon/Icon';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Form, type ChangeHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import {
  type ProgressWizardStepComponentProps,
  type InputValue,
  type ProgressWizardProps,
  type RegisterProgressWizardInputOptions,
  type TriggerTypes,
  type RegisterProgressWizardInput,
  type RegisterProgressWizardInputReturn,
  type ProgressWizardStepComponent,
  type ProgressWizardStepFormProps,
} from './types';

type ControlledProgressWizardProps = Omit<
  ProgressWizardProps,
  'isControlled' | 'setCurrentFormState' | 'setCanContinue'
> & {
  isControlled: true;
  currentFormState: Record<string, InputValue>;
  setCurrentFormState: Dispatch<SetStateAction<Record<string, InputValue>>>;
  canContinue?: boolean;
  setCanContinue?: Dispatch<SetStateAction<boolean>>;
  currentStepId: string;
  hiddenFields?: string[];
};

type UncontrolledProgressWizardProps = Omit<
  ProgressWizardProps,
  | 'isControlled'
  | 'currentFormState'
  | 'setCurrentFormState'
  | 'canContinue'
  | 'setCanContinue'
  | 'currentStepId'
  | 'hiddenFields'
> & {
  isControlled?: false;
};

const warnControlledUsage = ({
  isControlled,
  props,
}: {
  isControlled: boolean;
  props: ControlledProgressWizardProps | UncontrolledProgressWizardProps;
}) => {
  if (isControlled) {
    if (
      !('currentFormState' in props) ||
      typeof props.setCurrentFormState !== 'function' ||
      typeof props.currentStepId !== 'string'
    ) {
      // Warn if required controlled props are missing
      console.error(
        '[ProgressWizard] Controlled mode requires currentFormState, setCurrentFormState, and currentStepId props.',
      );
    }
  } else if ('currentFormState' in props || 'setCurrentFormState' in props || 'currentStepId' in props) {
    // Warn if controlled props are present in uncontrolled mode
    console.error(
      '[ProgressWizard] Uncontrolled mode should not receive controlled props like currentFormState, setCurrentFormState, or currentStepId.',
    );
  }
};

const ControlledProgressWizard = forwardRef<HTMLDivElement, ControlledProgressWizardProps>((props, ref) => {
  const {
    isControlled,
    customHeader,
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',
    fetcher,
    action,
    steps,
    currentFormState,
    setCurrentFormState,
    canContinue = true,
    setCanContinue = () => void 0,
    currentStepId,
    hiddenFields,
    onStepBack,
    onStepChange,
    onContinue,
    onSubmit,
    onCancel,
    onError,
    className,
    ...rest
  } = props;
  warnControlledUsage({ isControlled: true, props });
  const navigate = useNavigate();
  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');

  // Step ID and canContinue logic
  const stepId = currentStepId;

  // Step navigation
  const goToStep = useCallback(
    (targetStepId: string) => {
      if (!steps.find((s) => s.id === targetStepId)) return;
      onStepChange?.(targetStepId);
      void navigate(location.pathname.replace(/(\w{6})(\/\d)?$/, `$1/${targetStepId}`), {
        state: { initiator: 'wizard' },
      });
    },
    [steps, navigate, onStepChange],
  );

  // Step info
  const isFirstStep = stepId === steps[0].id;
  const currentStep = steps.find((s) => s.id === stepId) ?? null;
  const nextStep = steps[steps.findIndex((s) => s.id === stepId) + 1] ?? null;
  const isLastStep = stepId === steps[steps.length - 1].id;

  // Form state
  const uniqueFormId = uuidv4();
  const formMethods = useForm<Record<string, InputValue>>({
    defaultValues: currentFormState,
  });

  // Schema
  const currentStepSchema = useMemo(() => {
    if (!currentStep) return undefined;
    if (currentStep.refineSchema) return currentStep.refineSchema(currentStep.schema, currentFormState);
    return currentStep.schema;
  }, [currentStep, currentFormState]);

  // Input commit
  const commitInputValue = useCallback(
    (fieldName: string) => {
      formMethods.clearErrors(fieldName);
      setCurrentFormState((prev) => ({
        ...prev,
        [fieldName]: formMethods.getValues(fieldName),
      }));
    },
    [formMethods, setCurrentFormState],
  );

  // Input trigger
  const onInputTrigger: ChangeHandler = useCallback(
    (e) => {
      commitInputValue(e.target.name);
      return Promise.resolve();
    },
    [commitInputValue],
  );

  // Register input
  const registerProgressWizardInput: RegisterProgressWizardInput = useCallback(
    <N extends string, T extends TriggerTypes = 'onBlur'>(
      fieldName: N,
      { isRequired, trigger, overrides, translationFunction }: RegisterProgressWizardInputOptions<N, T> = {},
    ): RegisterProgressWizardInputReturn<N> => {
      const req = isRequired ?? true;
      const tr = trigger ?? 'onBlur';
      const o = overrides ?? {};
      const tF = translationFunction ?? ((key) => key.replace('Required', ' required'));
      return {
        ...formMethods.register(fieldName),
        id: fieldName,
        labelText: `${tF(fieldName)}${isRequired ? '*' : ''}`,
        onBlur: tr === 'onBlur' ? onInputTrigger : () => Promise.resolve(),
        onChange: tr === 'onChange' ? onInputTrigger : () => Promise.resolve(),
        ...(req
          ? {
              invalid: !!formMethods.formState.errors?.[fieldName],
              invalidText: tF(`${fieldName}Required`),
            }
          : {}),
        ...o,
      };
    },
    [formMethods, onInputTrigger],
  );

  // Navigation
  const handleBack = useCallback(() => {
    onStepBack?.(stepId);
  }, [onStepBack, stepId]);

  // Primary action
  const handlePrimary = useCallback(
    (action: 'next' | 'submit') => {
      formMethods.clearErrors();
      const values = formMethods.getValues();
      const result = currentStepSchema
        ? currentStepSchema.safeParse(values)
        : ({ success: true, data: values } as const);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          formMethods.setError(String(issue.path[0]), {
            type: 'manual',
            message: issue.message,
          });
        });
        return;
      }
      if (onContinue?.(stepId) === false) {
        console.log('Pre-submit step action stopped us');
        return;
      }
      if (!canContinue) {
        console.error('Cannot continue to next step, button should not have been enabled');
        return;
      }
      if (action === 'next' && nextStep) onContinue ? onContinue() : goToStep(nextStep.id);
      if (action === 'submit') {
        if (onSubmit) onSubmit();
        else {
          const form = document.getElementById(uniqueFormId);
          if (form instanceof HTMLFormElement) form.requestSubmit();
        }
      }
    },
    [onContinue, stepId, uniqueFormId, goToStep, nextStep, canContinue, currentStepSchema, formMethods, onSubmit],
  );

  // Step content
  const stepContent: ProgressWizardStepComponent = useMemo(() => {
    if (!currentStep) return <div />;
    const props: ProgressWizardStepComponentProps = {
      useWizardFormStep: () => {
        const onChange = useCallback(() => {
          setCanContinue(!fetcher?.state || fetcher.state === 'submitting' || fetcher.state === 'loading');
        }, []);
        useEffect(() => {
          onChange();
        }, [onChange]);
        return {
          formMethods,
          currentFormState,
          commitInputValue,
          setCanContinue,
          setHiddenFields: () => {
            console.error(
              'Attempted to set hidden fields in controlled mode, please modify `hiddenFields` prop directly',
            );
          },
          registerProgressWizardInput,
          goToStep,
        };
      },
      usePendingValue: (fieldName) => {
        const [pendingValue, setPendingValue] = useState<InputValue>();
        const applyPendingValue = () => {
          formMethods.setValue(fieldName, pendingValue);
          if (fieldName === 'countryName' && pendingValue !== 'United States') formMethods.setValue('stateName', '');
          commitInputValue(fieldName);
          setPendingValue('');
        };
        return { setPendingValue, applyPendingValue, pendingValue };
      },
    };
    const StepFormProps = {
      formId: uniqueFormId,
      fetcher,
      action,
      schema: currentStepSchema,
    };
    const CurrentStepComponent = currentStep.component
      ? currentStep.component
      : () => (
          <div>
            <h3>No step component found with step ID {currentStep.id} 😢</h3>
          </div>
        );
    const ProgressWizardForm: React.FC<ProgressWizardStepFormProps> = Form;
    return (
      <ProgressWizardForm {...StepFormProps} hiddenFields={hiddenFields ?? []}>
        <CurrentStepComponent {...props} />
      </ProgressWizardForm>
    );
  }, [
    currentStep,
    uniqueFormId,
    fetcher,
    action,
    currentStepSchema,
    hiddenFields,
    formMethods,
    currentFormState,
    commitInputValue,
    setCanContinue,
    registerProgressWizardInput,
    goToStep,
  ]);

  const StepFormProps = {
    formId: uniqueFormId,
    fetcher,
    action,
    schema: currentStepSchema,
  };
  const ProgressWizardForm: React.FC<ProgressWizardStepFormProps> = Form;

  const Footer = useCallback(
    ({ isFirstStep, isLastStep }: { isFirstStep: boolean; isLastStep: boolean }) => {
      if (isFirstStep)
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              type="button"
              className={`${baseClassName}__btn`}
              aria-label="Cancel Wizard"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              onClick={() => handlePrimary('next')}
              className={`${baseClassName}__btn`}
              aria-label="Start Wizard"
              isDisabled={!canContinue}
            >
              {startLabel}
            </Button>
          </>
        );
      else if (isLastStep)
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              onClick={handleBack}
              className={`${baseClassName}__btn`}
              aria-label="Back"
            >
              {backLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              type="submit"
              onClick={() => handlePrimary('submit')}
              className={`${baseClassName}__btn`}
              aria-label="Submit Wizard"
              isDisabled={!canContinue}
            >
              {submitLabel}
            </Button>
          </>
        );
      else
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              onClick={handleBack}
              className={`${baseClassName}__btn`}
              aria-label="Back"
            >
              {backLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              onClick={() => handlePrimary('next')}
              className={`${baseClassName}__btn`}
              aria-label="Continue Wizard"
              isDisabled={!canContinue}
            >
              {continueLabel}
            </Button>
          </>
        );
    },
    [
      backLabel,
      baseClassName,
      canContinue,
      cancelLabel,
      continueLabel,
      handleBack,
      handlePrimary,
      onCancel,
      startLabel,
      submitLabel,
    ],
  );

  return (
    <section {...commonProps} className={classNames(baseClassName, className)} ref={ref} aria-label="Form Wizard">
      <div className={`${baseClassName}__logo`}>
        <Icon icon="PhillipsLogo" height={32} width={120} />
      </div>
      {customHeader}
      <nav aria-label="Progress">
        <ProgressIndicator
          totalSteps={steps.length}
          currentStep={+stepId + 1}
          labels={steps.map((s) => s.label)}
          progressIndicatorAriaLabel="Wizard Progress"
        />
      </nav>
      <div className={`${baseClassName}__content`} aria-labelledby={`wizard-step-label-${stepId}`}>
        <ProgressWizardForm {...StepFormProps} hiddenFields={hiddenFields}>
          {stepContent}
        </ProgressWizardForm>
      </div>
      <div className={`${baseClassName}__footer`}>
        <Footer isFirstStep={isFirstStep} isLastStep={isLastStep} />
      </div>
    </section>
  );
});

ControlledProgressWizard.displayName = 'ControlledProgressWizard';

const UncontrolledProgressWizard = forwardRef<HTMLDivElement, UncontrolledProgressWizardProps>((props, ref) => {
  const {
    customHeader,
    startLabel = 'Start',
    cancelLabel = 'Cancel',
    backLabel = 'Back',
    continueLabel = 'Continue',
    submitLabel = 'Submit',
    fetcher,
    action,
    steps,
    onStepBack,
    onStepChange,
    onContinue,
    onSubmit,
    onCancel,
    onError,
    className,
    ...rest
  } = props;
  warnControlledUsage({ isControlled: false, props });
  const navigate = useNavigate();
  const { className: baseClassName, ...commonProps } = getCommonProps(rest, 'ProgressWizard');
  const { step: paramStep } = useParams();

  // Uncontrolled mode: state is managed internally
  const [internalStepId, setInternalStepId] = useState(paramStep ?? steps[0].id);
  const [internalCanContinue, setInternalCanContinue] = useState(true);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);

  // Step ID and canContinue logic
  const stepId = internalStepId;
  const canContinue = internalCanContinue;
  const setCanContinue = setInternalCanContinue;

  // Step navigation
  const goToStep = useCallback(
    (targetStepId: string) => {
      if (!steps.find((s) => s.id === targetStepId)) return;
      setInternalStepId(targetStepId);
      void navigate(location.pathname.replace(/(\w{6})(\/\d)?$/, `$1/${targetStepId}`), {
        state: { initiator: 'wizard' },
      });
    },
    [steps, navigate],
  );

  // Step info
  const isFirstStep = stepId === steps[0].id;
  const prevStep = steps[steps.findIndex((s) => s.id === stepId) - 1] ?? null;
  const currentStep = steps.find((s) => s.id === stepId) ?? null;
  const nextStep = steps[steps.findIndex((s) => s.id === stepId) + 1] ?? null;
  const isLastStep = stepId === steps[steps.length - 1].id;

  // Form state
  const uniqueFormId = uuidv4();
  const [currentFormState, setCurrentFormState] = useState<Record<string, InputValue>>({});
  const formMethods = useForm<Record<string, InputValue>>({
    defaultValues: currentFormState,
  });

  // Schema
  const currentStepSchema = useMemo(() => {
    if (!currentStep) return undefined;
    if (currentStep.refineSchema) return currentStep.refineSchema(currentStep.schema, currentFormState);
    return currentStep.schema;
  }, [currentStep, currentFormState]);

  // Input commit
  const commitInputValue = useCallback(
    (fieldName: string) => {
      formMethods.clearErrors(fieldName);
      setCurrentFormState((prev) => ({
        ...prev,
        [fieldName]: formMethods.getValues(fieldName),
      }));
    },
    [formMethods],
  );

  // Input trigger
  const onInputTrigger: ChangeHandler = useCallback(
    (e) => {
      commitInputValue(e.target.name);
      return Promise.resolve();
    },
    [commitInputValue],
  );

  // Register input
  const registerProgressWizardInput: RegisterProgressWizardInput = useCallback(
    <N extends string, T extends TriggerTypes = 'onBlur'>(
      fieldName: N,
      { isRequired, trigger, overrides, translationFunction }: RegisterProgressWizardInputOptions<N, T> = {},
    ): RegisterProgressWizardInputReturn<N> => {
      const req = isRequired ?? true;
      const tr = trigger ?? 'onBlur';
      const o = overrides ?? {};
      const tF = translationFunction ?? ((key) => key.replace('Required', ' required'));
      return {
        ...formMethods.register(fieldName),
        id: fieldName,
        labelText: `${tF(fieldName)}${isRequired ? '*' : ''}`,
        onBlur: tr === 'onBlur' ? onInputTrigger : () => Promise.resolve(),
        onChange: tr === 'onChange' ? onInputTrigger : () => Promise.resolve(),
        ...(req
          ? {
              invalid: !!formMethods.formState.errors?.[fieldName],
              invalidText: tF(`${fieldName}Required`),
            }
          : {}),
        ...o,
      };
    },
    [formMethods, onInputTrigger],
  );

  // Navigation
  const handleBack = useCallback(() => {
    goToStep(prevStep?.id);
  }, [goToStep, prevStep?.id]);

  // Primary action
  const handlePrimary = useCallback(
    (action: 'next' | 'submit') => {
      formMethods.clearErrors();
      const values = formMethods.getValues();
      const result = currentStepSchema
        ? currentStepSchema.safeParse(values)
        : ({ success: true, data: values } as const);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          formMethods.setError(String(issue.path[0]), {
            type: 'manual',
            message: issue.message,
          });
        });
        return;
      }
      if (onContinue?.(stepId) === false) {
        console.log('Pre-submit step action stopped us');
        return;
      }
      if (!canContinue) {
        console.error('Cannot continue to next step, button should not have been enabled');
        return;
      }
      if (action === 'next' && nextStep) onContinue ? onContinue() : goToStep(nextStep.id);
      if (action === 'submit') {
        if (onSubmit) onSubmit();
        else {
          const form = document.getElementById(uniqueFormId);
          if (form instanceof HTMLFormElement) form.requestSubmit();
        }
      }
    },
    [onContinue, stepId, uniqueFormId, goToStep, nextStep, canContinue, currentStepSchema, formMethods, onSubmit],
  );

  // Step content
  const stepContent: ProgressWizardStepComponent = useMemo(() => {
    if (!currentStep) return <div />;
    const props: ProgressWizardStepComponentProps = {
      useWizardFormStep: () => {
        const onChange = useCallback(() => {
          setCanContinue(!fetcher?.state || fetcher.state === 'submitting' || fetcher.state === 'loading');
        }, []);
        useEffect(() => {
          onChange();
        }, [onChange]);
        return {
          formMethods,
          currentFormState,
          commitInputValue,
          setCanContinue,
          setHiddenFields,
          registerProgressWizardInput,
          goToStep,
        };
      },
      usePendingValue: (fieldName) => {
        const [pendingValue, setPendingValue] = useState<InputValue>();
        const applyPendingValue = () => {
          formMethods.setValue(fieldName, pendingValue);
          if (fieldName === 'countryName' && pendingValue !== 'United States') formMethods.setValue('stateName', '');
          commitInputValue(fieldName);
          setPendingValue('');
        };
        return { setPendingValue, applyPendingValue, pendingValue };
      },
    };

    const CurrentStepComponent = currentStep.component
      ? currentStep.component
      : () => (
          <div>
            <h3>No step component found with step ID {currentStep.id} 😢</h3>
          </div>
        );

    return <CurrentStepComponent {...props} />;
  }, [
    currentStep,
    fetcher,
    formMethods,
    currentFormState,
    commitInputValue,
    setCanContinue,
    registerProgressWizardInput,
    goToStep,
  ]);

  const StepFormProps = {
    formId: uniqueFormId,
    fetcher,
    action,
    schema: currentStepSchema,
  };

  const ProgressWizardForm: React.FC<ProgressWizardStepFormProps> = Form;
  const Footer = useCallback(
    ({ isFirstStep, isLastStep }: { isFirstStep: boolean; isLastStep: boolean }) => {
      if (isFirstStep)
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              type="button"
              className={`${baseClassName}__btn`}
              aria-label="Cancel Wizard"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              onClick={() => handlePrimary('next')}
              className={`${baseClassName}__btn`}
              aria-label="Start Wizard"
              isDisabled={!canContinue}
            >
              {startLabel}
            </Button>
          </>
        );
      else if (isLastStep)
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              onClick={handleBack}
              className={`${baseClassName}__btn`}
              aria-label="Back"
            >
              {backLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              type="submit"
              onClick={() => handlePrimary('submit')}
              className={`${baseClassName}__btn`}
              aria-label="Submit Wizard"
              isDisabled={!canContinue}
            >
              {submitLabel}
            </Button>
          </>
        );
      else
        return (
          <>
            <Button
              variant={ButtonVariants.secondary}
              onClick={handleBack}
              className={`${baseClassName}__btn`}
              aria-label="Back"
            >
              {backLabel}
            </Button>
            <Button
              variant={ButtonVariants.primary}
              onClick={() => handlePrimary('next')}
              className={`${baseClassName}__btn`}
              aria-label="Continue Wizard"
              isDisabled={!canContinue}
            >
              {continueLabel}
            </Button>
          </>
        );
    },
    [
      backLabel,
      baseClassName,
      canContinue,
      cancelLabel,
      continueLabel,
      handleBack,
      handlePrimary,
      onCancel,
      startLabel,
      submitLabel,
    ],
  );
  return (
    <section {...commonProps} className={classNames(baseClassName, className)} ref={ref} aria-label="Form Wizard">
      <div className={`${baseClassName}__logo`}>
        <Icon icon="PhillipsLogo" height={32} width={120} />
      </div>
      {customHeader}
      <nav aria-label="Progress">
        <ProgressIndicator
          totalSteps={steps.length}
          currentStep={+stepId + 1}
          labels={steps.map((s) => s.label)}
          progressIndicatorAriaLabel="Wizard Progress"
        />
      </nav>
      <div className={`${baseClassName}__content`} aria-labelledby={`wizard-step-label-${stepId}`}>
        <ProgressWizardForm {...StepFormProps} hiddenFields={hiddenFields}>
          {stepContent}
        </ProgressWizardForm>
      </div>
      <div className={`${baseClassName}__footer`}>
        <Footer isFirstStep={isFirstStep} isLastStep={isLastStep} />
      </div>
    </section>
  );
});

UncontrolledProgressWizard.displayName = 'UncontrolledProgressWizard';

// 🤖 Main ProgressWizard wrapper
const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>((props, ref) => {
  if (props.isControlled) {
    // @ts-expect-error Type error if props do not match ControlledProgressWizardProps 🎺TODO
    return <ControlledProgressWizard {...props} ref={ref} />;
  }
  // @ts-expect-error Type error if props do not match UncontrolledProgressWizardProps 🎺TODO
  return <UncontrolledProgressWizard {...props} ref={ref} />;
});

ProgressWizard.displayName = 'ProgressWizard';

export default ProgressWizard;
