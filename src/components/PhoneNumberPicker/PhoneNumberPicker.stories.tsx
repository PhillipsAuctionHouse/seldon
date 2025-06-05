import { Meta } from '@storybook/react';
import PhoneNumberPicker, { PhoneNumberPickerProps } from './PhoneNumberPicker';
import { useState } from 'react';

const meta = {
  title: 'Components/PhoneNumberPicker',
  component: PhoneNumberPicker,
} satisfies Meta<typeof PhoneNumberPicker>;

export default meta;

export const Playground = ({ ...props }: PhoneNumberPickerProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <div style={{ height: '70px', width: '135px' }}>
      <PhoneNumberPicker {...props} value={value} onChange={setValue} />
    </div>
  );
};

Playground.args = {
  labelText: 'Phone',
  id: 'phone-num-picker-test',
};
