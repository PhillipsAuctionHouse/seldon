import { Meta } from '@storybook/react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
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
  const methods = useForm<{ phone: string; countryCode: CountryCode }>({
    defaultValues: { phone: '', countryCode: '' as CountryCode },
  });
  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const countryCode = watch('countryCode');
  const onSubmit = (data: { phone: string; countryCode: CountryCode }) => {
    // Prevent crash, optionally log or show data
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: props.required ? 'Phone number is required' : false }}
          render={({ field }) => (
            <PhoneNumberInput
              {...field}
              countryCode={countryCode}
              handleValueChange={(val, code) => {
                field.onChange(val);
                setValue('countryCode', code);
              }}
              label={props.label || 'Phone Number'}
              required={props.required}
              error={props.error || !!errors.phone}
              errorText={props.errorText || errors.phone?.message}
              disabled={props.disabled}
            />
          )}
        />
      </form>
    </FormProvider>
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

export const InDrawerWithControllerAndValidation = () => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    phoneCountryCode: CountryCode;
  }>({
    defaultValues: {
      firstName: 'Phil',
      lastName: 'Lips',
      phoneNumber: '', // Set to empty string for error testing
      phoneCountryCode: 'US',
    },
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [_, setSubmittedData] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    phoneCountryCode: CountryCode;
  }) => {
    setSubmittedData(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Edit Phone Number">
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '1rem' }}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                labelText="First Name"
                id="first-name"
                invalid={!!errors?.phoneNumber}
                invalidText={errors?.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                labelText="Last Name"
                id="last-name"
                invalid={!!errors?.phoneNumber}
                invalidText={errors?.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <PhoneNumberInput
                value={field.value}
                countryCode={watch('phoneCountryCode') as CountryCode}
                handleValueChange={(val, code) => {
                  field.onChange(val);
                  setValue('phoneCountryCode', code, { shouldValidate: true });
                }}
                error={!!errors?.phoneNumber}
                errorText={errors?.phoneNumber?.message}
              />
            )}
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
