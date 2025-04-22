import { Meta } from '@storybook/react';
import ComboBox, { ComboBoxProps } from './ComboBox';

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

const birthdays = Array.from({ length: 2025 - 1926 + 1 }, (_, i) => 1926 + i);
export const Playground = (props: ComboBoxProps) => (
  <div style={{ height: '70px', width: '400px', zIndex: 1, position: 'relative' }}>
    <ComboBox {...props} />
  </div>
);

Playground.args = {
  options: birthdays,
  id: 'birthdays-combo-box',
  label: 'Birth Year',
};

Playground.argTypes = {};
