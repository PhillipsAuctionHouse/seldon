import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import AccordionItem, { AccordionItemProps } from './AccordionItem';

// You'll need to change the HTMLDivElement to match the top-level element of your component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  // list of accordion items
  id?: string;
  items: AccordionItemProps[];
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
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Accordion');
  const { items, id } = props;
  return (
    <div className={classnames(`${baseClassName}`, className)} {...commonProps} id={id}>
      {items?.length > 0 &&
        items.map((item, index, arr) => (
          <AccordionItem
            {...item}
            isLastItem={arr.length - 1 - index === 0}
            key={`accordion-${index}`}
            id={`accordion-item-${index}`}
          />
        ))}
    </div>
  );
};

export default Accordion;
