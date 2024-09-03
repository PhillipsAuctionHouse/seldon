import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface ComponentNameProps extends ComponentProps<'div'> {}
/**
 * ## Overview
 *
 * Overview of this component
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
