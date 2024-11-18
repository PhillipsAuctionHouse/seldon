import { ComponentProps, forwardRef } from 'react';
import { getCommonProps, px } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import Input, { InputProps } from '../Input/Input';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface FilterValueProps extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  name: string;

  // Text to be displayed as a label for the neighboring input
  label: string;

  // Type of input for this filter
  inputType: 'checkbox' | 'radio';

  // Selected or not
  isActive: boolean;

  // Should this filter be hidden, most common use will be for view all truncation
  isHidden?: boolean;

  // Whether or not this filter is disabled
  disabled?: boolean;

  // Function to trigger when the state of this filter is changed
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  inputProps?: InputProps;
}
/**
 * ## Overview
 *
 * A label & input for filtering criteria
 *
 */
const FilterValue = forwardRef<HTMLDivElement, FilterValueProps>(
  (
    {
      className,
      name,
      label,
      inputType = 'checkbox',
      isHidden = false,
      onChange,
      disabled,
      isActive,
      inputProps,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterValue');
    const disabledClass = disabled ? `${baseClassName}-disabled-label` : '';
    return (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, { [`${px}-input__label--hidden`]: isHidden })}
        {...props}
        ref={ref}
      >
        <Text
          variant={TextVariants.body2}
          className={`${baseClassName}__label ${disabledClass}`}
          element={(props) => (
            <label htmlFor={name} {...props}>
              {label}
            </label>
          )}
        />
        <Input
          {...inputProps}
          checked={isActive}
          disabled={disabled}
          type={inputType}
          className={`${baseClassName}__input`}
          onChange={onChange}
          hideLabel={true}
          size="lg"
          name={name}
          id={name}
        />
      </div>
    );
  },
);

FilterValue.displayName = 'FilterValue';

export default FilterValue;
