
import { useState } from 'react';
import { type PathValue, useFormContext, type FieldValues, type Path } from 'react-hook-form';

/**
 * Return type for the usePendingValue hook.
 * @template T - The form shape as key value pairs
 * @property setPendingValue - Setter for the pending value (call this to stage a value)
 * @property applyPendingValue - Call this to commit the pending value to the form field
 * @property pendingValue - The currently staged value (or undefined if none)
 *
 * @example
 * const { setPendingValue, applyPendingValue, pendingValue } = usePendingValue('country');
 */
export type UsePendingValueReturn<T extends FieldValues> = {
  setPendingValue: React.Dispatch<React.SetStateAction<PathValue<T, Path<T>> | undefined>>;
  applyPendingValue: () => void;
  pendingValue: PathValue<T, Path<T>> | undefined;
};

/**
 * Hook for managing a value that is staged (pending) but not yet committed to its form field.
 *
 * Useful for scenarios where you want to let the user preview or confirm a value before it is actually set in the form.
 *
 * @template T - The form shape as key value pairs
 * @param fieldName - The name of the field to manage
 * @param additionalAction - Optional callback to run after applying the value (return false to prevent clearing pending
 *   value so that applying can be re-attempted)
 * @returns {UsePendingValueReturn<T>} - Object with setPendingValue, applyPendingValue, and pendingValue
 *
 * @example
 * // Stage a value and commit it on button click
 * const { setPendingValue, applyPendingValue, pendingValue } = usePendingValue('country');
 * setPendingValue('US');
 * // ...
 * <button onClick={applyPendingValue}>Apply</button>
 */
export const usePendingValue = <T extends FieldValues>(
  fieldName: Path<T>,
  additionalAction?: () => void | false // e.g., resetting a state value when the user deselects US
): UsePendingValueReturn<T> => {
  const formMethods = useFormContext<T>();
  const [pendingValue, setPendingValue] = useState<PathValue<T, Path<T>> | undefined>();
  const applyPendingValue = () => {
    if (pendingValue) formMethods.setValue(fieldName, pendingValue);
    else console.error('usePendingValue', 'Cannot apply pending value when none has been set via `setPendingValue`');
    if (additionalAction && additionalAction() === false) return;
    setPendingValue(undefined);
  };
  return { setPendingValue, applyPendingValue, pendingValue };
};
