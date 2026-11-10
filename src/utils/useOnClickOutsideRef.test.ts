import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useOnClickOutsideRef } from './useOnClickOutsideRef';

describe('useOnClickOutsideRef', () => {
  // L3-16596: re-adding the window listener on every render meant a re-render during one mousedown
  // (another ComboBox calling onChange) dropped this listener for that click, so its dropdown stayed open.
  it('keeps one window mousedown listener across re-renders', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const countMousedown = (spy: typeof add) => spy.mock.calls.filter(([type]) => type === 'mousedown').length;

    const { rerender } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      // A new handler every render, as ComboBox passes
      useOnClickOutsideRef(ref, () => undefined);
    });
    rerender();
    rerender();

    expect(countMousedown(add)).toBe(1);
    expect(countMousedown(remove)).toBe(0);
  });
});
