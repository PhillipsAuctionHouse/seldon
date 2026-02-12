import { Meta } from '@storybook/react-vite';
import PhoneNumberInput, { PhoneNumberInputProps } from './PhoneNumberInput';
import Button from '../../components/Button/Button';
import Drawer from '../../components/Drawer/Drawer';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { CountryCode } from './types';

const meta = {
  title: 'Patterns/PhoneNumberInput',
  component: PhoneNumberInput,
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;

export const Playground = (props: Partial<PhoneNumberInputProps>) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('' as CountryCode);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (props.required && !phone) {
      setError('Phone number is required');
    } else {
      setError('');
      alert(JSON.stringify({ phone, countryCode }, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhoneNumberInput
        value={phone}
        countryCode={countryCode}
        handleValueChange={(val, code) => {
          setPhone(val);
          setCountryCode(code);
        }}
        label={props.label || 'Phone Number'}
        required={props.required}
        error={!!error}
        errorText={error}
        disabled={props.disabled}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

Playground.args = {
  value: '',
  countryCode: '',
  label: 'Phone Number',
  required: false,
  disabled: false,
  error: false,
  errorText: '',
};

Playground.argTypes = {
  value: { control: 'text', description: 'The phone number value' },
  countryCode: { control: 'text', description: 'The country code value' },
  label: { control: 'text', description: 'The label for the input field' },
  required: { control: 'boolean', description: 'Whether the input is required' },
  disabled: { control: 'boolean', description: 'Whether the input is disabled' },
  error: { control: 'boolean', description: 'Error message for the input' },
  errorText: { control: 'text', description: 'Detailed error text for the input' },
};

export const InDrawerWithValidation = () => {
  const [firstName, setFirstName] = useState('Phil');
  const [lastName, setLastName] = useState('Lips');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>('US');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      firstName: firstName ? '' : 'First name is required',
      lastName: lastName ? '' : 'Last name is required',
      phoneNumber: phoneNumber ? '' : 'Phone number is required',
    };
    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.lastName && !newErrors.phoneNumber) {
      alert(JSON.stringify({ firstName, lastName, phoneNumber, phoneCountryCode }, null, 2));
    }
  };

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Edit Phone Number">
        <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: '100%' }}>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            labelText="First Name"
            id="first-name"
            invalid={!!errors.firstName}
            invalidText={errors.firstName}
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            labelText="Last Name"
            id="last-name"
            invalid={!!errors.lastName}
            invalidText={errors.lastName}
          />
          <PhoneNumberInput
            value={phoneNumber}
            countryCode={phoneCountryCode}
            handleValueChange={(val, code) => {
              setPhoneNumber(val);
              setPhoneCountryCode(code);
            }}
            error={!!errors.phoneNumber}
            errorText={errors.phoneNumber}
          />
          <Button type="submit" style={{ marginTop: '1rem' }}>
            Submit form
          </Button>
          <p style={{ marginTop: '1rem' }}>
            Notes: <br /> 1. Will only validate if there is text in phone input, not if the number is valid. <br /> 2.
            Name inputs will error for style comparison.
          </p>
        </form>
      </Drawer>
    </>
  );
};
