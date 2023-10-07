import * as React from 'react';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';

import { noOP, useNormalizedInputProps } from '../../utils';
import Input, { InputProps } from '../Input/Input';

export interface DatePickerProps extends Omit<InputProps, 'defaultValue'>, Record<string, unknown> {

  /**
   * Optionally provide the default value of the `<input>`. Should not be passed into controlled input!
   */
  defaultValue?: (Date|string)[];

  /**
   * Booolean to specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Render time picker on dropdown
   */
  enableTime?: boolean | undefined;

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
  locale: string;

  /**
   * Optional `onChange` handler that is called whenever flatpickr is updated
   * @param {array} selectedDates
   * @param {string} dateStr
   * @param {object} instance
   */
  onChange?: flatpickr.Options.Hook

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
   * Enum to determine whether component is a range or range and time
   */
  type?: 'single' | 'range';


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

// Weekdays shorthand for english locale for flatpickr
l10n.en.weekdays.shorthand.forEach((_day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

const DatePicker = React.forwardRef((
  {
    className,
    defaultValue,
    disabled,
    enableTime = false,
    hideLabel,
    id,
    inline,
    invalid,
    invalidText,
    labelText,
    locale = 'en',
    onChange = noOP,
    onClick = noOP,
    placeholder,
    readOnly,
    size = 'md',
    type = 'range',
    value,
    warn,
    warnText,
    ...rest
  }: DatePickerProps,
  ref:React.ForwardedRef<HTMLInputElement>
) => {
  const inputProps = useNormalizedInputProps({disabled, id, invalid, invalidText, readOnly, type, warn, warnText})
  const fp = React.useRef() as React.MutableRefObject<flatpickr.Instance>;
  const inputRef = React.useRef() as React.Ref<HTMLInputElement> | undefined;
  React.useEffect(
    () => {
      // Config for flatpickr
      const config: flatpickr.Options.Options = {
        clickOpens: !inputProps.disabled,
        defaultDate: defaultValue,
        enableTime,
        locale: l10n[locale as keyof typeof l10n],
        mode: type,
        onChange
        // onChange: ((dates: []) =>  onChange(dates)) as typeof onChange,
      }
      // if Ref is provided use
      if(typeof ref === 'object' && ref?.current) {
        fp.current = flatpickr(ref.current, config);
      }
      // No ref provided by users so use local ref
      if(ref === null) {
        if(typeof inputRef === 'object' && inputRef?.current) {
          fp.current = flatpickr(inputRef?.current, config);
        }
      }
      return () => {
        if (fp.current && fp.current.destroy) {
          fp.current.destroy();
        }
      }
    },[inputProps.disabled, locale, defaultValue, enableTime, onChange, ref, type, id]
  )

  return (
    <Input
      className={`${className} flatpickr`}
      data-testid={id}
      disabled={inputProps.disabled}
      hideLabel={hideLabel}
      id={id}
      inline={inline}
      invalid={invalid}
      invalidText={invalidText}
      labelText={labelText}
      onClick={onClick}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={ref ? ref : inputRef}
      size={size}
      value={value}
      warn={warn}
      warnText={warnText}
      {...rest}
    />
  )
});

DatePicker.displayName = "DatePicker"

export default DatePicker;