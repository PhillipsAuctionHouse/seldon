import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runCommonTests } from '../../utils/testUtils';
import FavoritesCollectionTile from './FavoritesCollectionTile';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  id: 'favorites-collection-tile-1',
  count: 2,
  name: 'New List',
  imageSrc: 'https://via.placeholder.com/400',
};
const blankListProps = {
  id: 'favorites-collection-tile-2',
  imageSrc: 'https://via.placeholder.com/400',
  count: 0,
  name: '',
};
const emptyListProps = {
  id: 'favorites-collection-tile-3',
  imageSrc: 'https://via.placeholder.com/400',
  count: 0,
  name: 'Test List',
};
const translationedProps = {
  id: 'favorites-collection-tile-4',
  imageSrc: 'https://via.placeholder.com/400',
  count: 0,
  name: '某人列表',
  emptyListsText: '创建您的第一个列表',
  formatlotStr: (count: number) => {
    return `列表中有 ${count} 件拍品`;
  },
};
describe('FavoritesCollectionTile', () => {
  runCommonTests(FavoritesCollectionTile, 'FavoritesCollectionTile');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders list count and name correctly', () => {
    render(<FavoritesCollectionTile {...{ ...defaultProps, variant: 'lists' }} />);

    expect(screen.getByText('2 LOTS')).toBeInTheDocument();
    expect(screen.getByText('New List')).toBeInTheDocument();
  });

  it('renders singular LOT text when count is 1', () => {
    const singularProps = {
      ...defaultProps,
      count: 1,
      name: 'Single Item List',
    };

    render(<FavoritesCollectionTile {...singularProps} variant="lists" />);
    expect(screen.getByText('1 LOT')).toBeInTheDocument();
  });

  it('does not show dropdown menu in favorites view', () => {
    render(<FavoritesCollectionTile {...defaultProps} variant="favorites" />);
    expect(screen.queryByTestId('menu-trigger')).not.toBeInTheDocument();
  });

  it('hides dropdown menu when in favorites view', () => {
    render(<FavoritesCollectionTile {...defaultProps} variant="favorites" />);
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('hides dropdown menu when list is empty', () => {
    render(<FavoritesCollectionTile {...defaultProps} count={0} name="" variant="lists" />);
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('shows the dropdown menu when the edit list button is clicked', () => {
    render(<FavoritesCollectionTile {...defaultProps} variant="lists" />);
    const menuTrigger = screen.getByTestId('menu-trigger');

    act(() => {
      menuTrigger.click();
    });

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('calles the onDeleteListClick function when the delete button is clicked', () => {
    const mockOnDeleteListClick = vi.fn();
    render(<FavoritesCollectionTile {...{ ...defaultProps, onDelete: mockOnDeleteListClick, variant: 'lists' }} />);
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

  it('shows the blank list elements when the list is blank', () => {
    render(<FavoritesCollectionTile {...blankListProps} variant="create" />);
    expect(screen.getByText('Create your first List.')).toBeInTheDocument();
    expect(screen.queryByText('New List')).not.toBeInTheDocument();
  });

  it('shows the correct empty list when data is provided', () => {
    render(<FavoritesCollectionTile {...emptyListProps} variant="lists" />);
    expect(screen.getByText('You have not added any objects to your List yet.')).toBeInTheDocument();
  });

  it('shows the correct translation text when formatlotStr is provided', () => {
    render(<FavoritesCollectionTile {...translationedProps} variant="lists" />);
    expect(screen.getByText('列表中有 0 件拍品')).toBeInTheDocument();
    expect(screen.getByText('创建您的第一个列表')).toBeInTheDocument();
  });

  it('calls the onEdit function when the edit list button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<FavoritesCollectionTile {...{ ...defaultProps, onEdit: mockOnEdit, variant: 'lists' }} />);
    const menuTrigger = screen.getByTestId('menu-trigger');

    act(() => {
      menuTrigger.click();
    });

    const editButton = screen.getByText('Edit List');
    act(() => {
      editButton.click();
    });

    expect(mockOnEdit).toHaveBeenCalled();
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls formatlotStr and displays its output correctly', () => {
    const mockFormatlotStr = vi.fn((count) => `Formatted: ${count}`);
    render(<FavoritesCollectionTile {...{ ...defaultProps, formatlotStr: mockFormatlotStr, variant: 'lists' }} />);
    expect(screen.getByText('Formatted: 2')).toBeInTheDocument();
    expect(mockFormatlotStr).toHaveBeenCalledWith(2);
  });
  it('renders a button for the create variant with correct aria-label and calls onClick', () => {
    const onClick = vi.fn();
    render(<FavoritesCollectionTile {...blankListProps} variant="create" onClick={onClick} />);
    const button = screen.getByRole('button', { name: /lists/i });
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('aria-label', 'Lists');
    button.focus();
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
  it('renders the image with correct alt and src when not empty and not create variant', () => {
    render(<FavoritesCollectionTile {...defaultProps} variant="lists" />);
    const img = screen.getByAltText(defaultProps.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultProps.imageSrc);
  });
  it('renders the empty state for favorites variant when count is 0', () => {
    render(<FavoritesCollectionTile {...{ ...defaultProps, count: 0 }} variant="favorites" />);
    const container = screen.getByTestId('favorites');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Favorites');
    expect(screen.getByText('You have not added any objects to your Favorites yet.')).toBeInTheDocument();
  });

  it('opens the popover menu when pressing Enter on the menu trigger', async () => {
    render(<FavoritesCollectionTile {...defaultProps} variant="lists" />);
    const menuTrigger = screen.getByTestId('menu-trigger');
    menuTrigger.focus();
    await userEvent.keyboard('{Enter}');
    // The dropdown menu should now be visible
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });
  it('calls onClick when pressing Enter or Space on the create variant', async () => {
    const onClick = vi.fn();
    render(<FavoritesCollectionTile {...blankListProps} variant="create" onClick={onClick} />);
    const tile = screen.getByTestId('list');
    tile.focus();

    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
