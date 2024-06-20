import React from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

// You'll need to change the HTMLDivElement to match the top-level element of your component
export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {}
/**
 * ## Overview
 *
 * Overview of this component
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const ComponentName = ({ className, ...props }: ComponentNameProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ComponentName');

  return <div {...props} {...commonProps} className={classnames(baseClassName, className)}></div>;
};

export default ComponentName;
