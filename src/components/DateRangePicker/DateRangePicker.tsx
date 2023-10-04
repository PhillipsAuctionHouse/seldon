import * as React from 'react';
import classnames from 'classnames';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { CustomLocale } from 'flatpickr/dist/types/locale';
import l10n from 'flatpickr/dist/l10n/index';

import { px, useNormalizedInputProps } from '../../utils';
import Input, { InputProps } from '../Input/Input';

export interface DateRangePickerProps extends Omit<InputProps, 'defaultValue'>, Record<string, unknown> {

  /**
   * Optionally provide the default value of the `<input>`. Should not be passed into controlled input!
   */
  defaultValue?: string | number | [string];

  /* | [string]*
   * Booolean to specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Boolean to specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * A custom `id` for the `<input>`
   */
  id: string;

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
  labelText: string;

  /**
   * Locatiion you want the calendar to render for
   */
  locale: string | {locale: string};

  /**
   * Optional `onChange` handler that is called whenever `<input>` is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;

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
  size?: 'sm' | 'md' | 'lg' ;

  /**
   * String that determines  the type of the `<input>` (e.g 'text', 'date', 'numeber', etc.)
   */
  type?: string;

  /**
   * Specify the value of the `<input>` for controlled inputs
   */
  value?: string | number | undefined;

  /**
   * Boolean to specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((_day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

const DateRangePicker = React.forwardRef((
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
    locale = 'en',
    onChange,
    onClick,
    placeholder,
    readOnly,
    size = 'md',
    type = 'date',
    value,
    warn,
    warnText,
    ...rest
  }: DateRangePickerProps,
  ref:React.ForwardedRef<HTMLInputElement>
  ) => {
    const fp = React.useRef() as React.MutableRefObject<Instance>;
    React.useEffect(
      () => {
        // return fp.current.destroy();
      },[]
    )
    let localeData: CustomLocale;
    if (typeof locale === 'object') {
      const location = locale?.locale ? locale?.locale : 'en';
      localeData = { ...l10n[location as keyof typeof l10n], ...locale };
    } else {
      localeData = l10n[locale as keyof typeof l10n];
    }
    const inputProps = useNormalizedInputProps({disabled, id, invalid, invalidText, readOnly, type, warn, warnText})
    const inputRef = React.useCallback((node: HTMLInputElement) => {
      if (node !== null) {
        if (typeof ref === 'object' && ref?.current) ref.current === node;
        console.log("We running!")
        fp.current = flatpickr(node, {mode: 'range', onChange: (e) =>  console.log("Picking", e), clickOpens: !inputProps.disabled, locale: localeData,});
      }
    }, []);


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      console.log("HEY: ", fp.current)
      // fp?.current?.toggle();
      // if (fp.current.isOpen) {
      //   fp?.current?.open();
      // } else {
      //   fp?.current?.close();
      // }
      if (onClick) {
        onClick(e);
      }
    }

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
      },
      'flatpickr'
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
          onClick={handleClick}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={inputRef}
          type={inputProps.type}
          value={value}
          {...rest}
        />
        { inputProps.validation }
      </div>
    )
})

export default DateRangePicker;