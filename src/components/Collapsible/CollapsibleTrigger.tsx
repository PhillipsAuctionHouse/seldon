import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { forwardRef } from 'react';

export type CollapsibleTriggerProps = CollapsiblePrimitive.CollapsibleTriggerProps;

/**
 * ## Overview
 *
 * A 1:1 port of the [Radix UI Collapsible Trigger Component](https://www.radix-ui.com/primitives/docs/components/collapsible#trigger).
 *
 */
const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CollapsibleTrigger');

  return (
    <CollapsiblePrimitive.Trigger
      className={classnames(baseClassName, className)}
      {...commonProps}
      {...props}
      ref={ref}
    />
  );
});

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export default CollapsibleTrigger;
