import * as TabsPrimitive from '@radix-ui/react-tabs';
import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../Text';
import TabTrigger from './TabTrigger';

// Define the type for each tab, which includes its label, value, and content
export interface Tab {
  /**
   * button label
   */
  label: React.ReactNode;
  /**
   * Button value
   */
  value: string;
}

/**
 * TabsContainer renders a tab interface allowing switching between different content.
 *
 * @param {TabsContainerProps} props - The component props containing an array of tabs.
 * @returns {JSX.Element} The rendered tab component.
 */
export interface TabsContainerProps extends TabsPrimitive.TabsProps, Omit<ComponentProps<'div'>, 'dir'> {
  tabs: Tab[];
  /**
   * Specify the default tab
   */
  defaultValue?: string;
  /**
   * Aria-label for specific tab list view
   */
  tabListLabel?: string;
  /**
   * Optional value for controlled tabs
   */
  value?: string;
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

const TabsContainer = forwardRef<HTMLDivElement, TabsContainerProps>(
  (
    { className, tabs = [], tabListLabel = 'Sale Page Tabs', children, defaultValue, value, onTabClick, ...props },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TabsContainer');
    return (
      <TabsPrimitive.Root
        {...props}
        defaultValue={defaultValue || tabs[0].value}
        value={value}
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
              onClick={onTabClick}
            >
              <Text variant={TextVariants.labelMedium}>{tab.label}</Text>
            </TabTrigger>
          ))}
          <div className={`${baseClassName}__full-bleed-underline`} />
        </TabsPrimitive.List>
        {children}
      </TabsPrimitive.Root>
    );
  },
);

TabsContainer.displayName = 'TabsContainer';

export default TabsContainer;
