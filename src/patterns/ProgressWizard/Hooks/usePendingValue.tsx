
import { useState } from 'react';
import { type PathValue, useFormContext, type FieldValues, type Path } from 'react-hook-form';

export type UsePendingValueReturn<T extends FieldValues> = {
  setPendingValue: React.Dispatch<React.SetStateAction<PathValue<T, Path<T>> | undefined>>;
  applyPendingValue: () => void;
  pendingValue: PathValue<T, Path<T>> | undefined;
};

export const usePendingValue = <T extends FieldValues>(
  fieldName: Path<T>,
  additionalAction?: () => void | false // e.g., resetting a state value when the user deselects US
): UsePendingValueReturn<T> => {
  const formMethods = useFormContext<T>();
  const [pendingValue, setPendingValue] = useState<PathValue<T, Path<T>> | undefined>();
  const applyPendingValue = () => {
    if (pendingValue) formMethods.setValue(fieldName, pendingValue);
    else console.error('Cannot apply pending value when none has been set via `setPendingValue`');
    if (additionalAction && additionalAction() === false) return;
    setPendingValue(undefined);
  };
  return { setPendingValue, applyPendingValue, pendingValue };
};
