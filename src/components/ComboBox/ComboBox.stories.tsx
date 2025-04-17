import { Meta } from '@storybook/react';
import ComboBox, { ComboBoxProps } from './ComboBox';

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

const birthdays = Array.from({ length: 2025 - 1926 + 1 }, (_, i) => 1926 + i);
export const Playground = (props: ComboBoxProps) => <ComboBox {...props} />;

Playground.args = {
  options: birthdays,
};

Playground.argTypes = {};
