import * as ToastPrimitive from '@radix-ui/react-toast';
import { type PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import Toast, { type PrimitiveToastProps } from './Toast';
import { v4 as uuidv4 } from 'uuid';
import { px } from '../../utils';

interface Toast extends PrimitiveToastProps {
  id: string;
}

/**
 * Extra distance (px) added to the toast viewport's default bottom-left spacing.
 */
export interface ToastOffset {
  x: number;
  y: number;
}

const DEFAULT_TOAST_OFFSET: ToastOffset = { x: 0, y: 0 };

export interface ToastProviderProps extends PropsWithChildren {
  /**
   * Initial viewport offset (px). Mount-only — use `useToast().setOffset` for later updates.
   *
   * @example
   * <ToastProvider offset={{ x: 16, y: 24 }}>...</ToastProvider>
   */
  offset?: ToastOffset;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setOffset: (offset: ToastOffset) => void;
}

/**
 * Context for managing toast notifications
 */
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Provider component that manages toast notifications state and operations
 */
export const ToastProvider = ({ children, offset = DEFAULT_TOAST_OFFSET }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [viewportOffset, setViewportOffset] = useState<ToastOffset>(offset);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      setOffset: setViewportOffset,
    }),
    [toasts, addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider>
        {children}
        <ToastPrimitive.Viewport
          className={`${px}-toast-viewport`}
          style={{ bottom: viewportOffset.y, left: viewportOffset.x }}
        />
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
