import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import DescriptiveRadioButton, { DescriptiveRadioButtonProps } from '../DescriptiveRadioButton/DescriptiveRadioButton';

export interface DescriptiveRadioButtonGroupProps extends ComponentProps<'fieldset'> {
  /**
   * Legend for the fieldset
   */
  legendText: string;
  /**
   * Hide the legend visually
   */
  hideLegend?: boolean;
  /**
   * Array of options to render as DescriptiveRadioButton components
   * Each option should include label, value, and optionally description and id
   */
  options: Array<Omit<DescriptiveRadioButtonProps, 'ref'>>;
  /**
   * Name attribute for the radio buttons
   */
  name: string;
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback function when the selected value changes
   */
  onValueChange: (value: string) => void;
  /**
   * Custom class name for the fieldset
   */
  className?: string;
}

/**
 * ## Overview
 *
 * [Figma Link](https://www.figma.com/design/kSxOhnqIhilZ9hIJd3bPgP/RW-Registration?node-id=2774-111402&m=dev)
 *
 * Renders a group of DescriptiveRadioButton components wrapped in a semantic fieldset.
 */
const DescriptiveRadioButtonGroup = forwardRef<HTMLFieldSetElement, DescriptiveRadioButtonGroupProps>(
  ({ legendText, hideLegend = true, options, name, value, onValueChange, className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'descriptive-radio-button-group');

    if (!options || options.length === 0) {
      return null;
    }

    // Use a unique id for the legend for aria-labelledby
    const legendId = `${name}_radio-button-group`;
    return (
      <fieldset
        {...commonProps}
        className={classnames(baseClassName, className)}
        ref={ref}
        name={name}
        role="radiogroup"
        aria-labelledby={legendId}
      >
        <legend id={legendId} className={hideLegend ? `${baseClassName}__sr-only` : undefined}>
          {legendText}
        </legend>
        {options.map((option) => (
          <DescriptiveRadioButton
            key={option.id}
            {...option}
            name={name}
            checked={value === option.value}
            onChange={() => onValueChange(String(option.value ?? ''))}
            id={option.id}
          />
        ))}
      </fieldset>
    );
  },
);

DescriptiveRadioButtonGroup.displayName = 'DescriptiveRadioButtonGroup';

export default DescriptiveRadioButtonGroup;
