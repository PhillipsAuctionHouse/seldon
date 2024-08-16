import { AccordionVariantKey, AccordionVariants } from './types';

import React from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import * as Accordion from '@radix-ui/react-accordion';

interface AccordionVariantProps {
  /**
   * Determines whether multiple elements can be opened at the same time or not.
   */
  type: 'single' | 'multiple';
  /**
   * Determines if an open element can be closed by clicking on it.
   * Only applicable to the `single` variants.
   */
  collapsible?: boolean;
}

/**
 * Sets the type and collapsible props based on the variant prop
 * The collapsible prop should only be passed when the variant is single
 */
const getAccordionVariantProps = (variant?: AccordionVariantKey): AccordionVariantProps => {
  const variantProps: AccordionVariantProps = { type: 'multiple' };

  if (variant === AccordionVariants.singleCollapsible) {
    variantProps.type = 'single';
    variantProps.collapsible = true;
  }

  if (variant === AccordionVariants.singleNonCollapsible) {
    variantProps.type = 'single';
    variantProps.collapsible = false;
  }

  return variantProps;
};

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique id for component testing
   */
  id?: string;
  /**
   * Determines the Accordion variant to use. `multiple` allows multiple elements to be opened at the same time.
   * The `single` variants only allow one element opened at a time.
   * `singleCollapsible` allows users to close an open element by clicking on it, while `singleNonCollapsible` does not.
   * Defaults to `multiple`.
   */
  variant?: AccordionVariantKey;
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
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-accordion--overview)
 */
const AccordionComponent = ({ className, children, ...props }: AccordionProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Accordion');
  const variantProps = getAccordionVariantProps(props.variant);

  return (
    <Accordion.Root
      className={classnames(`${baseClassName}`, className)}
      {...commonProps}
      {...variantProps}
      id={props?.id}
    >
      {children}
    </Accordion.Root>
  );
};

export default AccordionComponent;
