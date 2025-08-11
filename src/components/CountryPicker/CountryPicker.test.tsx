import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryPicker from './CountryPicker';

describe('CountryPicker Component', () => {
  const defaultProps: React.ComponentProps<typeof CountryPicker> = {
    triggerLabelText: 'Select Country',
    triggerDisplayValue: 'US',
    triggerCountryCallingCode: '+1',
    modalTitle: 'Select a Country',
    searchInputLabel: 'Search for a country',
    searchInputPlaceholder: 'Type to search...',
    selectButtonLabel: 'Select',
    variantConfig: {
      onChange: vi.fn(),
      isPhone: false,
    },
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
});
