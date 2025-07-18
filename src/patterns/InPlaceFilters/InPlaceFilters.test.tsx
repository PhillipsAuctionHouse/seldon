import { fireEvent, render, screen } from '@testing-library/react';
import { runCommonTests } from '../../utils/testUtils';
import { FilterButtonDisplay } from './FilterButtonDisplay';
import { FilterDropdown } from './FilterDropdown';
import InPlaceFilters from './InPlaceFilters';
import { AuctionFilterButtonTypes } from './types';
import { FilterButtons } from './utils';

describe('InPlaceFilters', () => {
  runCommonTests(InPlaceFilters, 'InPlaceFilters');

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
    render(<InPlaceFilters id="in-place-filters" filters={mockFilters} filtersLabels={FilterButtons} />);

    expect(screen.getByTestId('in-place-filters-Filter-button-Filter-label-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('in-place-filters-Sort-button-Sort-label-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('in-place-filters-Sort-button-Sort-label-mobile')).toBeInTheDocument();
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
    render(<InPlaceFilters id="in-place-filters" filters={filtersWithActive} filtersLabels={FilterButtons} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

describe('FilterButtonDisplay', () => {
  const handleChange = vi.fn();

  function getProps(overrides = {}) {
    return {
      className: 'custom-class',
      isButtonSelected: false,
      filterCount: 0,
      totalCount: 0,
      buttonType: 'Sort',
      filterButtonLabel: 'Sort',
      buttonLabel: 'Sort By',
      id: 'test-id',
      handleFilterButtonClick: handleChange,
      isMobileDropdown: false,
      ...overrides,
    };
  }

  afterEach(() => {
    handleChange.mockClear();
  });

  it('renders the button with correct label and test ids', () => {
    render(<FilterButtonDisplay {...getProps()} />);
    expect(screen.getByTestId('test-id-Sort')).toBeInTheDocument();
    expect(screen.getByTestId('test-id-Sort-label-desktop')).toHaveTextContent('Sort By');
  });

  it('calls handleFilterButtonClick when clicked', () => {
    render(<FilterButtonDisplay {...getProps()} />);
    fireEvent.click(screen.getByTestId('test-id-Sort'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows the filter count when buttonType is Filter and totalCount > 0', () => {
    render(
      <FilterButtonDisplay
        {...getProps({ buttonType: 'Filter', totalCount: 3, filterCount: 2, buttonLabel: 'Filter' })}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders mobile label when isMobileDropdown is true', () => {
    render(<FilterButtonDisplay {...getProps({ isMobileDropdown: true })} />);
    expect(screen.getByTestId('test-id-Sort-label-mobile')).toBeInTheDocument();
  });
});

describe('FilterDropdown', () => {
  const handleFilterSelection = vi.fn();
  const handleFilterUpdate = vi.fn();
  const clearFilterUpdate = vi.fn();

  function getProps(overrides = {}) {
    return {
      className: 'custom-class',
      buttonType: 'Sort' as AuctionFilterButtonTypes,
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
    render(<FilterDropdown {...getProps()} />);
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByLabelText('Ascending')).toBeInTheDocument();
    expect(screen.getByLabelText('Descending')).toBeInTheDocument();
  });

  it('calls handleFilterSelection when an input is changed', () => {
    render(<FilterDropdown {...getProps()} />);
    fireEvent.click(screen.getByLabelText('Ascending'));
    expect(handleFilterSelection).toHaveBeenCalled();
  });

  it('calls handleFilterUpdate when Confirm button is clicked', () => {
    render(<FilterDropdown {...getProps()} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(handleFilterUpdate).toHaveBeenCalled();
    render(
      <FilterDropdown
        {...getProps({
          buttonType: 'Departments' as AuctionFilterButtonTypes,
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
    render(<FilterDropdown {...getProps({ isMobileDropdown: true })} />);
    expect(screen.getByTestId('filter-dropdown-mobile')).toBeInTheDocument();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('applies custom aria-labels to FilterDropdown', () => {
    render(
      <FilterDropdown
        {...getProps({
          ariaLabels: { dropdownMobile: 'Custom Mobile', dropdownDesktop: 'Custom Desktop' },
          isMobileDropdown: false,
        })}
      />,
    );
    expect(screen.getByTestId('filter-dropdown-desktop')).toHaveAttribute('aria-label', 'Custom Desktop');
  });
});
