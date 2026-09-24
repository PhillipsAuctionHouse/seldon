import { RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

/**
 * `useOnClickOutside` from usehooks-ts still types its ref as the pre-React-19
 * `RefObject<T>`, which a `useRef<T>(null)` (now `RefObject<T | null>`) cannot
 * satisfy. The hook already handles a null `current` at runtime, so the cast is
 * sound; it lives here once instead of at every call site. Remove when
 * usehooks-ts accepts nullable refs.
 */
export const useOnClickOutsideRef = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: Parameters<typeof useOnClickOutside>[1],
) => {
  useOnClickOutside(ref as RefObject<T>, handler);
};
