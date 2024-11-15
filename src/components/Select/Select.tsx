import * as React from 'react';
import classnames from 'classnames';
import { px, useNormalizedInputProps } from '../../utils';
import { InputProps } from '../Input/Input';
import './select.scss';
import { SelectVariants } from './types';

export interface SelectProps extends InputProps {
  /**
   * Option elements that are selectable
   */
  children: React.ReactNode;
  /**
   * Determines if you want to show the icon
   */
  showCustomIcon?: boolean;
  /**
   * Determines the variant of the select
   */
  variant: SelectVariants;
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

const Select = React.forwardRef(
  (
    {
      children,
      className,
      defaultValue,
      disabled,
      hideLabel,
      id,
      showCustomIcon = false,
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
    }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>,
  ) => {
    const type = 'select';
    const inputProps = useNormalizedInputProps({ disabled, id, invalid, invalidText, readOnly, type, warn, warnText });
    const [isOpen, setIsOpen] = React.useState(false);
    const handleIsOpen = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    const wrapperClassnames = classnames(`${px}-${type}-input`, `${px}-input`, `${px}-input--${size}`, {
      [`${px}-input--inline`]: inline,
      [`${px}-input--readonly`]: readOnly,
      [`${px}-input--disabled`]: inputProps.disabled,
      [`${px}-input--invalid`]: inputProps.invalid,
      [`${px}-input--warn`]: inputProps.warn,
      [`${className}__wrapper`]: className,
    });

    const selectClassnames = classnames(`${px}-input__input`, {
      className,
      [`${px}-input__select--open`]: isOpen && showCustomIcon,
      [`${px}-input__select--closed`]: !isOpen && showCustomIcon,
      [`${px}-input__select--tertiary`]: variant === SelectVariants.tertiary,
    });

    const handleClick = (e: React.MouseEvent<HTMLSelectElement>) => {
      handleIsOpen();
      onClick?.(e);
    };

    return (
      <div className={wrapperClassnames}>
        <label htmlFor={id} className={classnames(`${px}-input__label`, { [`${px}-input__label--hidden`]: hideLabel })}>
          {labelText}
        </label>
        <select
          className={selectClassnames}
          data-testid={id}
          defaultValue={defaultValue}
          disabled={inputProps.disabled}
          id={id}
          onChange={onChange}
          onBlur={closeDropdown}
          onClick={handleClick}
          ref={ref}
          value={value}
          {...rest}
        >
          {children}
        </select>
        {inputProps.validation}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
