import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

export interface TabTriggerProps extends Omit<ComponentProps<'div'>, 'onClick'> {
  /**
   * Value corresponding to the tab
   */
  value: string;
  /**
   * Optional onClick handler
   * @param value
   * @returns
   */
  onClick?: (value: string) => void;
  /**
   * Tab label
   */
  children?: React.ReactNode;
}

/**
 * TabTrigger component that serves as the clickable tab.
 *
 * @param {TabTriggerProps} props - The props for the TabTrigger component.
 * @returns {JSX.Element} The rendered TabTrigger component.
 */
const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(({ value, onClick, children, ...props }, ref) => {
  const { className: baseClassName } = getCommonProps(props, 'TabsContainer');
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={`${baseClassName}__tabs-trigger`}
      onClick={() => onClick?.(value)}
      ref={ref}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
