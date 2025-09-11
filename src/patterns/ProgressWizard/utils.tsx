import { type z } from 'zod';
import {
  type HandleContinue,
  type HandleHiddenFields,
  type updateDataToSubmit,
  type ConfigureHandlersForVariant,
  type HandleSubmit,
  type StepSchema,
} from './types';

export const handleHiddenFields: HandleHiddenFields = (allFields, hiddenFields) => {
  allFields.forEach((inputName) => {
    Array.from(document.getElementsByName(inputName))
      .filter((el) => ['input', 'textarea', 'select'].includes(el.tagName.toLowerCase()))
      .forEach((el) => {
        if (hiddenFields.includes(inputName)) {
          el.setAttribute('data-prev', `${el.getAttribute('type')}|${el.getAttribute('tabindex')}`);
          el.setAttribute('type', 'hidden');
          el.setAttribute('aria-hidden', 'true');
          el.setAttribute('tabindex', '-1');
        } else {
          const [prevType, prevTabIndex] = (el.getAttribute('data-prev') ?? '').split('|');
          el.removeAttribute('aria-hidden');
          if (prevType) el.setAttribute('type', prevType);
          if (prevTabIndex) el.setAttribute('tabindex', prevTabIndex);
          el.removeAttribute('data-prev');
        }
      });
  });
};

export const configureHandlersForVariant: ConfigureHandlersForVariant = ({
  incomingHandlers,
  isControlled,
  setDataToSubmit,
  stepForward,
  stepBackward,
  formMethods,
  steps,
  stepId,
}) => {
  const onContinue = incomingHandlers?.onContinue;
  const onCancel = incomingHandlers?.onCancel;
  const onSubmit = incomingHandlers?.onSubmit;
  const onError = incomingHandlers?.onError;
  const extHandleStepPrev = incomingHandlers?.handleStepPrev;
  const extHandleStepNext = incomingHandlers?.handleStepNext;
  const extHandleSubmit = incomingHandlers?.handleSubmit;

  const validateSchema = (schema: StepSchema | z.ZodEffects<StepSchema>) => {
    formMethods.clearErrors();
    const values = formMethods.getValues();
    console.log('val vals', values);
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        console.log(issue, issue.path);
        formMethods.setError(String(issue.path[0]), {
          type: 'manual',
          message: issue.message,
        });
      });
      return false;
    }
    return true;
  };

  const updateDataToSubmit: updateDataToSubmit = (eventOrFieldName) => {
    let fieldName: string;
    if (typeof eventOrFieldName === 'string') {
      fieldName = eventOrFieldName;
    } else {
      fieldName = eventOrFieldName.target.name;
    }
    if (!setDataToSubmit) {
      console.error('[useHandlers] setDataToSubmit is required for form submission. Handlers received:', {
        onContinue,
        onCancel,
        onSubmit,
        onError,
        extHandleStepPrev,
        extHandleStepNext,
        extHandleSubmit,
      });
      throw new Error('setDataToSubmit is required for form submission');
    }
    setDataToSubmit((prev) => ({
      ...prev,
      [fieldName]: formMethods.getValues(fieldName),
    }));
  };

  const handleContinue: HandleContinue = () => {
    if (onContinue && onContinue?.() === false) {
      console.log('[useHandlers] onContinue said no continuing');
      return;
    }
    if (isControlled) {
      if (extHandleStepNext) extHandleStepNext();
      else console.warn('No handleStepNext handler provided');
    } else {
      const schema = steps.find((s) => s.id === stepId)?.schema;
      const parseSuccess = schema ? validateSchema(schema) : true; // 🎺TODO don't like this
      if (parseSuccess) stepForward();
    }
  };

  const handleSubmit: HandleSubmit = (formId) => {
    if (onContinue?.() === false) {
      console.log('[useHandlers] onContinue said no continuing');
      return;
    }
    if (isControlled) {
      if (onSubmit) onSubmit();
      if (extHandleSubmit) extHandleSubmit();
      else console.error('No handleSubmit handler provided');
    } else {
      const schema = steps.find((s) => s.id === stepId)?.schema;
      const parseSuccess = schema ? validateSchema(schema) : true;
      if (parseSuccess) stepForward();

      if (onSubmit) {
        onSubmit();
      }
      if (!formId) {
        console.error('[useHandlers] formId is required for form element submission');
        return;
      }
      const form = document.getElementById(formId);
      if (form instanceof HTMLFormElement) form.requestSubmit();
    }
  };
  const handleBack = () => {
    if (isControlled) {
      if (extHandleStepPrev) extHandleStepPrev();
      else console.error('No handleStepPrev handler provided, cannot go back to previous step');
    } else {
      stepBackward();
    }
  };
  const handleCancel = () => {
    if (isControlled) {
      if (onCancel) onCancel();
      else console.error('No onCancel handler provided, cannot cancel');
    } else {
      console.error('No handleCancel handler provided, just sending user back');
      window.history.back();
    }
  };
  return {
    handleStepPrev: isControlled ? extHandleStepPrev : undefined,
    handleStepNext: isControlled ? extHandleStepNext : undefined,
    handleSubmit,
    updateDataToSubmit,
    handleContinue,
    handleBack,
    handleCancel,
    onContinue,
    onSubmit,
    onCancel,
    onError,
  };
};

export default configureHandlersForVariant;
