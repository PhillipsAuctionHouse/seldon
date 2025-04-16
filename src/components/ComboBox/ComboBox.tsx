import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';

export interface ComboBoxProps {
  options: string[];
  id?: string; // Add the id property
  className?: string; // Add the className property
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=11973-9589&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-ComboBox--overview)
 */
const ComboBox = React.forwardRef<HTMLDivElement, ComboBoxProps>(function ComboBox(
  { options, className, id, ...props },
  ref,
) {
  const { className: baseClassName, ...commonProps } = getCommonProps({ id }, 'ComboBox');

  return (
    <div className={classnames(baseClassName, className)} id={id} {...commonProps} {...props}>
      <div ref={ref}>Hello</div>
    </div>
  );
});

ComboBox.displayName = 'ComboBox';

export default ComboBox;
