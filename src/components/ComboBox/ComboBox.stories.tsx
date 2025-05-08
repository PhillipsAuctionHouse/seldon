import { Meta } from '@storybook/react';
import React from 'react';
import ComboBox, { ComboBoxProps } from './ComboBox';

const meta = {
  title: 'Components/ComboBox',
  component: ComboBox,
} satisfies Meta<typeof ComboBox>;

export default meta;

const birthdays = Array.from({ length: 2025 - 1926 + 1 }, (_, i) => {
  const year = 1926 + i;
  return {
    value: `${year}`,
  };
});
export const Playground = (props: ComboBoxProps) => {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <div style={{ height: '70px', width: '400px' }}>
      <ComboBox {...props} inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

Playground.args = {
  options: birthdays,
  id: 'birthdays-combo-box',
  labelText: 'Birth Year',
};

Playground.argTypes = {};
