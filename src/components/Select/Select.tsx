import * as React from 'react';
import classnames from 'classnames';
import { px, useNormalizedInputProps } from '../../utils';
import { InputProps } from '../Input/Input';
import { Merge } from 'type-fest';
import { SelectVariants } from './types';
import { Icon } from '../Icon';

export interface SelectProps extends Merge<InputProps, React.ComponentProps<'select'>> {
  /**
   * Option elements that are selectable
   */
  children: React.ReactNode;
  /**
   * A unique `id` for the `<Select>`
   */
  id: string;
  /**
   * Determines if you want to show the icon
   */
  showIcon?: boolean;
  /**
   * Determines the variant of the select
   */
  variant?: SelectVariants;
}

/**
 * ## Overview
 *
 * A component for adding a Select component.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=5608-57898&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-select--overview)
 */

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      defaultValue,
      disabled,
      hideLabel,
      id,
      showIcon = true,
      variant = SelectVariants.default,
      inline,
      invalid,
      invalidText,
      labelText,
      onChange,
      onClick,
      readOnly,
      size = 'md',
      value,
      warn,
      warnText,
      ...rest
    },
    ref,
  ) => {
    const type = 'select';
    const inputProps = useNormalizedInputProps({
      disabled,
      id,
      invalid,
      invalidText,
      readOnly,
      type,
      warn,
      warnText,
    });

    const wrapperClassnames = classnames(`${px}-${type}-input`, `${px}-input`, `${px}-input--${size}`, {
      [`${px}-input--inline`]: inline,
      [`${px}-input--readonly`]: readOnly,
      [`${px}-input--disabled`]: inputProps.disabled,
      [`${px}-input--invalid`]: inputProps.invalid,
      [`${px}-input--warn`]: inputProps.warn,
      [`${className}__wrapper`]: className,
    });
    const selectClassnames = classnames(className, `${px}-input__input`, {
      [`${px}-input__select--tertiary`]: variant === SelectVariants.tertiary,
    });

    const selectContainerClassnames = classnames(`${px}-select-container`, {
      [`${px}-select-container--show__icon`]: showIcon,
    });

    return (
      <div className={wrapperClassnames}>
        <label
          data-testid={`${id}-label`}
          htmlFor={id}
          className={classnames(`${px}-input__label`, { [`${px}-input__label--hidden`]: hideLabel })}
        >
          {labelText}
        </label>
        <div className={selectContainerClassnames}>
          <select
            className={selectClassnames}
            data-testid={id}
            defaultValue={defaultValue}
            disabled={inputProps.disabled}
            id={id}
            onChange={onChange}
            ref={ref}
            value={value}
            {...rest}
          >
            {children}
          </select>
          {showIcon ? <Icon icon="ChevronDown" /> : null}
        </div>
        {inputProps.validation}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
