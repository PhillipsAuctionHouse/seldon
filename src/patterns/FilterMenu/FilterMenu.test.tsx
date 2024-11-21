import FilterMenu from './FilterMenu';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { Filter } from '../../components/Filter';
import { px } from '../../utils';

const BACK_BUTTON_TEXT = 'Back to all';
const VIEW_ALL_BUTTON_TEXT = 'View All';

describe('FilterMenu', () => {
  runCommonTests(FilterMenu, 'FilterMenu');
  const handleChange = vi.fn();
  const filters = Array(11).fill(0);

  it('should render the "View All" button when there are more than 10 filters', () => {
    render(
      <FilterMenu>
        <Filter name="test">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterInput
              key={i}
              type="checkbox"
              onChange={handleChange}
              id={`test[test${i}]`}
              labelText={`Filter ${i + 1}`}
              name={`test[test${i}]`}
              checked={true}
            />
          ))}
        </Filter>
      </FilterMenu>,
    );

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should hide values over viewAllLimit and display those under', () => {
    render(
      <FilterMenu>
        <Filter name="test" viewAllLimit={3}>
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterInput
              key={i}
              type="checkbox"
              onChange={handleChange}
              id={`test[test${i}]`}
              labelText={`Filter ${i + 1}`}
              name={`test[test${i}]`}
              checked={true}
            />
          ))}
        </Filter>
      </FilterMenu>,
    );

    const filterCheckboxes = screen.getAllByRole('checkbox', { hidden: true });
    expect(filterCheckboxes[2]).toBeVisible();
    expect(filterCheckboxes[3]).toHaveProperty('hidden', true);
  });

  it('render the child filter', () => {
    render(
      <FilterMenu>
        <Filter name="test" id="filter1">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterInput
              key={i}
              type="checkbox"
              onChange={handleChange}
              id={`test[testfilter1${i}]`}
              labelText={`Filter ${i + 1}`}
              name={`test[test${i}]`}
              checked={true}
            />
          ))}
        </Filter>
        <Filter name="test2" id="filter2">
          <FilterHeader heading="Test Filter 2" />
          <FilterInput
            type="radio"
            onChange={handleChange}
            id="testfilter2[test2]"
            labelText="Filter 2"
            name="test[test2]"
            checked={true}
          />
        </Filter>
      </FilterMenu>,
    );

    const filterCheckboxes = screen.getAllByRole('checkbox', { hidden: true });
    expect(filterCheckboxes).toHaveLength(11);
    expect(filterCheckboxes[0]).toBeVisible();
    expect(filterCheckboxes[10]).toHaveProperty('hidden', true);

    // View All button
    fireEvent.click(screen.getByTestId('button'));

    // Back button only for first filter should be displayed
    expect(screen.getAllByText(BACK_BUTTON_TEXT)[0]).toBeVisible();

    // Second filter should be hidden
    const secondFilter = screen.getByTestId('filter-filter2');
    expect(secondFilter).toHaveProperty('hidden', true);
  });

  it('should handle the back button click', async () => {
    render(
      <FilterMenu>
        <Filter name="test">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterInput
              key={i}
              type="checkbox"
              onChange={handleChange}
              id={`test[test${i}]`}
              labelText={`Filter ${i + 1}`}
              name={`test[test${i}]`}
              checked={true}
            />
          ))}
        </Filter>
      </FilterMenu>,
    );

    fireEvent.click(screen.getByText(VIEW_ALL_BUTTON_TEXT));
    fireEvent.click(screen.getByText(BACK_BUTTON_TEXT));

    const button = await screen.findByText(VIEW_ALL_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
  });

  it('renders multiple filters and has separators', () => {
    render(
      <FilterMenu element="form">
        <Filter name="test" hasSeparator={true}>
          <FilterInput
            type="checkbox"
            onChange={handleChange}
            id="test[test1]"
            labelText="Filter 1"
            name="test[test1]"
            checked={true}
          />
        </Filter>
        <Filter name="test2" hasSeparator={false}>
          <FilterInput
            type="checkbox"
            onChange={handleChange}
            id="test2[test1]"
            labelText="Filter 2"
            name="test2[test1]"
            checked={true}
          />
        </Filter>
      </FilterMenu>,
    );

    const filters = screen.getAllByTestId('filter');

    expect(filters[0]).toHaveClass(`${px}-has-separators`);
    expect(filters[1]).not.toHaveClass(`${px}-has-separators`);
  });
});
