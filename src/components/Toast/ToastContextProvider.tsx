import * as ToastPrimitive from '@radix-ui/react-toast';
import { type PropsWithChildren, useCallback, useState } from 'react';
import { ToastContext } from './ToastContext';
import Toast, { PrimitiveToastProps } from './Toast';
import { v4 as uuidv4 } from 'uuid';
import { px } from '../../utils';

interface Toast extends PrimitiveToastProps {
  id: string;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

/**
 * Provider component that manages toast notifications state and operations
 */
export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast notification
   */
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  /**
   * Removes a toast notification by ID
   */
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider>
        {children}
        <ToastPrimitive.Viewport className={`${px}-toast-viewport`} />
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onOpenChange={(open) => !open && removeToast(toast.id)}
            title={toast.title ?? ''}
          />
        ))}
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
