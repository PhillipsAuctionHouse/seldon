import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryPicker from './CountryPicker';
import { Country, toConfig } from './types';
import { ComponentProps, useState } from 'react';

describe('CountryPicker Component', () => {
  const defaultProps: React.ComponentProps<typeof CountryPicker> = {
    triggerLabelText: 'Select Country',
    triggerDisplayValue: 'US',
    modalTitle: 'Select a Country',
    searchInputLabel: 'Search for a country',
    searchInputPlaceholder: 'Type to search...',
    selectButtonLabel: 'Select',
    onChange: vi.fn(),
    isPhone: false,
    value: undefined,
  };

  it('renders the trigger button with the correct label', () => {
    render(<CountryPicker {...defaultProps} />);
    expect(screen.getByText('Select Country')).toBeInTheDocument();
  });

  it('opens the modal when the trigger button is clicked', async () => {
    render(<CountryPicker {...defaultProps} />);
    const triggerButton = screen.getByRole('button', { name: 'Select Country' });
    await userEvent.click(triggerButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('displays an error message if hasTriggerError is true', () => {
    render(<CountryPicker {...defaultProps} hasTriggerError={true} triggerErrorMsg="Error occurred" />);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  const StatefulCountryPicker = (
    props: ComponentProps<typeof CountryPicker> & { onChange: ReturnType<typeof vi.fn> },
  ) => {
    const [testValue, setTestValue] = useState<ComponentProps<typeof CountryPicker>['value']>(props.value);

    const handleChange = (v: ComponentProps<typeof CountryPicker>['value']) => {
      setTestValue(v);
      props.onChange(v);
    };
    const typedConfig = props.isPhone
      ? toConfig(true, testValue as Country['code'], handleChange)
      : toConfig(false, testValue as Country['name'], handleChange);
    return <CountryPicker {...props} {...typedConfig} triggerDisplayValue="" />;
  };

  async function selectCountryAndConfirm(
    props: React.ComponentProps<typeof CountryPicker>,
    optionText: string,
    expectedValue: string,
  ) {
    const onChange = vi.fn();
    render(<StatefulCountryPicker {...props} onChange={onChange} />);

    // Open modal
    const triggerButton = screen.getByRole('button', { name: 'Select Country' });
    await userEvent.click(triggerButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    // Select an option
    const option = await screen.findByText(optionText);
    await userEvent.click(option);

    // Click the select button
    const selectButton = screen.getByRole('button', { name: 'Select' });
    await userEvent.click(selectButton);

    // onChange should be called with the selected value
    expect(onChange).toHaveBeenCalledWith(expectedValue);

    const hiddenInput = screen.getByTestId('country-picker-hidden-input');

    // The hidden input should have the updated value
    expect(hiddenInput).toHaveValue(expectedValue);
  }

  it('opens country-mode modal, selects an option, confirms selection, and updates value', async () => {
    await selectCountryAndConfirm(
      { ...defaultProps, ...toConfig(false, undefined, vi.fn()) },
      'Hong Kong',
      'Hong Kong',
    );
  }, 10000);

  it('opens phone-mode modal, selects an option, confirms selection, and updates value', async () => {
    await selectCountryAndConfirm({ ...defaultProps, ...toConfig(true, undefined, vi.fn()) }, 'Hong Kong', 'HK');
  }, 10000);
});
