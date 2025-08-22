import { useToastContext } from './useToastContext';
import { PrimitiveToastProps as ToastProps } from './Toast';
import { ReactNode, useCallback } from 'react';

export const useToast = () => {
  const { addToast } = useToastContext();
  const toast = useCallback(
    (options: ToastProps | ReactNode) => {
      if (typeof options === 'object' && options !== null && 'title' in options) {
        addToast(options);
      } else {
        addToast({ title: options });
      }
    },
    [addToast],
  );

  return toast;
};
