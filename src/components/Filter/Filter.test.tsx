import Filter from './Filter';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';
import FilterHeader from './FilterHeader';
import FilterInput from './FilterInput';

describe('Filter', () => {
  runCommonTests(Filter, 'Filter');

  it('renders the different input types of filter values', () => {
    const handleChange = vi.fn();

    render(
      <Filter name="test">
        <FilterInput
          type="checkbox"
          onChange={handleChange}
          id="test[test1]"
          labelText="Filter 1"
          name="test[test1]"
          checked={true}
        />
        <FilterInput
          type="radio"
          onChange={handleChange}
          id="test[test2]"
          labelText="Filter 2"
          name="test[test2]"
          checked={true}
        />
      </Filter>,
    );

    expect(screen.getAllByText('Filter 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Filter 2')[0]).toBeInTheDocument();

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
        <FilterInput
          type="checkbox"
          onChange={handleChange}
          id="test[test1]"
          labelText="Filter 1"
          name="test[test1]"
          checked={true}
          disabled={true}
        />
      </Filter>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
