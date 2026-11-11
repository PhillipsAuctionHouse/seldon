import { RefObject } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

// usehooks-ts defaults these options to a new `{}` each render, which makes its
// useEventListener remove and re-add the window listener on every render. A render
// between two listeners of the same mousedown then skips the re-added one.
const LISTENER_OPTIONS: AddEventListenerOptions = {};

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
  useOnClickOutside(ref as RefObject<T>, handler, 'mousedown', LISTENER_OPTIONS);
};
