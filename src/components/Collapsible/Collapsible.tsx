import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { forwardRef } from 'react';

export type CollapsibleProps = CollapsiblePrimitive.CollapsibleProps;
/**
 * ## Overview
 *
 * A 1:1 port of the [Radix UI Collapsible Component](https://www.radix-ui.com/primitives/docs/components/collapsible).
 *
 */
const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(({ className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Collapsible');

  return (
    <CollapsiblePrimitive.Root className={classnames(baseClassName, className)} {...commonProps} {...props} ref={ref} />
  );
});

Collapsible.displayName = 'Collapsible';

export default Collapsible;
