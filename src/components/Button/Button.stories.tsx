import type { Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';
import Calendar from '../../assets/calendar.svg?react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,

  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    buttonType: {
      options: ['primary', 'secondary', 'ghost', 'icon'],
      control: {
        type: 'select',
      },
    },
    iconLast: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const ButtonWithIcon = (props: ButtonProps) => (
  <Button {...props}>
    {!props.iconLast ? <Calendar /> : null}
    This is the title
    {props.iconLast ? <Calendar /> : null}
  </Button>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    children: 'Button',
    buttonType: 'primary',
  },
};
