import * as React from 'react';
import classnames from 'classnames';

import { px, useNormalizedInputProps } from '../../utils';

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  /**
   * Optional className to be applied to the `<input>` node
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`. Should not be passed into controlled input!
   */
  defaultValue?: string | number | readonly string[];

  /**
   * Boolean to specify whether the `<input>` should be disabled.
   * WARNING: disabled field values will NOT be submitted when a form is submitted according to the HTML spec.
   * Instead use `readOnly` to prevent user input but still submit the value.
   */
  disabled?: boolean;

  /**
   * Boolean to specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * A custom `id` for the `<input>`
   */
  id?: string;

  /**
   * Boolean to dictate whether input is inline with the label or not. `true` to use the inline version.
   */
  inline?: boolean;

  /**
   * Boolean to specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Validation text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Text that will be read by a screen reader when visiting this control
   */
  labelText: React.ReactNode;

  /**
   * Optional `onChange` handler that is called whenever `<input>` is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optional `onClick` handler that is called whenever the `<input>` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Optional text to be used for the placeholder attribute of the `<input>`
   */
  placeholder?: string;

  /**
   * Boolean to deterimine whether the input should be read-only
   */
  readOnly?: boolean;

  /**
   * Enum to determine the height of the Text Input. Currently supports the following:
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * String that determines  the type of the `<input>` (e.g 'text', 'date', 'numeber', etc.)
   */
  type?: string;

  /**
   * Specify the value of the `<input>` for controlled inputs
   */
  value?: string | number | undefined | readonly string[];

  /**
   * Boolean to specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Boolean to specify whether we need to display skeleton loader
   */
  isSkeletonLoading?: boolean;
}

/**
 * ## Overview
 *
 * A page will usually contain multiple Rows.  The Row component will apply paddings to the contents within it.  Usually a Grid will be rendered within a Row to align to the grid, but other elements are supported.
 *
 * [Figma Input Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4433-163016&m=dev)
 *
 * [Figma Toggle Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4612-77490&m=dev)
 *
 * [Storybook Input Link](https://phillips-seldon.netlify.app/?path=/docs/components-input--overview)
 *
 * [Storybook Toggle Link](https://phillips-seldon.netlify.app/?path=/docs/components-toggle--overview)
 */

const Input = React.forwardRef(
  (
    {
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
      placeholder,
      readOnly,
      size = 'md',
      type = 'text',
      value,
      warn,
      warnText,
      isSkeletonLoading,
      ...rest
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const generatedId = React.useId();
    const inputProps = useNormalizedInputProps({
      disabled,
      id: id || generatedId,
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
      [`${px}-input--hidden`]: rest.hidden,
    });
    return (
      <div className={wrapperClassnames}>
        <label
          data-testid={`label-${id || generatedId}`}
          htmlFor={id || generatedId}
          className={classnames(`${px}-input__label`, {
            [`${px}-input__label--hidden`]: hideLabel,
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
        >
          {labelText}
        </label>
        <input
          className={classnames(`${px}-input__input`, className, {
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
          data-testid={id}
          disabled={inputProps.disabled}
          id={id || generatedId}
          onChange={onChange}
          onClick={onClick}
          placeholder={isSkeletonLoading ? '' : placeholder}
          readOnly={readOnly}
          ref={ref}
          type={inputProps.type}
          // can't set values on a checkbox or it breaks
          {...(inputProps.type !== 'checkbox' && inputProps.type !== 'radio' ? { value, defaultValue } : {})}
          {...rest}
        />
        {inputProps.validation ? (
          inputProps.validation
        ) : (
          <p className={classnames(`${px}-input__validation`)}>&nbsp;</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
