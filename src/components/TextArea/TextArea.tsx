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
   * Boolean to specify whether we need to display skeleton loader
   */
  isSkeletonLoading?: boolean;
  /**
   * Text that will be read by a screen reader when visiting this control
   */
  labelText: React.ReactNode;
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
          data-testid={`text-area-${id ?? generatedId}-label`}
          htmlFor={id ?? generatedId}
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
          id={id ?? generatedId}
          rows={rows}
          maxLength={maxLength}
          name={name}
          ref={ref}
          data-testid={`text-area-${id ?? generatedId}-input`}
        />
        <div className={`${baseClassName}-resizer__icon`}>
          <Menu />
        </div>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
