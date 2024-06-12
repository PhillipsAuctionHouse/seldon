import type { Meta } from '@storybook/react';
import IconButton from './IconButton';
import CloseIcon from '../../assets/close.svg?react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/IconButton',
  component: IconButton,

  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    children: <CloseIcon />,
  },
};
