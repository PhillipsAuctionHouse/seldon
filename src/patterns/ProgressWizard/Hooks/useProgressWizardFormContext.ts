import { createContext, useContext } from 'react';
import { type FormStateManagement } from '../types';

export const WizardFormContext = createContext<FormStateManagement | undefined>(undefined);

export const useProgressWizardFormContext = (): FormStateManagement => {
  const ctx = useContext(WizardFormContext);
  if (!ctx) throw new Error('useProgressWizardFormContext must be used within a ProgressWizardContextProvider');
  return ctx;
};
