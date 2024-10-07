import { Meta } from '@storybook/react';
import TabsComponent, { TabsComponentProps } from './Tabs';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Tabs',
  component: TabsComponent,
} satisfies Meta<typeof TabsComponent>;

export default meta;
const tabs = [
  { label: 'Overview', value: 'overview', content: <div>Overview Content</div> },
  { label: 'Browse Lots', value: 'browse', content: <div>Browse Content</div> },
];

export const Playground = (props: TabsComponentProps) => <TabsComponent {...props} defaultValue="browse" />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  tabs,
};

Playground.argTypes = {};
