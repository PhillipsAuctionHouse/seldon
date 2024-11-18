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
  const mockAction = '/dummy';

  it('should render the "View All" button when there are more than 10 filters', () => {
    render(
      <FilterControl action={mockAction}>
        <Filter name="test">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue
              key={i}
              name={`test[test${i}]`}
              label={`Filter ${i + 1}`}
              inputType="checkbox"
              onChange={handleChange}
              isActive={true}
            />
          ))}
        </Filter>
      </FilterControl>,
    );

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should hide values over viewAllLimit and display those under', () => {
    render(
      <FilterControl action={mockAction}>
        <Filter name="test" viewAllLimit={3}>
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue
              key={i}
              name={`test[test${i}]`}
              label={`Filter ${i + 1}`}
              inputType="checkbox"
              onChange={handleChange}
              isActive={true}
            />
          ))}
        </Filter>
      </FilterControl>,
    );

    const values = screen.getAllByTestId('filter-value');
    expect(values[2]).toBeVisible();
    expect(values[3]).toHaveClass(`${px}-input__label--hidden`);
  });

  it('render the child filter', () => {
    render(
      <FilterControl action={mockAction}>
        <Filter name="test">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue
              key={i}
              name={`test[test${i}]`}
              label={`Filter ${i + 1}`}
              inputType="checkbox"
              onChange={handleChange}
              isActive={true}
            />
          ))}
        </Filter>
        <Filter name="test2">
          <FilterHeader heading="Test Filter 2" />
          <FilterValue
            isActive={true}
            name="test2[test1]"
            label={`Filter 1`}
            inputType="radio"
            onChange={handleChange}
          />
        </Filter>
      </FilterControl>,
    );

    const filter2Value = screen.getAllByTestId('filter')[1];

    // View All button
    fireEvent.click(screen.getByTestId('button'));

    // Back button only for first filter should be displayed
    expect(screen.getAllByText(BACK_BUTTON_TEXT)[0]).toBeVisible();

    // Second filter should no longer be displayed
    expect(filter2Value).toHaveClass(`${px}-filter--hidden`);
  });

  it('should handle the back button click', () => {
    render(
      <FilterControl action={mockAction}>
        <Filter name="test">
          <FilterHeader heading="Test Filter" />
          {filters.map((_, i) => (
            <FilterValue
              key={i}
              name={`test[test${i}]`}
              label={`Filter ${i + 1}`}
              inputType="checkbox"
              onChange={handleChange}
              isActive={true}
            />
          ))}
        </Filter>
      </FilterControl>,
    );

    fireEvent.click(screen.getByText(VIEW_ALL_BUTTON_TEXT));
    fireEvent.click(screen.getByText(BACK_BUTTON_TEXT));

    //wait for transition to be done
    setTimeout(() => {
      expect(screen.getByText(VIEW_ALL_BUTTON_TEXT)).toBeInTheDocument();
    }, 500);
  });

  it('renders multiple filters and has separators', () => {
    render(
      <FilterControl action={mockAction}>
        <Filter name="test" isLast={false}>
          <FilterValue
            name="test[test1]"
            label="Filter 1"
            inputType="checkbox"
            onChange={handleChange}
            isActive={true}
          />
        </Filter>
        <Filter name="test2" isLast={true}>
          <FilterValue
            name="test2[test1]"
            label="Filter 2"
            inputType="checkbox"
            onChange={handleChange}
            isActive={true}
          />
        </Filter>
      </FilterControl>,
    );

    const filters = screen.getAllByTestId('filter');

    expect(filters[0]).toHaveClass(`${px}-has-separators`);
    expect(filters[1]).not.toHaveClass(`${px}-has-separators`);
  });
});
