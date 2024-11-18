import Filter from './Filter';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import FilterHeader from './FilterHeader';
import FilterValue from './FilterValue';
import { px } from '../../utils';

describe('Filter', () => {
  runCommonTests(Filter, 'Filter');

  it('renders the different input types of filter values', () => {
    const handleChange = vi.fn();

    render(
      <Filter name="test">
        <FilterValue name="test[test1]" label="Filter 1" inputType="checkbox" onChange={handleChange} isActive={true} />
        <FilterValue name="test[test2]" label="Filter 2" inputType="radio" onChange={handleChange} isActive={true} />
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
      <Filter name="test">
        <FilterHeader heading="Filter Header 1" />
      </Filter>,
    );

    expect(screen.getByText('Filter Header 1')).toBeInTheDocument();
  });

  it('should disable filters when disabled prop is passed', () => {
    const handleChange = vi.fn();

    render(
      <Filter name="test">
        <FilterValue
          name="test[test1]"
          label="Filter 1"
          inputType="checkbox"
          onChange={handleChange}
          disabled
          isActive={true}
        />
      </Filter>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByText('Filter 1')).toHaveClass(`${px}-filter-value-disabled-label`);
    expect(checkbox).toBeDisabled();
  });
});
