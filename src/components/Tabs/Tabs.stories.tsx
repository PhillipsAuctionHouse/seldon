import { Meta } from '@storybook/react';
import TabsContainer, { TabsContainerProps } from './TabsContainer';
import TabsContent, { TabContentProps } from './TabsContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Tabs',
  component: TabsContainer,
} satisfies Meta<typeof TabsContainer>;

export default meta;

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Browse lots', value: 'browse' },
];

// Default story for Tabs component
export const Playground = (props: TabsContainerProps & TabContentProps) => (
  <TabsContainer {...props} defaultValue="overview">
    <TabsContent value="overview">
      <p>This content is for the Overview tab.</p>
    </TabsContent>
    <TabsContent value="browse">
      <p>This content is for the Browse lots tab.</p>
    </TabsContent>
  </TabsContainer>
);

Playground.args = {
  tabs,
};

Playground.argTypes = {};

// Story with the Browse tab selected
export const BrowseTabSelected = () => (
  <TabsContainer tabs={tabs} defaultValue="browse">
    <TabsContent value="overview">
      <p>This content is for the Overview tab.</p>
    </TabsContent>
    <TabsContent value="browse">
      <p>This content is for the Browse lots tab.</p>
    </TabsContent>
  </TabsContainer>
);
