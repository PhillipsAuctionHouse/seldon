import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
// Keep this import last, below any component imports. CSS is emitted in module-graph order, so
// importing your stylesheet after the components you build on lets your rules win equal-specificity
// ties against theirs. Hoisting it above them flips that and they override you instead.
import './_componentName.scss';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface ComponentNameProps extends ComponentProps<'div'> {}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ComponentName');

  return <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}></div>;
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
