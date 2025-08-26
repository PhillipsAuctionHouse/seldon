import { Meta } from '@storybook/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import PhoneNumberInput, { PhoneNumberInputProps } from './PhoneNumberInput';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import Drawer from '../../components/Drawer/Drawer';
import React from 'react';
import Input from '../../components/Input/Input';

const meta = {
  title: 'Patterns/PhoneNumberInput',
  component: PhoneNumberInput,
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;
export const Playground = (props: PhoneNumberInputProps) => <PhoneNumberInput {...props} />;

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

export const WithReactHookForm = () => {
  const methods = useForm({ defaultValues: { phone: '', countryCode: '' } });
  const { handleSubmit, setValue, watch } = methods;
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };
  const phone = watch('phone');
  const countryCode = watch('countryCode');

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhoneNumberInput
          value={phone}
          countryCode={countryCode}
          onChange={(val, code) => {
            setValue('phone', val);
            setValue('countryCode', code);
          }}
          label="Phone Number"
          required
        />
        <Button type="submit" style={{ marginTop: '1rem' }}>
          Submit form & see validation
        </Button>
      </form>
      <Text style={{ marginTop: '1rem' }}>What we are submitting:</Text>
      <Text>{JSON.stringify({ phone, countryCode }, null, 2)}</Text>
    </FormProvider>
  );
};

export const InDrawerWithController = () => {
  const INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER';
  const currentDetails = { phoneNumber: '' };
  const t = (key: string) => key;
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: currentDetails.phoneNumber,
      phoneCountryCode: 'US',
    },
  });

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Edit Phone Number">
        <form>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} labelText="First Name" id="first-name" />}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} labelText="Last Name" id="last-name" />}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue={currentDetails.phoneNumber}
            render={({ field }) => (
              <PhoneNumberInput
                value={field.value}
                countryCode={watch('phoneCountryCode')}
                onChange={(val, code) => {
                  field.onChange(val);
                  setValue('phoneCountryCode', code, { shouldValidate: true });
                }}
                error={!!errors?.phoneNumber}
                errorText={
                  errors?.phoneNumber?.message === INVALID_PHONE_NUMBER
                    ? t('invalidPhoneNumber')
                    : t('phoneNumberRequired')
                }
              />
            )}
          />
        </form>
      </Drawer>
    </>
  );
};
