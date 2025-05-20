import { ComponentProps, forwardRef, useId } from 'react';
import classnames from 'classnames';

import { px, useNormalizedInputProps } from '../../utils';
import { Icon } from '../Icon';

export interface TextAreaProps extends ComponentProps<'textarea'> {
  /**
   * Optional classnane
   */
  className?: string;
  /**
   * Boolean to specify whether we need to display skeleton loader
   */
  isSkeletonLoading?: boolean;
  /**
   * Text that will be read by a screen reader when visiting this control
   */
  labelText: React.ReactNode;

  /**
   * Boolean to specify whether the control is disabled
   */
  disabled?: boolean;
  /**
   * Boolean to specify whether the control is currently in an invalid state
   */
  invalid?: boolean;
  /**
   * Text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;
  /**
   * Boolean to specify whether the control is readonly
   */
  readOnly?: boolean;
  /**
   * Boolean to specify whether the control is currently in warning state
   */
  warn?: boolean;
  /**
   * Text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=11973-9589&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-textarea--overview)
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      id,
      isSkeletonLoading,
      labelText,
      maxLength = 3000,
      name,
      rows = 2,
      disabled,
      warn,
      warnText,
      invalid,
      invalidText,
      ...props
    },
    ref,
  ) => {
    const baseClassName = `${px}-text-area`;
    const generatedId = useId();

    const textAreaProps = useNormalizedInputProps({
      disabled,
      id: id ?? generatedId,
      invalid,
      invalidText,
      type: 'text-area',
      warn,
      warnText,
    });

    const wrapperClassNames = classnames(`${baseClassName}__wrapper`, {
      [`${px}-text-area--disabled`]: textAreaProps.disabled,
      [`${px}-text-area--invalid`]: textAreaProps.invalid,
      [`${px}-text-area--warn`]: textAreaProps.warn,
    });

    return (
      <div className={wrapperClassNames}>
        <label
          data-testid={`text-area-${id ?? generatedId}-label`}
          htmlFor={id ?? generatedId}
          className={classnames(`${px}-text-area__label`, {
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
        >
          {labelText}
        </label>
        <textarea
          {...props}
          className={classnames(baseClassName, className, `${px}-text-area__input`, {
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
          id={id ?? generatedId}
          rows={rows}
          maxLength={maxLength}
          name={name}
          ref={ref}
          data-testid={`text-area-${id ?? generatedId}-input`}
          disabled={textAreaProps.disabled}
        />
        <div className={`${baseClassName}-resizer__icon`}>
          <Icon icon="Menu" />
        </div>
        {textAreaProps.validation ? (
          textAreaProps.validation
        ) : (
          <p className={classnames(`${px}-text-area__validation`)}>&nbsp;</p>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
