import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';
import Icon from '../../components/Icon/Icon';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider, useForm, Form, type ChangeHandler } from 'react-hook-form';
import { useParams } from 'react-router';
import {
  type ProgressWizardStepComponentProps,
  type InputValue,
  type ProgressWizardProps,
  type RegisterProgressWizardInputOptions,
  type TriggerTypes,
  type RegisterProgressWizardInput,
  type RegisterProgressWizardInputReturn,
  type ProgressWizardStepComponent,
  type SetCanContinue,
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
      onStepBack,
      onStepChange,
      onStepSubmit: preSubmitStepAction,
      onSubmit,
      onCancel,
      onError,
      className,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ProgressWizard');
    const { step: paramStep } = useParams(); // 🎺TODO can't use this hook, don't have the library. prop?
    const [stepId, setStepId] = useState(externalStepId ?? paramStep ?? steps[0].id); // step is always kept as a string for future compatibility with non-numeric step IDs
    const isControlled = externalStepId !== undefined; // a tad redundant, but it makes for a better brain model

    const [internalCanContinue, internalSetCanContinue]: [boolean, SetCanContinue<'internal'>] = useState<boolean>(
      externalCanContinue ?? true,
    );

    if (isControlled && +!externalSetCanContinue ^ +(externalCanContinue === undefined)) {
      console.error(
        '<ProgressWizard /> is in a controlled state but is missing a `setCanContinue` prop or `canContinue` is undefined. It can be missing both to let the Wizard control it, or it can have both so you can externally control it.',
      );
    }

    const [canContinue, setCanContinue] = isControlled
      ? [externalCanContinue ?? true, externalSetCanContinue ?? (() => void 0)]
      : [internalCanContinue, internalSetCanContinue];

    const isFirstStep = stepId === steps[0].id;
    const prevStep = steps[steps.findIndex((s) => s.id === stepId) - 1] ?? null;
    const currentStep = steps.find((s) => s.id === stepId) ?? null;
    const nextStep = steps[steps.findIndex((s) => s.id === stepId) + 1] ?? null;
    const isLastStep = stepId === steps[steps.length - 1].id;

    const currentStepSchema = useMemo(() => {
      if (!currentStep) return undefined;
      if (currentStep.refineSchema) return currentStep.refineSchema(currentStep.schema, currentFormState);
      else return currentStep.schema;
    }, [currentStep, currentFormState]);
    const uniqueFormId = uuidv4();

    const formMethods = useForm<Record<string, InputValue>>({
      defaultValues: currentFormState,
    });

    useEffect(() => {
      if (isControlled) setStepId(externalStepId);
    }, [externalStepId, isControlled]);

    const goToStep = useCallback(
      (targetStepId: string) => {
        if (!steps.find((s) => s.id === targetStepId)) return;
        if (isControlled) {
          onStepChange?.(targetStepId);
        }

        // 🎺TODO i do not like this sam i am
        window.history.pushState({}, '', location.pathname.replace(/([\w\d]{6})(\/\d)?$/, `$1/${targetStepId}`));

        setStepId(targetStepId);
      },
      [steps, isControlled, onStepChange],
    );

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

    const onInputTrigger: ChangeHandler = useCallback(
      (e) => {
        commitInputValue(e.target.name);
        return Promise.resolve();
      },
      [commitInputValue],
    );

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

    const handleBack = useCallback(() => {
      if (onStepBack) onStepBack(stepId);
      goToStep(prevStep?.id);
    }, [onStepBack, stepId, goToStep, prevStep?.id]);

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

        if (preSubmitStepAction?.(stepId) === false) {
          console.log('Pre-submit step action stopped us');
          return;
        }
        if (!canContinue) {
          console.error('Cannot continue to next step, button should not have been enabled');
          return;
        }

        if (action === 'next' && nextStep) goToStep(nextStep.id);
        if (action === 'submit') {
          const form = document.getElementById(uniqueFormId);
          if (form instanceof HTMLFormElement) form.requestSubmit();
        }
      },
      [preSubmitStepAction, stepId, uniqueFormId, goToStep, nextStep, canContinue, currentStepSchema, formMethods],
    );

    // we only need one child at a time, and that child needs the unique form ID. and `goToStep` if that child needs to hop around
    const [hiddenFields, setHiddenFields] = useState<string[]>([]); // 🎺TODO i'd love to restrict to real form field names

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
