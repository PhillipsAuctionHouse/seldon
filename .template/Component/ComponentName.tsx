import React from 'react';
import { getCommonProps } from '../../utils';

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
const ComponentName = ({ ...props }: ComponentNameProps) => {
  return <div {...props} {...getCommonProps(props, 'ComponentName')}></div>;
};

export default ComponentName;
