import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
import Icon from '../../components/Icon/Icon';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider, useForm, Form, type ChangeHandler } from 'react-hook-form';
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

const ProgressWizard = forwardRef<HTMLDivElement, ProgressWizardProps>(
  (
    {
      customHeader,
      startLabel = 'Start',
      cancelLabel = 'Cancel',
      backLabel = 'Back',
      continueLabel = 'Continue',
      submitLabel = 'Submit',
      fetcher,
      action,
      steps,
      currentFormState = {},
      setCurrentFormState,
      canContinue: externalCanContinue,
      setCanContinue: externalSetCanContinue,
      currentStepId: externalStepId,
      hiddenFields: externalHiddenFields,
      onStepBack,
      onStepChange,
      onContinue,
      onSubmit,
      onCancel,
      onError,
      className,
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');
    const { step: paramStep } = useParams();

    // Controlled mode: all state is managed externally
    const isControlled = externalStepId !== undefined;

    // Uncontrolled mode: state is managed internally
    const [internalStepId, setInternalStepId] = useState(paramStep ?? steps[0].id);
    const [internalCanContinue, setInternalCanContinue] = useState(true);
    const [hiddenFields, setHiddenFields] = useState<string[]>([]);

    // Step ID and canContinue logic
    const stepId = isControlled ? externalStepId : internalStepId;
    const canContinue = isControlled ? (externalCanContinue ?? true) : internalCanContinue;
    const setCanContinue = useMemo(
      () => (isControlled ? (externalSetCanContinue ?? (() => void 0)) : setInternalCanContinue),
      [isControlled, externalSetCanContinue, setInternalCanContinue],
    );

    // Step navigation
    const goToStep = useCallback(
      (targetStepId: string) => {
        if (!steps.find((s) => s.id === targetStepId)) return;
        if (isControlled) {
          onStepChange?.(targetStepId);
        } else {
          setInternalStepId(targetStepId);
        }
        void navigate(location.pathname.replace(/([\w\d]{6})(\/\d)?$/, `$1/${targetStepId}`), { state: { initiator: 'wizard' } });
      },
      [steps, isControlled, navigate, onStepChange],
    );

    // Step info
    const isFirstStep = stepId === steps[0].id;
    const prevStep = steps[steps.findIndex((s) => s.id === stepId) - 1] ?? null;
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
        setCurrentFormState?.((prev) => ({
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
      if (isControlled) onStepBack?.(stepId);
      else goToStep(prevStep?.id);
    }, [isControlled, onStepBack, stepId, goToStep, prevStep?.id]);

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
            setHiddenFields: !isControlled
              ? setHiddenFields
              : () => {
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
        <ProgressWizardForm {...StepFormProps} hiddenFields={hiddenFields}>
          <CurrentStepComponent {...props} />
        </ProgressWizardForm>
      );
    }, [currentStep, uniqueFormId, fetcher, action, currentStepSchema, hiddenFields, formMethods, currentFormState, commitInputValue, setCanContinue, isControlled, registerProgressWizardInput, goToStep]);

    return (
      <FormProvider {...formMethods}>
        <div
          {...commonProps}
          className={classNames(baseClassName, className)}
          ref={ref}
          role="region"
          aria-label="Form Wizard"
        >
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
          <div className={`${baseClassName}__content`} role="group" aria-labelledby={`wizard-step-label-${stepId}`}>
            {stepContent}
          </div>
          <div className={`${baseClassName}__footer`}>
            {isFirstStep ? (
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
            ) : isLastStep ? (
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
            ) : (
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
            )}
          </div>
        </div>
      </FormProvider>
    );
  },
);

ProgressWizard.displayName = 'ProgressWizard';

export default ProgressWizard;
