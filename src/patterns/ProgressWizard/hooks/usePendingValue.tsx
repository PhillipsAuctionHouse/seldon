import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { type PathValue, useFormContext, type FieldValues, type Path } from 'react-hook-form';

/**
 * Represents a staged (pending) value for a form field.
 *
 * @template FormShape - The shape of the form's values.
 * @type PathValue<FormShape, Path<FormShape>> | undefined
 *
 * This type is used to temporarily hold a value before it is committed to the form.
 * If no value is staged, it will be undefined.
 *
 * @remarks `PathValue` is remix-hook-form's utility type for getting
 *   the value type at a given path in the form. The first param is the form
 *   shape, the second is the string path to the field (e.g. 'step1.firstName').
 */

export type PendingValue<FormShape> = PathValue<FormShape, Path<FormShape>> | undefined;

/**
 * Return type for the usePendingValue hook.
 * @template FormShape - The form shape as key value pairs
 * @property setPendingValue - Setter for the pending value (call this to stage a value)
 * @property applyPendingValue - Call this to commit the pending value to the form field
 * @property pendingValue - The currently staged value (or undefined if none)
 *
 * @example
 * const { setPendingValue, applyPendingValue, pendingValue } = usePendingValue('country');
 */
export type UsePendingValueReturn<FormShape extends FieldValues> = {
  setPendingValue: Dispatch<SetStateAction<PendingValue<FormShape>>>;
  applyPendingValue: () => void;
  pendingValue: PendingValue<FormShape>;
};

/**
 * Hook for managing a value that is staged (pending) but not yet committed to its form field.
 *
 * Useful for scenarios where you want to let the user preview or confirm a value before it is actually set in the form.
 *
 * @template T - The form shape as key value pairs
 * @param fieldName - The name of the field to manage
 * @param additionalAction - Optional callback to run after applying the value (return false to prevent clearing pending
 *   value so that applying can be re-attempted). Useful for things like resetting a state value when the user deselects US
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
  additionalAction?: () => void | false,
): UsePendingValueReturn<T> => {
  const formMethods = useFormContext<T>();
  const [pendingValue, setPendingValueState] = useState<PendingValue<T>>();
  const pendingValueRef = useRef<PendingValue<T>>(pendingValue);

  // Keep ref in sync with state, there seem to be stale closures to deal with
  useEffect(() => {
    pendingValueRef.current = pendingValue;
  }, [pendingValue]);

  const setPendingValue: Dispatch<SetStateAction<PendingValue<T>>> = (value) => {
    setPendingValueState(value);
  };

  const applyPendingValue = () => {
    const value = pendingValueRef.current;
    if (value !== undefined) formMethods.setValue(fieldName, value);
    else console.error('usePendingValue', 'Cannot apply pending value when none has been set via `setPendingValue`');

    if (additionalAction && additionalAction() === false) return;
    setPendingValueState(undefined);
  };

  return { setPendingValue, applyPendingValue, pendingValue };
};
