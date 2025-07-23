import { fireEvent, render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import { FilterButtonDisplay } from './FilterButtonDisplay';
import { FilterDropdownMenu, FilterDropdownMenuDesktop, FilterDropdownMenuMobile } from './FilterDropdownMenu';
import FiltersInline from './FiltersInline';
import { FilterButtonIconType, FilterButtonType } from './types';
import { FilterButtons } from './utils';

describe('FiltersInline', () => {
  runCommonTests(FiltersInline, 'FiltersInline');

  const mockFilters = [
    {
      label: 'Filter',
      id: 'Filter',
      type: 'checkbox',
      filterDimensions: new Set([
        { label: 'Foo', active: false, disabled: false },
        { label: 'Bar', active: false, disabled: false },
      ]),
    },
    {
      label: 'Sort',
      id: 'Sort',
      type: 'radio',
      filterDimensions: new Set([
        { label: 'Ascending', active: false, disabled: false },
        { label: 'Descending', active: false, disabled: false },
      ]),
    },
  ];

  it('should render all the buttons correctly', () => {
    render(<FiltersInline id="filters-inline" filters={mockFilters} filtersLabels={FilterButtons} />);
    const filterButton = screen.getByTestId('filters-inline-Filter-button-filter-button');
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute('data-viewport', 'desktop');
  });

  it('shows filter count on the filter button when filters are active', () => {
    const filtersWithActive = [
      {
        ...mockFilters[0],
        filterDimensions: new Set([
          { label: 'Foo', active: true, disabled: false },
          { label: 'Bar', active: false, disabled: false },
        ]),
      },
      mockFilters[1],
    ];
    render(<FiltersInline id="in-place-filters" filters={filtersWithActive} filtersLabels={FilterButtons} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

describe('FilterButtonDisplay', () => {
  const handleChange = vi.fn();

  function getProps(overrides = {}) {
    return {
      className: 'custom-class',
      label: 'Sort By',
      onClick: handleChange,
      isSelected: false,
      type: 'Sort' as FilterButtonIconType,
      count: 0,
      totalCount: 3,
      id: 'test-id',
      ariaLabel: undefined,
      isMobile: false,
      ...overrides,
    };
  }

  afterEach(() => {
    handleChange.mockClear();
  });

  it('renders the button with correct label and test ids', () => {
    render(<FilterButtonDisplay {...getProps({ type: 'Sort' as FilterButtonIconType })} />);
    expect(screen.getByTestId('test-id-filter-label')).toHaveTextContent('Sort By');
  });

  it('calls onClick when clicked', () => {
    render(<FilterButtonDisplay {...getProps()} />);
    fireEvent.click(screen.getByTestId('test-id-filter-button'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows the filter count when type is Filter and count > 0', () => {
    render(
      <FilterButtonDisplay {...getProps({ type: 'Filter' as FilterButtonIconType, count: 3, label: 'Filter' })} />,
    );
    expect(screen.getByTestId('test-id-filter-count')).toHaveTextContent('3');
  });

  it('renders mobile label when isMobile is true', () => {
    render(<FilterButtonDisplay {...getProps({ isMobile: true, type: 'Sort' })} />);
    const filterButton = screen.getByTestId('test-id-filter-button');
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute('data-viewport', 'mobile');
  });
});

describe('FilterDropdown', () => {
  const handleFilterSelection = vi.fn();
  const handleFilterUpdate = vi.fn();
  const clearFilterUpdate = vi.fn();

  function getProps(overrides = {}) {
    return {
      className: 'custom-class',
      buttonType: FilterButtonType.Sort,
      isMobileDropdown: false,
      filters: [
        {
          label: 'Sort',
          id: 'Sort',
          type: 'radio',
          filterDimensions: new Set([
            { label: 'Ascending', active: false, disabled: false },
            { label: 'Descending', active: false, disabled: false },
          ]),
        },
      ],
      filterIndex: 1,
      handleFilterSelection,
      handleFilterUpdate,
      clearFilterUpdate,
      resultsCount: 5,
      ...overrides,
    };
  }

  afterEach(() => {
    handleFilterSelection.mockClear();
    handleFilterUpdate.mockClear();
    clearFilterUpdate.mockClear();
  });

  it('renders the header and filter inputs', () => {
    render(<FilterDropdownMenu {...getProps()} />);
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByLabelText('Ascending')).toBeInTheDocument();
    expect(screen.getByLabelText('Descending')).toBeInTheDocument();
  });

  it('calls handleFilterSelection when an input is changed', () => {
    render(<FilterDropdownMenu {...getProps()} />);
    fireEvent.click(screen.getByLabelText('Ascending'));
    expect(handleFilterSelection).toHaveBeenCalled();
  });

  it('calls handleFilterUpdate when Confirm button is clicked', () => {
    render(<FilterDropdownMenu {...getProps()} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(handleFilterUpdate).toHaveBeenCalled();
    render(
      <FilterDropdownMenu
        {...getProps({
          buttonType: FilterButtonType.Departments,
          filters: [
            {
              label: 'Departments',
              id: 'Departments',
              type: 'checkbox',
              filterDimensions: new Set([
                { label: 'Foo', active: false, disabled: false },
                { label: 'Bar', active: false, disabled: false },
              ]),
            },
          ],
        })}
      />,
    );
    expect(screen.getByText('Clear all')).toBeInTheDocument();
    expect(screen.getByText('Show 5 Auctions')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clear all'));
    expect(clearFilterUpdate).toHaveBeenCalled();
  });

  it('renders mobile variant', () => {
    render(<FilterDropdownMenuMobile {...getProps({ isMobileDropdown: true })} />);
    expect(screen.getByTestId('filter-dropdown-mobile')).toBeInTheDocument();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('applies custom aria-labels to FilterDropdown', () => {
    render(
      <FilterDropdownMenuDesktop
        {...getProps({
          ariaLabels: { dropdownMobile: 'Custom Mobile', dropdownDesktop: 'Custom Desktop' },
          isMobileDropdown: false,
        })}
      />,
    );
    expect(screen.getByTestId('filter-dropdown-desktop')).toHaveAttribute('aria-label', 'Custom Desktop');
  });
});
