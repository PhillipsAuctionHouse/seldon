import type { Meta, StoryObj } from '@storybook/react';

import Button, {ButtonProps} from './Button';
import Calendar from '../../assets/calendar.svg';

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



export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props} id="Input-1" >
    <>
      <img src={Calendar} className="calendar" alt="calendar" style={{marginRight: '0.75rem'}} />
      This is the title
    </>
  </Button>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    primary: false,
    label: "Button",
  },
};
