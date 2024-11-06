import Filter from './Filter';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import FilterHeader from './FilterHeader';
import FilterValue from './FilterValue';

describe('Filter', () => {
  runCommonTests(Filter, 'Filter');

  it('renders the different input types of filter values', () => {
    const handleChange = vi.fn();

    render(
      <Filter>
        <FilterValue label="Filter 1" inputType="checkbox" onChange={handleChange} />
        <FilterValue label="Filter 2" inputType="radio" onChange={handleChange} />
      </Filter>,
    );

    expect(screen.getByText('Filter 1')).toBeInTheDocument();
    expect(screen.getByText('Filter 2')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    const radio = screen.getByRole('radio');

    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(radio).toHaveAttribute('type', 'radio');
  });

  it('renders a filter header', () => {
    render(
      <Filter>
        <FilterHeader label="Filter Header 1" />
      </Filter>,
    );

    expect(screen.getByText('Filter Header 1')).toBeInTheDocument();
  });

  it('should disable filters when disabled prop is passed', () => {
    const handleChange = vi.fn();

    render(
      <Filter>
        <FilterValue label="Filter 1" inputType="checkbox" onChange={handleChange} disabled />
      </Filter>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByText('Filter 1')).toHaveClass('disabled-label');
    expect(checkbox).toBeDisabled();
  });
});
