import { AccordionVariantKey } from './types';

import React, { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import * as Accordion from '@radix-ui/react-accordion';
import { getAccordionVariantProps } from './utils';

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

  /**
   * Optionally control the expanded state of the accordion items.
   */
  value?: ComponentProps<typeof Accordion.Root>['value'];
  /**
   * Callback function to be called when the expanded state of the items change.
   */
  onValueChanged?: ComponentProps<typeof Accordion.Root>['onValueChange'];
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
const AccordionComponent = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, variant, value, onValueChanged, ...props }: AccordionProps, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Accordion');
    const variantProps = getAccordionVariantProps(variant, value);

    return (
      // @ts-expect-error radix-ui type checking is too aggressive ans we know the values are valid
      <Accordion.Root
        className={classnames(`${baseClassName}`, className)}
        {...commonProps}
        {...variantProps}
        id={props?.id}
        ref={ref}
        value={value}
        onValueChange={onValueChanged}
      >
        {children}
      </Accordion.Root>
    );
  },
);

AccordionComponent.displayName = 'Accordion';

export default AccordionComponent;
