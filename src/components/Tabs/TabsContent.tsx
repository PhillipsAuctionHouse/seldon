import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classNames from 'classnames';

// Define the type for each tab, which includes its label and content
export interface TabContentProps extends ComponentProps<'div'> {
  /**
   * The value that corresponds to the Trigger
   */
  value: string;
  /**
   * Content to be displayed when this tab is active
   */
  children: React.ReactNode;
  /**
   * The className for the Tab content container.
   */
  containerClassName?: string;
}

/**
 * TabContent component renders the content for a specific tab.
 *
 * @param {TabContentProps} props - The props for the TabContent component.
 * @returns {JSX.Element} The rendered TabContent component.
 */

const TabsContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, value, containerClassName, children, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TabsContainer');
    return (
      <TabsPrimitive.Content
        value={value}
        className={classNames(`${baseClassName}__tabs-content`, containerClassName)}
        {...commonProps}
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </TabsPrimitive.Content>
    );
  },
);

TabsContent.displayName = 'TabsContent';

export default TabsContent;
