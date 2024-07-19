import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import * as Accordion from '@radix-ui/react-accordion';

// You'll need to change the HTMLDivElement to match the top-level element of your component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique id for component testing
   */
  id?: string;
  /**
   * Determines whether one or multiple items can be opened at the same time. Default as single.
   */
  type?: 'single' | 'multiple';
  /**
   * Child element pass in to display as item content.
   */
  children?: React.ReactNode;
}
/**
 * ## Overview
 *
 * Overview of this component
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4433-163013&t=lhB2YjBptvQ97UWF-0)
 *
 * [Storybook Link](Point back to yourself here)
 */
const AccordionComponent = ({ className, type = 'single', children, ...props }: AccordionProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Accordion');
  return (
    <Accordion.Root
      className={classnames(`${baseClassName}`, className)}
      type={type}
      {...commonProps}
      id={props?.id}
      collapsible
    >
      {children}
    </Accordion.Root>
  );
};

export default AccordionComponent;
