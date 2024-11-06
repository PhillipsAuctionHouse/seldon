import FilterControl from './FilterControl';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterValue from '../../components/Filter/FilterValue';
import { Filter } from '../../components/Filter';
import { px } from '../../utils';

const BACK_BUTTON_TEXT = 'Back to all';
const VIEW_ALL_BUTTON_TEXT = 'View All';

describe('FilterControl', () => {
  runCommonTests(FilterControl, 'FilterControl');
  const handleChange = vi.fn();
  const filters = Array(11).fill(0);

  it('should render the "View All" button when there are more than 10 filters', () => {
    render(
      <FilterControl>
        <Filter>
          <FilterHeader label="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue key={i} label={`Filter ${i + 1}`} inputType="checkbox" onChange={handleChange} />
          ))}
        </Filter>
      </FilterControl>,
    );

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should hide values over viewAllLimit and render those under', () => {
    render(
      <FilterControl>
        <Filter viewAllLimit={3}>
          <FilterHeader label="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue key={i} label={`Filter ${i + 1}`} inputType="checkbox" onChange={handleChange} />
          ))}
        </Filter>
      </FilterControl>,
    );

    const values = screen.getAllByTestId('filter-value');
    expect(values).toHaveLength(3);
  });

  it('render the child filter', () => {
    render(
      <FilterControl>
        <Filter>
          <FilterHeader label="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue key={i} label={`Filter ${i + 1}`} inputType="checkbox" onChange={handleChange} />
          ))}
        </Filter>
        <Filter>
          <FilterHeader label="Test Filter 2" />
          <FilterValue label={`Filter 1`} inputType="radio" onChange={handleChange} />
        </Filter>
      </FilterControl>,
    );

    const filter2Value = screen.getByRole('radio');

    // View All button
    fireEvent.click(screen.getByTestId('button'));

    // Back button should render
    expect(screen.getByText(BACK_BUTTON_TEXT)).toBeInTheDocument();
    // Second filter should no longer be displayed
    expect(filter2Value).not.toBeInTheDocument();
  });

  it('should handle the back button click', () => {
    render(
      <FilterControl>
        <Filter>
          <FilterHeader label="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue key={i} label={`Filter ${i + 1}`} inputType="checkbox" onChange={handleChange} />
          ))}
        </Filter>
      </FilterControl>,
    );

    fireEvent.click(screen.getByText(VIEW_ALL_BUTTON_TEXT));
    fireEvent.click(screen.getByText(BACK_BUTTON_TEXT));

    expect(screen.getByText(VIEW_ALL_BUTTON_TEXT)).toBeInTheDocument();
  });

  it('renders multiple filters and has separators', () => {
    render(
      <FilterControl>
        <Filter isLast={false}>
          <FilterValue label="Filter 1" inputType="checkbox" onChange={handleChange} />
        </Filter>
        <Filter isLast={true}>
          <FilterValue label="Filter 2" inputType="checkbox" onChange={handleChange} />
        </Filter>
      </FilterControl>,
    );

    const filters = screen.getAllByTestId('filter');

    expect(filters[0]).toHaveClass(`${px}-has-separators`);
    expect(filters[1]).not.toHaveClass(`${px}-has-separators`);
  });
});
