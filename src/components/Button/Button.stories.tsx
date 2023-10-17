import type { Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';
import Calendar from '../../assets/calendar.svg?react';

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
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props} id="Input-1">
    This is the title
    <Calendar />
  </Button>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    primary: false,
    children: 'Button',
  },
};
