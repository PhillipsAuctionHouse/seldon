import { type FC, type ReactNode, useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import useProgressWizardForm from './useProgressWizardForm';
import { renderHook } from '@testing-library/react';

beforeEach(() => {
  vi.resetModules();
  vi.unmock('react-hook-form');
});
const useWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('useProgressWizardForm', () => {
  it('should return registerProgressWizardInput function', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    expect(typeof result.current.registerProgressWizardInput).toBe('function');
  });

  it('should register field with default options', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    const props = result.current.registerProgressWizardInput('language', {});
    expect(props.id).toBe('0.language');
    expect(props.labelText).toBe('Language*');
    expect(props.invalid).toBe(false);
    expect(props.invalidText).toMatch(/language required/i);
  });

  it('should use displayName if provided', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    const props = result.current.registerProgressWizardInput('Bees', { displayName: 'Bees!' });
    expect(props.labelText).toBe('Bees!*');
  });

  it('should use translationFunction if provided', () => {
    const translationFunction = (key: string) => (key === 'TruffleButter' ? 'Truffle Butter Label' : undefined);
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    const props = result.current.registerProgressWizardInput('TruffleButter', { translationFunction });
    expect(props.labelText).toBe('Truffle Butter Label*');
  });

  it('should use stepId for namespacing', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    const props = result.current.registerProgressWizardInput('FormFodder', {}, '2');
    expect(props.id).toBe('2.FormFodder');
  });

  it('should override props if overrides provided', () => {
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapper });
    const props = result.current.registerProgressWizardInput('input!!', { overrides: { 'aria-label': 'test' } });
    expect(props['aria-label']).toBe('test');
  });

  it('should set invalid and invalidText if error present', () => {
    vi.mock('react-hook-form', async () => ({
      ...(await vi.importActual('react-hook-form')),
      useFormContext: () => ({
        register: () => ({}),
        formState: {
          errors: {
            '0': {
              name: { message: 'name error' },
            },
          },
        },
      }),
    }));

    const { result } = renderHook(() => useProgressWizardForm());
    const props = result.current.registerProgressWizardInput('name', {});
    expect(props.invalid).toBe(true);
    expect(props.invalidText).toBe('name error');
  });

  it('should use translationFunction for required error', () => {
    const translationFunction = (key: string) => (key === 'ageRequired' ? 'Age is required' : undefined);
    const useWrapperWithError: FC<{ children: ReactNode }> = ({ children }) => {
      const methods = useForm();
      useEffect(() => {
        methods.setError('0.age', { type: 'manual', message: undefined });
      }, [methods]);
      return <FormProvider {...methods}>{children}</FormProvider>;
    };
    const { result } = renderHook(() => useProgressWizardForm(), { wrapper: useWrapperWithError });
    const props = result.current.registerProgressWizardInput('age', { translationFunction });
    expect(props.invalidText).toBe('Age is required');
  });
});
