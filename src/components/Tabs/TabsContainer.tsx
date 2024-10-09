import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import TabTrigger from './TabTrigger';
import { Text, TextVariants } from '../Text';

// Define the type for each tab, which includes its label, value, and content
export interface TabLabel {
  /**
   * button label
   */
  label: string;
  /**
   * Button value
   */
  value: string;
}

/**
 * TabsComponent renders a tab interface allowing switching between different content.
 *
 * @param {TabsComponentProps} props - The component props containing an array of tabs.
 * @returns {JSX.Element} The rendered tab component.
 */
export interface TabsComponentProps extends ComponentProps<'div'> {
  tabs: TabLabel[];
  /**
   * Specify the default tab
   */
  defaultValue?: string;
  /**
   * Aria-label for specific tab list view
   */
  tabListLabel?: string;
  /**
   * Optional handler when a tab is clicked
   */
  onTabClick?: (value: string) => void;
  /**
   * TabContent components will be passed here
   */
  children?: React.ReactNode;
}

/**
 * ## Overview
 *
 * Overview of Tabs component
 *
 * [Figma Link](https://www.figma.com/file/hMu9IWH5N3KamJy8tLFdyV?type=design&node-id=10838%3A22184&mode=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-tabs--overview)
 */

const TabsComponent = forwardRef<HTMLDivElement, TabsComponentProps>(
  ({ className, tabs = [], tabListLabel = 'Sale Page Tabs', children, defaultValue, onTabClick, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TabsComponent');
    return (
      <TabsPrimitive.Root
        defaultValue={defaultValue || tabs[0].value}
        {...commonProps}
        className={classnames(`${baseClassName}`, className)}
        ref={ref}
      >
        <TabsPrimitive.List aria-label={tabListLabel} className={`${baseClassName}__tabs-list`}>
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.value}
              value={tab.value}
              className={`${baseClassName}__tabs-trigger`}
              onTabClick={onTabClick}
            >
              <Text variant={TextVariants.label}>{tab.label}</Text>
            </TabTrigger>
          ))}
          <div className={`${baseClassName}__full-bleed-underline`} />
        </TabsPrimitive.List>
        {children}
      </TabsPrimitive.Root>
    );
  },
);

TabsComponent.displayName = 'TabsComponent';

export default TabsComponent;
