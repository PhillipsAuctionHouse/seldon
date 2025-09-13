import { type FC, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { useForm, FormProvider, FieldError } from 'react-hook-form';
import useProgressWizardForm from './useProgressWizardForm';
import { renderHook } from '@testing-library/react';

const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('useProgressWizardForm', () => {
  it('should return registerProgressWizardInput function', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    expect(typeof result.current.registerProgressWizardInput).toBe('function');
  });

  it('should register field with default options', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    const props = result.current.registerProgressWizardInput('language', {});
    expect(props.id).toBe('0.language');
    expect(props.labelText).toBe('Language*');
    expect(props.invalid).toBe(false);
    expect(props.invalidText).toMatch(/language required/i);
  });

  it('should use displayName if provided', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    const props = result.current.registerProgressWizardInput('Bees', { displayName: 'Bees!' });
    expect(props.labelText).toBe('Bees!*');
  });

  it('should use translationFunction if provided', () => {
    const translationFunction = (key: string) => (key === 'TruffleButter' ? 'Truffle Butter Label' : undefined);
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    const props = result.current.registerProgressWizardInput('TruffleButter', { translationFunction });
    expect(props.labelText).toBe('Truffle Butter Label*');
  });

  it('should use stepId for namespacing', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    const props = result.current.registerProgressWizardInput('FormFodder', {}, '2');
    expect(props.id).toBe('2.FormFodder');
  });

  it('should override props if overrides provided', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper });
    const props = result.current.registerProgressWizardInput('input!!', { overrides: { 'aria-label': 'test' } });
    expect(props['aria-label']).toBe('test');
  });

  it('should set invalid and invalidText if error present', () => {
    const wrapperWithError: FC<{ children: ReactNode }> = ({ children }) => {
      const methods = useForm();
      methods.formState.errors = { '0': { name: { message: 'name error' } as FieldError } }; // 🎺TODO why is this assertion necessary?
      return <FormProvider {...methods}>{children}</FormProvider>;
    };
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: wrapperWithError });
    const props = result.current.registerProgressWizardInput('name', {});
    expect(props.invalid).toBe(true);
    expect(props.invalidText).toBe('name error');
  });

  it('should use translationFunction for required error', () => {
    const translationFunction = (key: string) => (key === 'ageRequired' ? 'Age is required' : undefined);
    const wrapperWithError: FC<{ children: ReactNode }> = ({ children }) => {
      const methods = useForm();
      methods.formState.errors = { '0': { age: { message: undefined } } };
      return <FormProvider {...methods}>{children}</FormProvider>;
    };
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: wrapperWithError });
    const props = result.current.registerProgressWizardInput('age', { translationFunction });
    expect(props.invalidText).toBe('age is required');
  });
});
