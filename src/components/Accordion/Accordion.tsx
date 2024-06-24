import React from 'react';
import classnames from 'classnames';
import { px } from '../../utils';
import AccordionItem from './AccordionItem';
import { AccordionItemType } from './types';

// You'll need to change the HTMLDivElement to match the top-level element of your component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  // list of accordion items
  items: AccordionItemType[];
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
const Accordion = ({ className, ...props }: AccordionProps) => {
  const { items } = props;
  return (
    <div data-testid={`accordion`} className={classnames(`${px}-accordion`, { className })}>
      {items.map((item, index, arr) => (
        <AccordionItem {...item} isLastItem={arr.length - 1 - index === 0} key={`accordion${index}`} />
      ))}
    </div>
  );
};

export default Accordion;
