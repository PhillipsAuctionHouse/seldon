import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export type CollapsibleTriggerProps = CollapsiblePrimitive.CollapsibleTriggerProps;

/**
 * ## Overview
 *
 * A 1:1 port of the [Radix UI Collapsible Trigger Component](https://www.radix-ui.com/primitives/docs/components/collapsible#trigger).
 *
 */
const CollapsibleTrigger = ({ className, ...props }: CollapsibleTriggerProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'CollapsibleTrigger');

  return <CollapsiblePrimitive.Trigger className={classnames(baseClassName, className)} {...commonProps} {...props} />;
};

export default CollapsibleTrigger;
