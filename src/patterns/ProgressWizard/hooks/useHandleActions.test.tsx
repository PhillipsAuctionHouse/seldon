import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHandleActions } from './useHandleActions';
import { z } from 'zod';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { FormStep } from '../types';

const getFormMethods = (defaultValues?: FieldValues): UseFormReturn<FieldValues> => {
  const { result } = renderHook(() => useForm({ defaultValues }));
  return result.current;
};

describe('useHandleActions', () => {
  const step: FormStep = {
    id: 'step1',
    label: 'Step 1',
    schema: z.object({ name: z.string() }),
    componentFactory: () => <div />,
  };
  const formId = 'test-form-id';

  it('calls onContinue and advances step', async () => {
    const onContinue = vi.fn(() => true);
    const setLoadingState = vi.fn();
    const setCurrentStepIndexHandler = vi.fn();
    const formMethods = getFormMethods({ step1: { name: 'Nicki' } });
    const getIsValid = vi.fn(() => Promise.resolve(true));
    const { result } = renderHook(() =>
      useHandleActions({
        isFirstStep: false,
        isLastStep: false,
        formMethods,
        setLoadingState,
        onContinue,
        onBack: undefined,
        onCancel: undefined,
        onFormSubmit: undefined,
        onError: undefined,
        getIsValid,
        setCurrentStepIndexHandler,
        currentStep: step,
        formId,
      }),
    );
    await act(async () => {
      await result.current.handleContinue();
    });
    expect(onContinue).toHaveBeenCalled();
    expect(setCurrentStepIndexHandler).toHaveBeenCalled();
    expect(setLoadingState).toHaveBeenCalledWith('submitting');
  });

  it('calls onBack and goes back a step', () => {
    const onBack = vi.fn(() => true);
    const setCurrentStepIndexHandler = vi.fn();
    const formMethods = getFormMethods();
    const { result } = renderHook(() =>
      useHandleActions({
        isFirstStep: false,
        isLastStep: false,
        formMethods,
        setLoadingState: vi.fn(),
        onContinue: undefined,
        onBack,
        onCancel: undefined,
        onFormSubmit: undefined,
        onError: undefined,
        getIsValid: vi.fn(),
        setCurrentStepIndexHandler,
        currentStep: step,
        formId,
      }),
    );
    act(() => {
      result.current.handleBack();
    });
    expect(onBack).toHaveBeenCalled();
    expect(setCurrentStepIndexHandler).toHaveBeenCalled();
  });

  it('calls onCancel and triggers cancel logic', () => {
    const onCancel = vi.fn();
    const formMethods = getFormMethods();
    const { result } = renderHook(() =>
      useHandleActions({
        isFirstStep: false,
        isLastStep: false,
        formMethods,
        setLoadingState: vi.fn(),
        onContinue: undefined,
        onBack: undefined,
        onCancel,
        onFormSubmit: undefined,
        onError: undefined,
        getIsValid: vi.fn(),
        setCurrentStepIndexHandler: vi.fn(),
        currentStep: step,
        formId,
      }),
    );
    act(() => {
      result.current.handleCancel();
    });
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onFormSubmit and handles submit', async () => {
    const onFormSubmit = vi.fn();
    const setLoadingState = vi.fn();
    const formMethods = getFormMethods({ step1: { name: 'Nicki' } });
    const getIsValid = vi.fn(() => Promise.resolve(true));
    const { result } = renderHook(() =>
      useHandleActions({
        isFirstStep: false,
        isLastStep: true,
        formMethods,
        setLoadingState,
        onContinue: undefined,
        onBack: undefined,
        onCancel: undefined,
        onFormSubmit,
        onError: undefined,
        getIsValid,
        setCurrentStepIndexHandler: vi.fn(),
        currentStep: step,
        formId,
      }),
    );
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onFormSubmit).toHaveBeenCalled();
    expect(setLoadingState).toHaveBeenCalledWith('submitting');
  });
});
