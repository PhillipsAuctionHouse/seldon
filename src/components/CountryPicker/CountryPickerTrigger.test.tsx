import { render, screen, fireEvent } from '@testing-library/react';
import CountryPickerTrigger from './CountryPickerTrigger';
import { vi } from 'vitest';
import { getConfigVariant } from './testUtils';

describe('CountryPickerTrigger', () => {
  const baseProps: React.ComponentProps<typeof CountryPickerTrigger> = {
    labelText: 'Country',
    onClick: vi.fn(),
    id: 'country-picker-trigger',
    baseClassName: 'country-picker-trigger',
    displayValue: 'United States',
    variantConfig: getConfigVariant(false),
  } as const;

  const basePhoneProps: React.ComponentProps<typeof CountryPickerTrigger> = {
    labelText: 'Country',
    onClick: vi.fn(),
    id: 'country-picker-trigger',
    baseClassName: 'country-picker-trigger',
    countryCallingCode: '+1',
    displayValue: 'United States',
    variantConfig: getConfigVariant(true),
  } as const;

  it('renders the component with default props', () => {
    render(<CountryPickerTrigger {...baseProps} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    render(<CountryPickerTrigger {...baseProps} />);
    const button = screen.getByTestId('country-picker-trigger');
    fireEvent.click(button);
    expect(baseProps.onClick).toHaveBeenCalled();
  });

  it('renders with error state', () => {
    render(<CountryPickerTrigger {...baseProps} hasError={true} errorMsg="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toHaveClass('country-picker-trigger__trigger-btn--error');
  });

  it('renders without error message when hasError is false', () => {
    render(<CountryPickerTrigger {...baseProps} hasError={false} />);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('renders with phone mode', () => {
    render(<CountryPickerTrigger {...basePhoneProps} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toHaveClass('country-picker-trigger__trigger-btn--is-phone');
  });
});
