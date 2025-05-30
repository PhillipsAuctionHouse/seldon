import { Meta } from '@storybook/react';
import PhoneNumberPicker, { PhoneNumberPickerProps } from './PhoneNumberPicker';

const meta = {
  title: 'Components/PhoneNumberPicker',
  component: PhoneNumberPicker,
} satisfies Meta<typeof PhoneNumberPicker>;

export default meta;

export const Playground = ({ ...props }: PhoneNumberPickerProps) => {
  return (
    <div style={{ height: '70px', width: '135px' }}>
      <PhoneNumberPicker {...props} />
    </div>
  );
};

Playground.args = {
  labelText: 'Phone',
  id: 'phone-num-picker-test',
};
