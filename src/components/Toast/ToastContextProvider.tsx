import * as ToastPrimitive from '@radix-ui/react-toast';
import { type PropsWithChildren, createContext, useCallback, useState } from 'react';
import Toast from './Toast';
import { px } from '../../utils';

interface Toast extends ToastPrimitive.ToastProps {
  id: string;
  title?: string;
  description?: string;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

/**
 * Context for managing toast notifications
 */
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Provider component that manages toast notifications state and operations
 */
export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast notification
   */
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString();
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
            title={toast.title || ''}
            onOpenChange={(open) => !open && removeToast(toast.id)}
          />
        ))}
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
