import { useToastContext } from './useToastContext';
import { PrimitiveToastProps as ToastProps } from './Toast';
import { ReactNode } from 'react';

export const useToast = () => {
  const { addToast } = useToastContext();
  const toast = (options: ToastProps | ReactNode) => {
    if (typeof options === 'object' && options !== null && 'title' in options) {
      addToast(options);
    } else {
      addToast({ title: options });
    }
  };

  return toast;
};
