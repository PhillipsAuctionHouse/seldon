import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockMatchMedia } from './testUtils';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  it('returns true when the reduced motion media query matches', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it('returns false when the reduced motion media query does not match', () => {
    mockMatchMedia({});

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });
});
