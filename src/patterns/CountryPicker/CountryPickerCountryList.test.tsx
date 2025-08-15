import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryPickerCountryList } from './CountryPickerCountryList';
import { Country, toConfig } from './types';
import { createRef } from 'react';

describe('CountryPickerCountryList - Country variant', () => {
  const mockCountries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
  ];
  const mockProps = {
    filteredPrioritized: mockCountries.slice(0, 2),
    groupedCountries: {
      A: [mockCountries[2]],
      B: [mockCountries[3]],
    } as Record<string, Country[]>,
    baseClassName: 'country-picker',
    modalTitle: 'Select a country',
    listRef: createRef<HTMLDivElement>(),
    variantConfig: toConfig(false, 'Canada', vi.fn()),
    inputName: 'country',
  };

  it('renders prioritized countries without headers', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('renders grouped countries with headers', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(radios[1]).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(radios[0]).toHaveFocus();
  });

  it('renders the correct aria-label for the list', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const list = screen.getByRole('radiogroup');
    expect(list).toHaveAttribute('aria-label', mockProps.modalTitle);
  });

  it('applies the correct base class name', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const list = screen.getByRole('radiogroup');
    expect(list).toHaveClass(`${mockProps.baseClassName}__list`);
  });
});

describe('CountryPickerCountryList - Phone variant', () => {
  const mockCountries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
  ];
  const mockProps = {
    filteredPrioritized: mockCountries.slice(0, 2),
    groupedCountries: {
      A: [mockCountries[2]],
      B: [mockCountries[3]],
    } as Record<string, Country[]>,
    baseClassName: 'country-picker',
    modalTitle: 'Select a country',
    listRef: createRef<HTMLDivElement>(),
    variantConfig: toConfig(true, 'CA', vi.fn()),
    inputName: 'country',
  };

  it('renders prioritized countries without headers', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('renders grouped countries with headers', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(radios[1]).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(radios[0]).toHaveFocus();
  });

  it('renders the correct aria-label for the list', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const list = screen.getByRole('radiogroup');
    expect(list).toHaveAttribute('aria-label', mockProps.modalTitle);
  });

  it('applies the correct base class name', () => {
    render(<CountryPickerCountryList {...mockProps} />);
    const list = screen.getByRole('radiogroup');
    expect(list).toHaveClass(`${mockProps.baseClassName}__list`);
  });
});
