import { useToastContext } from './useToastContext';
import { type PrimitiveToastProps as ToastProps } from './Toast';
import { type ToastOffset } from './ToastContextProvider';
import { type ReactNode, useCallback } from 'react';

export type ToastFn = ((options: ToastProps | ReactNode) => void) & {
  /** Same as calling the toast function — for `const { show, setOffset } = useToast()`. */
  show: (options: ToastProps | ReactNode) => void;
  /**
   * Updates the toast viewport offset from the bottom-left corner.
   * Values are pixels added to the existing viewport spacing.
   */
  setOffset: (offset: ToastOffset) => void;
};

/**
 * Trigger toasts and update viewport offset.
 *
 * @example
 * const toast = useToast();
 * toast('Saved');
 * toast.setOffset({ x: 0, y: 24 });
 *
 * @example
 * const { show, setOffset } = useToast();
 * show('Saved');
 * setOffset({ x: 0, y: 24 });
 */
export const useToast = (): ToastFn => {
  const { addToast, setOffset } = useToastContext();

  const show = useCallback(
    (options: ToastProps | ReactNode) => {
      if (typeof options === 'object' && options !== null && 'title' in options) {
        addToast(options);
      } else {
        addToast({ title: options });
      }
    },
    [addToast],
  );

  return Object.assign(show, { show, setOffset });
};
