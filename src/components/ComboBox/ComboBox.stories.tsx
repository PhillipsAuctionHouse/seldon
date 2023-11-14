import type { Meta } from '@storybook/react';

import ComboBox, { ComboBoxProps } from './Button';
import Calendar from '../../assets/calendar.svg?react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    buttonType: {
      options: ['primary', 'secondary', 'ghost'],
      control: {
        type: 'select',
      },
    },
    iconLast: { control: 'boolean' },
  },
} satisfies Meta<typeof ComboBox>;

export default meta;

export const ButtonWithIcon = (props: ComboBoxProps) => (
  <ComboBox {...props}>
    {!props.iconLast ? <Calendar /> : null}
    This is the title
    {props.iconLast ? <Calendar /> : null}
  </ComboBox>
);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = {
  args: {
    children: 'ComboBox',
    buttonType: 'primary',
  },
};
