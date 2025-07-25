import { fireEvent, render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import { FilterButton } from './FilterButton';
import { FilterDropdownMenuDesktop } from './FilterDropdownMenuDesktop';
import { FilterDropdownMenuMobile } from './FilterDropdownMenuMobile';
import FiltersInline from './FiltersInline';
import { MainFilterDropdown } from './MainFilterDropdown';
import { SubFilterDropdown } from './SubFilterDropdown';
import { FilterButtonIconType, FilterButtonType, FilterType } from './types';
import { getFilterButtonClickHandler, handleInputChange, resetAllFilters } from './utils';

describe('FiltersInline', () => {
  runCommonTests(FiltersInline, 'FiltersInline');

  it('should render all the buttons correctly', () => {
    render(<FiltersInline id="filters-inline" mainFilterLabel={FilterButtonType.Filter} />);
    const filterButton = screen.getByTestId('filters-inline-Filter-button-filter-button');
    expect(filterButton).toBeInTheDocument();
  });

  const filters: FilterType[] = [
    {
      label: 'Sale',
      id: 'sale',
      type: 'checkbox',
      filterDimensions: new Set([
        { label: 'Foo', active: false },
        { label: 'Bar', active: false },
      ]),
      buttonType: FilterButtonType.Sale,
    },
    {
      label: 'Departments',
      id: 'departments',
      type: 'checkbox',
      filterDimensions: new Set([{ label: 'Baz', active: false }]),
      buttonType: FilterButtonType.Departments,
    },
  ];

  it('renders MainFilterDropdown and all SubFilterDropdowns', () => {
    render(<FiltersInline id="multi-filters" mainFilterLabel={FilterButtonType.Filter} filters={filters} />);
    // MainFilterDropdown
    expect(screen.getByTestId('multi-filters-Filter-button-filter-button')).toBeInTheDocument();
    // SubFilterDropdowns
    expect(screen.getAllByTestId('multi-filters-Sale-button-filter-button').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('multi-filters-Departments-button-filter-button').length).toBeGreaterThan(0);
  });

  it('renders nothing for SubFilterDropdown if filters is empty', () => {
    render(<FiltersInline id="empty-filters-test" mainFilterLabel={FilterButtonType.Filter} filters={[]} />);
    // Only the main filter button should be present
    expect(screen.getByTestId('empty-filters-test-Filter-button-filter-button')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-filters-test-Sale-button-filter-button')).not.toBeInTheDocument();
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
    render(<FilterButton {...getProps({ type: 'Sort' as FilterButtonIconType })} />);
    expect(screen.getByTestId('test-id-filter-label')).toHaveTextContent('Sort By');
  });

  it('calls onClick when clicked', () => {
    render(<FilterButton {...getProps()} />);
    fireEvent.click(screen.getByTestId('test-id-filter-button'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows the filter count when type is Filter and count > 0', () => {
    render(<FilterButton {...getProps({ type: 'Filter' as FilterButtonIconType, count: 3, label: 'Filter' })} />);
    expect(screen.getByTestId('test-id-filter-count')).toHaveTextContent('3');
  });

  it('renders mobile label when isMobile is true', () => {
    render(<FilterButton {...getProps({ isMobile: true, type: 'Sort' })} />);
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
          type: 'radio' as const,
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
    render(
      <FilterDropdownMenuMobile
        {...getProps({ isMobileDropdown: true, filterButtonLabel: 'Sort' })}
        filterButtonLabel="Sort"
      />,
    );
    expect(screen.getByTestId('filter-dropdown-mobile')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
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
      type: 'checkbox' as const,
      buttonType: FilterButtonType.Filter,
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
        onSelectFilter={handleFilterSelection}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
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
        onSelectFilter={handleFilterSelection}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
        resultsCount={2}
        ariaLabels={{ button: 'Filter Button' }}
      />,
    );
    fireEvent.click(screen.getByText(/Clear All/i));
    expect(clearFilterUpdate).toHaveBeenCalledWith('all');
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
        onSelectFilter={handleFilterSelection}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
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
      type: 'radio' as const,
      buttonType: FilterButtonType.Sort,
      filterDimensions: new Set([
        { label: 'Ascending', active: false, disabled: false },
        { label: 'Descending', active: false, disabled: false },
      ]),
    },
  ];

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
        onSelectFilter={handleFilterSelection}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
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
    const handleFilterUpdate = vi.fn();
    const clearFilterUpdate = vi.fn();
    const filters = [
      {
        label: 'Departments',
        id: 'Departments',
        type: 'checkbox' as const,
        buttonType: FilterButtonType.Departments,
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
        onSelectFilter={vi.fn()}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
        resultsCount={7}
        filterButtonLabel="Departments"
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
    const handleFilterUpdate = vi.fn();
    const clearFilterUpdate = vi.fn();
    const filters = [
      {
        label: 'Departments',
        id: 'Departments',
        type: 'checkbox',
        buttonType: FilterButtonType.Departments,
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
        onSelectFilter={vi.fn()}
        onApplyFilter={handleFilterUpdate}
        onClickClear={clearFilterUpdate}
        resultsCount={5}
        filterButtonLabel="Departments"
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

describe('getFilterButtonClickHandler', () => {
  it('calls handleClick with correct toggled state for given filterId', () => {
    const mockState = [false, true, false];
    const mockHandleClick = vi.fn();
    const handler = getFilterButtonClickHandler(mockState, mockHandleClick, 1);

    handler();

    // Only index 1 should be toggled, others set to false
    expect(mockHandleClick).toHaveBeenCalledWith([false, false, false]);
  });

  it('toggles the correct index to true if it was false', () => {
    const mockState = [false, false, false];
    const mockHandleClick = vi.fn();
    const handler = getFilterButtonClickHandler(mockState, mockHandleClick, 2);

    handler();

    expect(mockHandleClick).toHaveBeenCalledWith([false, false, true]);
  });

  it('does nothing if filtersListState is undefined', () => {
    const mockHandleClick = vi.fn();
    const handler = getFilterButtonClickHandler(undefined, mockHandleClick, 0);

    handler();

    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it('does nothing if handleClick is undefined', () => {
    const mockState = [true, false];
    const handler = getFilterButtonClickHandler(mockState, undefined, 0);

    handler();
  });
});

describe('handleInputChange', () => {
  it('calls handleFilterSelection with event and buttonType', () => {
    const mockEvent = { target: { value: 'foo' } } as React.ChangeEvent<HTMLInputElement>;
    const mockHandler = vi.fn();

    handleInputChange(mockEvent, 'Filter', mockHandler);

    expect(mockHandler).toHaveBeenCalledWith(mockEvent, 'Filter');
  });

  it('does nothing if handleFilterSelection is not provided', () => {
    const mockEvent = { target: { value: 'foo' } } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(mockEvent, 'Filter');
  });
});

describe('resetAllFilters', () => {
  it('calls handleClick with all false when filtersListState is defined', () => {
    const mockHandleClick = vi.fn();
    const filtersListState = [true, false, true];
    resetAllFilters(filtersListState, mockHandleClick);
    expect(mockHandleClick).toHaveBeenCalledWith([false, false, false]);
  });

  it('does nothing if filtersListState is undefined', () => {
    const mockHandleClick = vi.fn();
    resetAllFilters(undefined, mockHandleClick);
    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it('does nothing if handleClick is undefined', () => {
    const filtersListState = [true, false, true];
    // Should not throw
    resetAllFilters(filtersListState, undefined);
  });
});
