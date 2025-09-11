import { useForm, FormProvider } from 'react-hook-form';
import { type ReactNode, type FC } from 'react';

/**
 * ProgressWizardFormProvider wraps children in a FormProvider and supplies formMethods via context.
 */

export const ProgressWizardFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const formMethods = useForm();
  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default ProgressWizardFormProvider;