import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;



// const labelComponent = <p>hey</p>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground: Story = {
  args: {
    primary: false,
    label: "Button",
  },
};
