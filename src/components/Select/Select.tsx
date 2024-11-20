import * as React from 'react';
import classnames from 'classnames';

import { px, useNormalizedInputProps } from '../../utils';
import { InputProps } from '../Input/Input';
import { Merge } from 'type-fest';

export type SelectProps = Merge<InputProps, React.ComponentProps<'select'>>;

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
    const generatedId = React.useId();
    const inputProps = useNormalizedInputProps({
      disabled,
      id: id ?? generatedId,
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

    return (
      <div className={wrapperClassnames}>
        <label htmlFor={id} className={classnames(`${px}-input__label`, { [`${px}-input__label--hidden`]: hideLabel })}>
          {labelText}
        </label>
        <select
          className={classnames(`${px}-input__input`, { className })}
          data-testid={id}
          defaultValue={defaultValue}
          disabled={inputProps.disabled}
          id={id}
          onChange={onChange}
          onClick={onClick}
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
