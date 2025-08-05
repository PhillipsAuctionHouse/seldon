import { render, screen, fireEvent } from '@testing-library/react';
import CountryPickerTrigger from './CountryPickerTrigger';
import { vi } from 'vitest';

describe('CountryPickerTrigger', () => {
  const defaultProps = {
    labelText: 'Country',
    value: 'United States',
    onClick: vi.fn(),
    id: 'country-picker-trigger',
    baseClassName: 'country-picker-trigger',
    countryValue: 'US',
  };

  it('renders the component with default props', () => {
    render(<CountryPickerTrigger {...defaultProps} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    render(<CountryPickerTrigger {...defaultProps} />);
    const button = screen.getByTestId('country-picker-trigger');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders with error state', () => {
    render(<CountryPickerTrigger {...defaultProps} hasError={true} errorMsg="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toHaveClass('country-picker-trigger__trigger-btn--error');
  });

  it('renders with phone mode', () => {
    render(<CountryPickerTrigger {...defaultProps} isPhone={true} countryCode="+1" />);
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByTestId('country-picker-trigger')).toHaveClass('country-picker-trigger__trigger-btn--is-phone');
  });

  it('renders without error message when hasError is false', () => {
    render(<CountryPickerTrigger {...defaultProps} hasError={false} />);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });
});
