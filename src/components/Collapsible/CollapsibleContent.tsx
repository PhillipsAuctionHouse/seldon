import React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export type CollapsibleContentProps = CollapsiblePrimitive.CollapsibleContentProps;

/**
 * ## Overview
 *
 * A 1:1 port of the [Radix UI Collapsible Content Component](https://www.radix-ui.com/primitives/docs/components/collapsible#content).
 *
 */
const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CollapsibleContent');

  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={classnames(baseClassName, className)}
      {...commonProps}
      {...props}
    />
  );
});

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
