import { forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import Input, { InputProps } from '../Input/Input';

export interface FilterInputProps extends InputProps {
  /**
   * Type of input for this filter only radios or checkboxes allowed
   */
  type: 'checkbox' | 'radio';
}
/**
 * ## Overview
 *
 * A label & input for filtering criteria
 *
 */
const FilterInput = forwardRef<HTMLInputElement, FilterInputProps>(
  ({ className, type = 'checkbox', name, hidden, onChange, ...props }, ref) => {
    const { className: baseClassName } = getCommonProps(props, 'FilterInput');
    return (
      <Input
        {...props}
        onChange={onChange as InputProps['onChange']}
        ref={ref}
        type={type}
        className={`${baseClassName}__input`}
        hidden={hidden}
        hideLabel={hidden}
        name={name}
        size="lg"
      />
    );
  },
);

FilterInput.displayName = 'FilterValue';

export default FilterInput;
