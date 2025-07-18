import { fireEvent, render, screen } from '@testing-library/react';
import { Filter } from '../../components/Filter';
import FilterHeader from '../../components/Filter/FilterHeader';
import FilterInput from '../../components/Filter/FilterInput';
import { runCommonTests } from '../../utils/testUtils';
import FilterMenu from './FilterMenu';
import { exampleAuctionLots } from './utils';

const BACK_BUTTON_TEXT = 'Back to all';
const VIEW_ALL_BUTTON_TEXT = 'View All';

describe('exampleAuctionLots', () => {
  it('should be an array with at least 1 lot', () => {
    expect(Array.isArray(exampleAuctionLots)).toBe(true);
    expect(exampleAuctionLots.length).toBeGreaterThan(0);
  });

  it('should have the correct structure for each lot', () => {
    exampleAuctionLots.forEach((lot) => {
      expect(lot).toHaveProperty('id');
      expect(lot).toHaveProperty('lotNumber');
      expect(lot).toHaveProperty('title');
      expect(lot).toHaveProperty('imageSrc');
      expect(lot).toHaveProperty('maker');
      expect(lot).toHaveProperty('price');
      expect(lot).toHaveProperty('collection');
    });
  });

  it('should contain a known lot', () => {
    expect(exampleAuctionLots).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'Sunset Over the Hills', maker: 'John Doe' })]),
    );
  });
});
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
});
