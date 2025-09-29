import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterDropdownMenuMobile } from './FilterDropdownMenuMobile';
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

describe('FilterDropdownMenuMobile', () => {
  it('renders filter inputs and buttons', async () => {
    render(
      <FilterDropdownMenuMobile
        buttonType={FilterButtonType.Sort}
        filterButtonLabel="Sort"
        filters={filters}
        filterIndex={1}
        onApplyFilter={() => void 0}
        onClickClear={() => void 0}
        onSelectFilter={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions', confirm: 'Confirm' }}
      />,
    );
    expect(screen.getByLabelText('Sort dropdown mobile')).toBeInTheDocument();
    expect(screen.getByLabelText('Ascending')).toBeInTheDocument();
    expect(screen.getByLabelText('Descending')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('calls onSelectFilter when filter input is changed', async () => {
    const onSelectFilter = vi.fn();
    render(
      <FilterDropdownMenuMobile
        buttonType={FilterButtonType.Sort}
        filterButtonLabel="Sort"
        filters={filters}
        filterIndex={1}
        onApplyFilter={() => void 0}
        onClickClear={() => void 0}
        onSelectFilter={onSelectFilter}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions', confirm: 'Confirm' }}
      />,
    );
    const input = screen.getByLabelText('Ascending');
    await userEvent.click(input);
    expect(onSelectFilter).toHaveBeenCalled();
  });

  it('calls onClickClear when clear button is clicked', async () => {
    const onClickClear = vi.fn();
    render(
      <FilterDropdownMenuMobile
        buttonType={FilterButtonType.Filter}
        filterButtonLabel="Filter"
        filters={filters}
        filterIndex={1}
        onApplyFilter={() => void 0}
        onClickClear={onClickClear}
        onSelectFilter={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions', confirm: 'Confirm' }}
      />,
    );
    const clearBtn = screen.getByText('Clear all');
    await userEvent.click(clearBtn);
    expect(onClickClear).toHaveBeenCalledWith('Filter');
  });

  it('calls onApplyFilter when show auctions button is clicked', async () => {
    const onApplyFilter = vi.fn();
    render(
      <FilterDropdownMenuMobile
        buttonType={FilterButtonType.Sale}
        filterButtonLabel="Sale"
        filters={filters}
        filterIndex={1}
        onApplyFilter={onApplyFilter}
        onClickClear={() => void 0}
        onSelectFilter={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions', confirm: 'Confirm' }}
      />,
    );
    const showBtn = screen.getByText('Show Auctions');
    await userEvent.click(showBtn);
    expect(onApplyFilter).toHaveBeenCalledWith(false);
  });

  it('calls onApplyFilter when confirm button is clicked for sort', async () => {
    const onApplyFilter = vi.fn();
    render(
      <FilterDropdownMenuMobile
        buttonType={FilterButtonType.Sort}
        filterButtonLabel="Sort"
        filters={filters}
        filterIndex={1}
        onApplyFilter={onApplyFilter}
        onClickClear={() => void 0}
        onSelectFilter={() => void 0}
        resultsCount={5}
        dropdownMenuTranslation={{ clearAll: 'Clear all', showAuctions: 'Show Auctions', confirm: 'Confirm' }}
      />,
    );
    const confirmBtn = screen.getByText('Confirm');
    await userEvent.click(confirmBtn);
    expect(onApplyFilter).toHaveBeenCalledWith(false);
  });
});
