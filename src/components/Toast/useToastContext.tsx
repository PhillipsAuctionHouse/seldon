import { useContext } from 'react';
import { ToastContext, ToastContextType } from './ToastContextProvider';
export const fallbackContext: ToastContextType = {
  toasts: [],
  addToast: () => void 0,
  removeToast: () => void 0,
};

/**
 * Custom hook to access the toast context
 * Returns fallback context if used outside provider
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    console.warn('useToastContext must be used within a ToastProvider');
    return fallbackContext;
  }

  return context;
};
