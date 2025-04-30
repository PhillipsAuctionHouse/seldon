import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runCommonTests } from '../../utils/testUtils';
import FavoritesCollectionTile from './FavoritesCollectionTile';

const defaultProps = {
  id: 'favorites-collection-tile-1',
  count: 2,
  name: 'New List',
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
};
const blankListProps = {
  id: 'favorites-collection-tile-2',
  listImageUrl: 'https://via.placeholder.com/400',
  isLists: true,
  count: 0,
  name: '',
};
const emptyListProps = {
  id: 'favorites-collection-tile-3',
  listImageUrl: 'https://via.placeholder.com/400',
  count: 0,
  name: 'Test List',
  isLists: true,
};
const translationedProps = {
  id: 'favorites-collection-tile-4',
  listImageUrl: 'https://via.placeholder.com/400',
  count: 0,
  name: '某人列表',
  isLists: true,
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
    render(<FavoritesCollectionTile {...defaultProps} />);

    expect(screen.getByText('2 LOTS')).toBeInTheDocument();
    expect(screen.getByText('New List')).toBeInTheDocument();
  });

  it('renders singular LOT text when count is 1', () => {
    const singularProps = {
      ...defaultProps,
      count: 1,
      name: 'Single Item List',
    };

    render(<FavoritesCollectionTile {...singularProps} />);
    expect(screen.getByText('1 LOT')).toBeInTheDocument();
  });

  it('shows dropdown menu when not in favorites view', () => {
    render(<FavoritesCollectionTile {...defaultProps} />);
    expect(screen.getByTestId('menu-trigger')).toBeInTheDocument();
  });

  it('hides dropdown menu when in favorites view', () => {
    render(<FavoritesCollectionTile {...defaultProps} isFavorites={true} />);
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('hides dropdown menu when list is empty', () => {
    render(<FavoritesCollectionTile {...defaultProps} count={0} name="" />);
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });

  it('it shows the dropdown menu when the edit list button is clicked', () => {
    render(<FavoritesCollectionTile {...defaultProps} />);
    const menuTrigger = screen.getByTestId('menu-trigger');

    act(() => {
      menuTrigger.click();
    });

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('it calles the onDeleteListClick function when the edit list button is clicked', () => {
    const mockOnDeleteListClick = vi.fn();
    render(<FavoritesCollectionTile {...{ ...defaultProps, onDelete: mockOnDeleteListClick }} />);
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

  it('it shows the blank list elements when the list is blank', () => {
    render(<FavoritesCollectionTile {...blankListProps} />);
    expect(screen.getByText('Create your first List.')).toBeInTheDocument();
    expect(screen.queryByText('New List')).not.toBeInTheDocument();
  });

  it('it shows the correct empty list when data is provided', () => {
    render(<FavoritesCollectionTile {...emptyListProps} />);
    expect(screen.getByText('You have not added any objects to your List yet.')).toBeInTheDocument();
  });

  it('it shows the correct translation text when formatlotStr is provided', () => {
    render(<FavoritesCollectionTile {...translationedProps} />);
    expect(screen.getByText('列表中有 0 件拍品')).toBeInTheDocument();
    expect(screen.getByText('创建您的第一个列表')).toBeInTheDocument();
  });
});
