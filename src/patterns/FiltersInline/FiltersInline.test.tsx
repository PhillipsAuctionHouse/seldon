import { fireEvent, render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import { MainFilterDropdown, SubFilterDropdown } from './FilterButton';
import { FilterButtonDisplay } from './FilterButtonDisplay';
import { FilterDropdownMenuDesktop, FilterDropdownMenuMobile } from './FilterDropdownMenu';
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

  it('renders with no filters gracefully', () => {
    render(<FiltersInline id="empty-filters" filters={[]} filtersLabels={[]} />);
    expect(screen.queryByTestId('empty-filters-Filter-button-filter-button')).not.toBeInTheDocument();
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
          ariaLabels: { dropdownDesktop: 'Custom Desktop' },
          isMobileDropdown: false,
        })}
      />,
    );
    expect(screen.getByTestId('filter-dropdown-desktop')).toHaveAttribute('aria-label', 'Custom Desktop');
  });

  it('renders mobile variant with correct aria-label', () => {
    render(
      <FilterDropdownMenuMobile
        {...getProps({ isMobileDropdown: true, ariaLabels: { dropdownMobile: 'Mobile Dropdown' } })}
      />,
    );
    expect(screen.getByTestId('filter-dropdown-mobile')).toHaveAttribute('aria-label', 'Mobile Dropdown');
  });
});

describe('MainFilterDropdown', () => {
  const handleClick = vi.fn();
  const handleFilterSelection = vi.fn();
  const handleFilterUpdate = vi.fn();
  const clearFilterUpdate = vi.fn();

  const filters = [
    {
      label: 'Filter',
      id: 'Filter',
      type: 'checkbox',
      filterDimensions: new Set([
        { label: 'Foo', active: false, disabled: false },
        { label: 'Bar', active: false, disabled: false },
      ]),
    },
  ];

  it('renders FilterButtonDisplay with correct label and count', () => {
    render(
      <MainFilterDropdown
        id="main-filter"
        filterButtonLabel="Filter"
        filterId={0}
        buttonType={'Filter' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Filter Button' }}
      />,
    );
    expect(screen.getByTestId('main-filter-filter-button')).toHaveTextContent('Filter');
    expect(screen.getByTestId('main-filter-filter-button')).toHaveAttribute('aria-label', 'Filter Button');
  });

  it('calls clearFilterUpdate with "all" when Clear All button is clicked', () => {
    render(
      <MainFilterDropdown
        id="main-filter"
        filterButtonLabel="Filter"
        filterId={0}
        buttonType={'Filter' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Filter Button' }}
      />,
    );
    fireEvent.click(screen.getByText(/Clear All/i));
    expect(clearFilterUpdate).toHaveBeenCalledWith('all');
  });

  it('calls handleFilterUpdate when Show lots button is clicked', () => {
    render(
      <MainFilterDropdown
        id="main-filter"
        filterButtonLabel="Filter"
        filterId={0}
        buttonType={'Filter' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Filter Button' }}
      />,
    );
    fireEvent.click(screen.getByText(/Show 2 lots/i));
    expect(handleFilterUpdate).toHaveBeenCalledWith(false);
  });

  it('calls handleClick to close drawer', () => {
    render(
      <MainFilterDropdown
        id="main-filter"
        filterButtonLabel="Filter"
        filterId={0}
        buttonType={'Filter' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Filter Button' }}
      />,
    );
    // Simulate closing the drawer
    fireEvent.click(screen.getByTestId('main-filter-filter-button'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('SubFilterDropdown', () => {
  const handleClick = vi.fn();
  const handleFilterSelection = vi.fn();
  const handleFilterUpdate = vi.fn();
  const clearFilterUpdate = vi.fn();

  const filters = [
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

  it('renders FilterButtonDisplay with correct label for Sort', () => {
    render(
      <SubFilterDropdown
        id="sub-filter"
        filterButtonLabel="Sort"
        filterId={0}
        buttonType={'Sort' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Sort Button' }}
      />,
    );
    const buttons = screen.getAllByTestId('sub-filter-filter-button');
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons.some((btn) => btn.textContent?.includes('Sort By'))).toBe(true);
    expect(buttons.some((btn) => btn.getAttribute('aria-label') === 'Sort Button')).toBe(true);
  });

  it('calls handleClick when FilterButtonDisplay is clicked', () => {
    render(
      <SubFilterDropdown
        id="sub-filter"
        filterButtonLabel="Sort"
        filterId={0}
        buttonType={'Sort' as FilterButtonType}
        handleClick={handleClick}
        filtersListState={[true]}
        filters={filters}
        handleFilterSelection={handleFilterSelection}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Sort Button' }}
      />,
    );
    const buttons = screen.getAllByTestId('sub-filter-filter-button');
    buttons.forEach((btn) => fireEvent.click(btn));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('FilterDropdownMenuDesktop non-sort buttons', () => {
  it('renders and handles Clear all and Show Auctions buttons', () => {
    const clearFilterUpdate = vi.fn();
    const handleFilterUpdate = vi.fn();
    const filters = [
      {
        label: 'Departments',
        id: 'Departments',
        type: 'checkbox',
        filterDimensions: new Set([
          { label: 'Foo', active: false, disabled: false },
          { label: 'Bar', active: false, disabled: false },
        ]),
      },
    ];

    render(
      <FilterDropdownMenuDesktop
        buttonType="Departments"
        filters={filters}
        filterIndex={0}
        handleFilterSelection={vi.fn()}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={7}
      />,
    );

    expect(screen.getByText('Clear all')).toBeInTheDocument();
    expect(screen.getByText('Show 7 Auctions')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear all'));
    expect(clearFilterUpdate).toHaveBeenCalledWith('Departments');

    fireEvent.click(screen.getByText('Show 7 Auctions'));
    expect(handleFilterUpdate).toHaveBeenCalledWith(false);
  });
});

describe('FilterDropdownMenuMobile non-sort buttons', () => {
  it('renders and handles Clear all and Show Auctions buttons', () => {
    const clearFilterUpdate = vi.fn();
    const handleFilterUpdate = vi.fn();
    const filters = [
      {
        label: 'Departments',
        id: 'Departments',
        type: 'checkbox',
        filterDimensions: new Set([
          { label: 'Foo', active: false, disabled: false },
          { label: 'Bar', active: false, disabled: false },
        ]),
      },
    ];

    render(
      <FilterDropdownMenuMobile
        buttonType="Departments"
        filters={filters}
        filterIndex={0}
        handleFilterSelection={vi.fn()}
        handleFilterUpdate={handleFilterUpdate}
        clearFilterUpdate={clearFilterUpdate}
        resultsCount={5}
      />,
    );

    expect(screen.getByText('Clear all')).toBeInTheDocument();
    expect(screen.getByText('Show 5 Auctions')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear all'));
    expect(clearFilterUpdate).toHaveBeenCalledWith('Departments');

    fireEvent.click(screen.getByText('Show 5 Auctions'));
    expect(handleFilterUpdate).toHaveBeenCalledWith(false);
  });
});
