import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';
import Input from '../Input/Input';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface FilterValueProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  // Text to be displayed as a label for the neighboring input
  label: string;

  // Type of input for this filter
  inputType: 'checkbox' | 'radio';

  // Should this filter be hidden, most common use will be for view all truncation
  isHidden?: boolean;

  // Whether or not this filter is disabled
  disabled?: boolean;

  // Function to trigger when the state of this filter is changed
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * ## Overview
 *
 * A label & input for filtering criteria
 *
 */
const FilterValue = forwardRef<HTMLDivElement, FilterValueProps>(
  ({ className, label, inputType, isHidden = false, onChange, disabled, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'FilterValue');
    const disabledLabel = disabled ? 'disabled-label' : '';
    return (
      <>
        {isHidden ? null : (
          <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
            <Text variant={TextVariants.body2} className={`${baseClassName}__label ${disabledLabel}`}>
              {label}
            </Text>
            <Input
              disabled={disabled}
              type={inputType}
              className={`${baseClassName}__input`}
              onChange={onChange}
              hideLabel={true}
              size="lg"
              value={label}
            />
          </div>
        )}
      </>
    );
  },
);

FilterValue.displayName = 'FilterValue';

export default FilterValue;
