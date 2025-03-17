import { ComponentProps, forwardRef, useId } from 'react';
import classnames from 'classnames';

import { px } from '../../utils';
import { Menu } from '../../assets/icons';

export interface TextAreaProps extends ComponentProps<'textarea'> {
  /**
   * Optional classnane
   */
  className?: string;
  /**
   * Boolean to specify whether the `<textarea>` should be disabled
   */
  disabled?: boolean;
  /**
   * The id attribute is needed to associate the text area with a label
   */
  id?: string;
  /**
   * Boolean to specify whether we need to display skeleton loader
   */
  isSkeletonLoading?: boolean;
  /**
   * Text that will be read by a screen reader when visiting this control
   */
  labelText: React.ReactNode;
  /**
   * Do we want to limit the number of characters that can be entered into the textarea?
   */
  maxLength?: number;
  /**
   * Specify a name for a textarea
   * The name attribute is needed to reference the form data after the form is submitted (if you omit the name attribute, no data from the text area will be submitted).
   */
  name?: string;
  /**
   * The number of rows to show in the textarea
   */
  rows?: number;
  /**
   * Optional `onChange` handler that is called whenever `<input>` is updated
   */
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
  ({ className, id, isSkeletonLoading, labelText, maxLength = 3000, name, rows = 2, ...props }, ref) => {
    const baseClassName = `${px}-text-area`;
    const generatedId = useId();
    return (
      <div className={classnames(`${baseClassName}__wrapper`)}>
        <label
          data-testid={`text-area-${id || generatedId}-label`}
          htmlFor={id || generatedId}
          className={classnames(`${px}-input__label`, {
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
        >
          {labelText}
        </label>
        <textarea
          {...props}
          className={classnames(baseClassName, className, {
            [`${px}-skeleton`]: isSkeletonLoading,
          })}
          id={id || generatedId}
          rows={rows}
          maxLength={maxLength}
          name={name}
          ref={ref}
          data-testid={`text-area-${id || generatedId}-input`}
        ></textarea>
        <div className={`${baseClassName}-resizer__icon`}>
          <Menu />
        </div>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
