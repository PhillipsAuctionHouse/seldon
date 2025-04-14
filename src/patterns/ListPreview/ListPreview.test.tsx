import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ListPreview from './ListPreview';
import { runCommonTests } from '../../utils/testUtils';

const defaultProps = {
  list: {
    count: 2,
    name: 'New List',
  },
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
};

describe('ListPreview', () => {
  runCommonTests(ListPreview, 'ListPreview', defaultProps);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders list count and name correctly', () => {
    render(<ListPreview {...defaultProps} />);

    expect(screen.getByText('2 LOTS')).toBeInTheDocument();
    expect(screen.getByText('New List')).toBeInTheDocument();
  });

  it('renders singular LOT text when count is 1', () => {
    const singularProps = {
      ...defaultProps,
      list: {
        count: 1,
        name: 'Single Item List',
      },
    };

    render(<ListPreview {...singularProps} />);
    expect(screen.getByText('1 LOT')).toBeInTheDocument();
  });

  it('shows dropdown menu when not in favorites view', () => {
    render(<ListPreview {...defaultProps} />);
    expect(screen.getByTestId('menu-trigger')).toBeInTheDocument();
  });

  it('hides dropdown menu when in favorites view', () => {
    render(<ListPreview {...defaultProps} isFavorites={true} />);
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('hides dropdown menu when list is empty', () => {
    render(
      <ListPreview
        {...defaultProps}
        list={{
          count: 0,
          name: '',
        }}
      />,
    );
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('it shows the dropdown menu when the edit list button is clicked', () => {
    render(<ListPreview {...defaultProps} />);
    const menuTrigger = screen.getByTestId('menu-trigger');

    act(() => {
      menuTrigger.click();
    });

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('it calles the onDeleteListClick function when the edit list button is clicked', () => {
    const mockOnDeleteListClick = vi.fn();
    render(<ListPreview {...{ ...defaultProps, onDeleteListClick: mockOnDeleteListClick }} />);
    const menuTrigger = screen.getByTestId('menu-trigger');

    act(() => {
      menuTrigger.click();
    });
    const deleteButton = screen.getByText('Delete List');
    act(() => {
      deleteButton.click();
    });
    expect(mockOnDeleteListClick).toHaveBeenCalled();
    expect(mockOnDeleteListClick).toHaveBeenCalledTimes(1);
  });
});
