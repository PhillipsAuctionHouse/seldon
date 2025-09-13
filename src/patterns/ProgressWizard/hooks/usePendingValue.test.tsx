import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { usePendingValue } from './usePendingValue';
import { renderHook, waitFor, act } from '@testing-library/react';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('usePendingValue', () => {
  it('should initialize with undefined pendingValue', () => {
    const { result } = renderHook(() => usePendingValue('field'), { wrapper });
    expect(result.current.pendingValue).toBeUndefined();
  });

  it('should set pendingValue', async () => {
    const { result, rerender } = renderHook(() => usePendingValue('field'), { wrapper });
    act(() => {
      result.current.setPendingValue('SuperBass');
    });
    rerender();
    await waitFor(() => {
      expect(result.current.pendingValue).toBe('SuperBass');
    });
  });

  it('should clear pendingValue after apply', async () => {
    const { result, rerender } = renderHook(() => usePendingValue('field'), { wrapper });
    act(() => {
      result.current.setPendingValue('Moment4Life');
    });
    act(() => {
      result.current.applyPendingValue();
    });
    rerender();
    await waitFor(() => {
      expect(result.current.pendingValue).toBeUndefined();
    });
  });

  it('should not clear pendingValue if additionalAction returns false', async () => {
    const { result, rerender } = renderHook(() => usePendingValue('field', () => false), { wrapper });
    act(() => {
      result.current.setPendingValue('Anaconda');
    });
    act(() => {
      result.current.applyPendingValue();
    });
    rerender();
    await waitFor(() => {
      expect(result.current.pendingValue).toBe('Anaconda');
    });
  });

  it('should call additionalAction after apply', async () => {
    const mockAction = vi.fn();
    const { result, rerender } = renderHook(() => usePendingValue('field', mockAction), { wrapper });
    act(() => {
      result.current.setPendingValue('ChunLi');
    });
    act(() => {
      result.current.applyPendingValue();
    });
    rerender();
    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled();
    });
  });

  it('should log error if applyPendingValue called with no pendingValue', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    const { result } = renderHook(() => usePendingValue('field'), { wrapper });
    result.current.applyPendingValue();
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        'usePendingValue',
        'Cannot apply pending value when none has been set via `setPendingValue`',
      );
    });
    errorSpy.mockRestore();
  });
});
