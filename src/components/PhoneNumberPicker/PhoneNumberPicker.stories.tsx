import { Meta } from '@storybook/react';
import React from 'react';
import PhoneNumberPicker, { PhoneNumberPickerProps } from './PhoneNumberPicker';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/PhoneNumberPicker',
  component: PhoneNumberPicker,
} satisfies Meta<typeof PhoneNumberPicker>;

export default meta;

export const Playground = ({ ...props }: PhoneNumberPickerProps) => {
  const [inputValue, setInputValue] = React.useState('');
  return (
    <div style={{ height: '70px', width: '135px' }}>
      <PhoneNumberPicker {...props} inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

Playground.args = {
  labelText: 'Phone',
  id: 'phone-num-picker-test',
};
