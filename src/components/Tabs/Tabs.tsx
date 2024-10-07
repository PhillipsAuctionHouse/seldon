import { ComponentProps } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import * as Tabs from '@radix-ui/react-tabs';

// Define the type for each tab, which includes its label, value, and content
export interface Tab {
  /**
   * button label
   */
  label: string;
  /**
   * Button value
   */
  value: string;
  /**
   * Content to display on tab selection
   */
  content?: React.ReactNode;
}

/**
 * TabsComponent renders a tab interface allowing switching between different content.
 *
 * @param {TabsComponentProps} props - The component props containing an array of tabs.
 * @returns {JSX.Element} The rendered tab component.
 */
export interface TabsComponentProps extends ComponentProps<'div'> {
  tabs: Tab[];
  /**
   * Specify the default tab
   */
  defaultValue?: string;
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

const TabsComponent = ({ className, tabs = [], defaultValue, ...props }: TabsComponentProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'TabsComponent');
  return (
    <Tabs.Root
      defaultValue={defaultValue || tabs[0].value}
      {...commonProps}
      className={classnames(`${baseClassName}`, className)}
    >
      <Tabs.List aria-label="Tabs" className={`${baseClassName}__tabs-list`}>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} className={`${baseClassName}__tabs-trigger`}>
            {tab.label}
          </Tabs.Trigger>
        ))}
        <div className={`${baseClassName}__full-bleed-underline`} />
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className={`${baseClassName}__tabs-content`}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsComponent;
