import { createContext } from 'react';
import type { ToastContextType } from './ToastContextProvider';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
