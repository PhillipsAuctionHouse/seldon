import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import Text from '../Text/Text';
import { TextVariants } from '../Text';

export interface DescriptiveRadioButtonProps extends Omit<ComponentProps<'input'>, 'type'> {
  /**
   * Label for the radio button
   */
  labelText: string;
  /**
   * Optional description text for the radio button
   */
  description?: string;
  /**
   * Custom class name for the radio button input
   */
  className?: string;
  /**
   * Custom class name for the container element
   */
  containerClassName?: string;
  /**
   * Unique identifier for the radio button
   */
  id: string;
}

/**
 * ## Overview
 *
 * Renders a styled radio button with a label and an optional description.
 *
 * [Figma Link](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=2774-111402&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-descriptiveradiobutton--overview)
 */

const DescriptiveRadioButton = forwardRef<HTMLInputElement, DescriptiveRadioButtonProps>(
  ({ labelText, description, className, containerClassName, id, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(
      props as ComponentProps<'input'>,
      'descriptive-radio-button',
    );
    const inputId = id;
    const descId = description ? `${inputId}-desc` : undefined;

    return (
      <label
        htmlFor={inputId}
        className={classnames(`${baseClassName}__container`, containerClassName, {
          [`${baseClassName}__container--selected`]: props.checked,
        })}
      >
        <input
          {...commonProps}
          {...props}
          ref={ref}
          id={inputId}
          type="radio"
          className={classnames(`${baseClassName}__input`, className)}
          checked={props.checked}
        />
        <span className={`${baseClassName}__label-content`}>
          <Text variant={TextVariants.headingMedium} className={`${baseClassName}__label-text`}>
            {labelText}
          </Text>
          {description && (
            <Text variant={TextVariants.bodySmall} id={descId} className={`${baseClassName}__description`}>
              {description}
            </Text>
          )}
        </span>
      </label>
    );
  },
);

DescriptiveRadioButton.displayName = 'DescriptiveRadioButton';

export default DescriptiveRadioButton;
