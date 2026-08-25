import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
// Keep this import last, below any component imports. The `seldon.*` layers order CSS across tiers
// but not within one, so importing your stylesheet after the components you build on is what lets
// your rules win equal-specificity ties. Hoisting it above them flips that.
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
