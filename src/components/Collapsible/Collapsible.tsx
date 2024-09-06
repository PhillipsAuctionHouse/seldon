import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export type CollapsibleProps = CollapsiblePrimitive.CollapsibleProps;
/**
 * ## Overview
 *
 * A 1:1 port of the [Radix UI Collapsible Component](https://www.radix-ui.com/primitives/docs/components/collapsible).
 *
 */
const Collapsible = ({ className, ...props }: CollapsibleProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Collapsible');

  return <CollapsiblePrimitive.Root className={classnames(baseClassName, className)} {...commonProps} {...props} />;
};

export default Collapsible;
