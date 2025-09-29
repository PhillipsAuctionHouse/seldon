import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainFilterDropdown } from './MainFilterDropdown';
import { FilterType, FilterButtonType } from './types';

const filters: FilterType[] = [
  {
    id: '1',
    label: 'Sort',
    type: 'checkbox',
    buttonType: FilterButtonType.Sort,
    filterDimensions: new Set([
      { label: 'Ascending', active: false },
      { label: 'Descending', active: true },
    ]),
  },
];

describe('MainFilterDropdown', () => {
  it('renders filter button and drawer', () => {
    render(
      <MainFilterDropdown
        id="main-filter-dropdown"
        filterButtonLabel="Sort"
        filtersListState={[true]}
        filters={filters}
        onSelectFilter={() => void 0}
        onApplyFilter={() => void 0}
        onClickClear={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions' }}
      />,
    );
    expect(screen.getByLabelText('Sort button')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter drawer')).toBeInTheDocument();
  });

  it('calls onSelectFilter when filter input is changed', async () => {
    const onSelectFilter = vi.fn();
    render(
      <MainFilterDropdown
        id="main-filter-dropdown"
        filterButtonLabel="Sort"
        filtersListState={[true]}
        filters={filters}
        onSelectFilter={onSelectFilter}
        onApplyFilter={() => void 0}
        onClickClear={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions' }}
      />,
    );
    const input = screen.getByLabelText('Ascending');
    await userEvent.click(input);
    expect(onSelectFilter).toHaveBeenCalled();
  });

  it('calls onClickClear when clear button is clicked', async () => {
    const onClickClear = vi.fn();
    render(
      <MainFilterDropdown
        id="main-filter-dropdown"
        filterButtonLabel="Sort"
        filtersListState={[true]}
        filters={filters}
        onSelectFilter={() => void 0}
        onApplyFilter={() => void 0}
        onClickClear={onClickClear}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions' }}
      />,
    );
    const clearBtn = screen.getByText('Clear all');
    await userEvent.click(clearBtn);
    expect(onClickClear).toHaveBeenCalledWith('all');
  });

  it('calls onApplyFilter when show auctions button is clicked', async () => {
    const onApplyFilter = vi.fn();
    render(
      <MainFilterDropdown
        id="main-filter-dropdown"
        filterButtonLabel="Sort"
        filtersListState={[true]}
        filters={filters}
        onSelectFilter={() => void 0}
        onApplyFilter={onApplyFilter}
        onClickClear={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions' }}
      />,
    );
    const showBtn = screen.getByText('Show Auctions');
    await userEvent.click(showBtn);
    expect(onApplyFilter).toHaveBeenCalledWith(false);
  });
});
