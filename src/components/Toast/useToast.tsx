import { useToastContext } from './useToastContext';
import { PrimitiveToastProps as ToastProps } from './Toast';

export const useToast = () => {
  const { addToast } = useToastContext();
  const toast = (options: ToastProps | string) => {
    const config = typeof options === 'string' ? { title: options } : options;
    addToast({ ...config });
  };

  return toast;
};
