import type { Meta, StoryObj } from '@storybook/react';
import NavigationItem from './NavigationListItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Navigation/NavigationListItem',
  component: NavigationItem,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationItem>;

export default meta;
type Story = StoryObj<typeof meta>;



// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    element: 'a',
    children: 'test'
  },
};