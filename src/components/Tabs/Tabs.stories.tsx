import { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import Button from '../Button/Button';
import { Text, TextVariants } from '../Text';
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

// Story with controlled tabs
export const ControlledTabs = () => {
  const [value, setValue] = useState('overview');

  return (
    <>
      <TabsContainer tabs={tabs} value={value} onTabClick={setValue}>
        <TabsContent value="overview">
          <p>This content is for the Overview tab.</p>
        </TabsContent>
        <TabsContent value="browse">
          <p>This content is for the Browse lots tab.</p>
        </TabsContent>
      </TabsContainer>
      <Text variant={TextVariants.heading4}>Control state from outside the component</Text>
      <Button onClick={() => setValue('browse')}>Change to Browse tab</Button>
      <Button onClick={() => setValue('overview')}>Change to Overview tab</Button>
    </>
  );
};

const componentTabs = [
  {
    label: <div style={{ display: 'flex' }}>Overview {<Text style={{ color: 'red', marginBottom: '0' }}>*</Text>}</div>,
    value: 'overview',
  },
  {
    label: <div style={{ display: 'flex' }}>Submit {<Text style={{ color: 'blue', marginBottom: '0' }}>+</Text>}</div>,
    value: 'Browse',
  },
];

// Story with the Browse tab selected
export const ComponentLabels = () => (
  <TabsContainer tabs={componentTabs}>
    <TabsContent value="overview">
      <p>This content is for the Overview tab.</p>
    </TabsContent>
    <TabsContent value="browse">
      <p>This content is for the Browse lots tab.</p>
    </TabsContent>
  </TabsContainer>
);
