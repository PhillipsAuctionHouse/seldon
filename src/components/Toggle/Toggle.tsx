import * as React from 'react';
import classnames from 'classnames';

import { px, useNormalizedInputProps } from '../../utils';
import {InputProps} from '../Input/Input';



const Toggle = React.forwardRef((
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
    ...rest
  }: InputProps,
  ref:React.ForwardedRef<HTMLInputElement>
  ) => {

    const inputProps = useNormalizedInputProps({disabled, id, invalid, invalidText, readOnly, type, warn, warnText})


    const wrapperClassnames = classnames(
      `${px}-${type}-input`,
      `${px}-input`,
      `${px}-input--${size}`,
      {
        [`${px}-input--inline`]: inline,
        [`${px}-input--readonly`]: readOnly,
        [`${px}-input--disabled`]: inputProps.disabled,
        [`${px}-input--invalid`]: inputProps.invalid,
        [`${px}-input--warn`]: inputProps.warn,
        [`${className}__wrapper`]: className,
      }
    );

    return (
      <div className={wrapperClassnames}>
        <label htmlFor={id} className={classnames(`${px}-input__label`, {[`${px}-input__label--hidden`]: hideLabel})}>
          {labelText}
        </label>
        <input
          className={classnames(`${px}-input__input`,{className})}
          data-testid={id}
          defaultValue={defaultValue}
          disabled={inputProps.disabled}
          id={id}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          type={type}
          value={value}
          {...rest}
        />
        { inputProps.validation }
      </div>
    )
})

export default Toggle;