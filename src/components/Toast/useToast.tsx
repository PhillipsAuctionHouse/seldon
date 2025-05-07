import { ReactNode } from 'react';
import { useToastContext } from './useToastContext';

interface ToastOptions {
  title: string;
  action?: ReactNode;
}

export const useToast = () => {
  const { addToast } = useToastContext();
  const toast = (options: ToastOptions | string) => {
    const config = typeof options === 'string' ? { title: options } : options;
    addToast({ ...config });
  };

  return toast;
};
