import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export interface TabTriggerProps extends ComponentProps<'div'> {
  /**
   * Value corresponding to the tab
   */
  value: string;
  /**
   * Optional onClick handler
   * @param value
   * @returns
   */
  onTabClick?: (value: string) => void;
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
const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(({ value, onTabClick, children, ...props }, ref) => {
  const handleClick = () => {
    if (onTabClick) {
      onTabClick(value);
    }
  };
  const { className: baseClassName } = getCommonProps(props, 'TabsContainer');
  return (
    <TabsPrimitive.Trigger value={value} className={`${baseClassName}__tabs-trigger`} onClick={handleClick} ref={ref}>
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
