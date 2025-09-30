import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runCommonTests } from '../../utils/testUtils';
import FavoritesCollectionTile from './FavoritesCollectionTile';
import userEvent from '@testing-library/user-event';

const sharedProps = {
  id: 'favorites-collection-tile-1',
  imageSrc: 'https://via.placeholder.com/400',
};

describe('FavoritesCollectionTile', () => {
  runCommonTests(FavoritesCollectionTile, 'FavoritesCollectionTile');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    { count: 2, name: 'New List', expectedText: '2 LOTS', variant: 'lists' },
    { count: 1, name: 'Single Item List', expectedText: '1 LOT', variant: 'lists' },
  ] as const)('renders $expectedText and $name for count $count', ({ count, name, expectedText, variant }) => {
    render(<FavoritesCollectionTile {...sharedProps} count={count} name={name} variant={variant} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it.each([
    { variant: 'favorites', count: 2, name: 'New List', testId: 'menu-trigger', shouldExist: false },
    { variant: 'favorites', count: 2, name: 'New List', testId: 'favorites', shouldExist: false },
    { variant: 'lists', count: 0, name: '', testId: 'favorites', shouldExist: false },
  ] as const)('dropdown menu visibility for variant $variant', ({ variant, count, name, testId, shouldExist }) => {
    render(<FavoritesCollectionTile {...sharedProps} count={count} name={name} variant={variant} />);
    if (shouldExist) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    }
  });

  it('shows the dropdown menu when the edit list button is clicked', () => {
    render(<FavoritesCollectionTile {...sharedProps} count={2} name="New List" variant="lists" />);
    const menuTrigger = screen.getByTestId('menu-trigger');
    act(() => {
      menuTrigger.click();
    });
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('opens the popover menu when pressing Enter on the menu trigger', async () => {
    render(<FavoritesCollectionTile {...sharedProps} count={2} name="New List" variant="lists" />);
    const menuTrigger = screen.getByTestId('menu-trigger');
    menuTrigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('calls the onDeleteListClick function when the delete button is clicked', () => {
    const mockOnDeleteListClick = vi.fn();
    render(
      <FavoritesCollectionTile
        {...sharedProps}
        count={2}
        name="New List"
        onDelete={mockOnDeleteListClick}
        variant="lists"
      />,
    );
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

  it('calls the onEdit function when the edit list button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<FavoritesCollectionTile {...sharedProps} count={2} name="New List" onEdit={mockOnEdit} variant="lists" />);
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

  it('shows the blank list elements when the list is blank', () => {
    render(<FavoritesCollectionTile {...sharedProps} count={0} name="" variant="create" />);
    expect(screen.getByText('Create your first List.')).toBeInTheDocument();
    expect(screen.queryByText('New List')).not.toBeInTheDocument();
  });

  it('shows the correct empty list when data is provided', () => {
    render(<FavoritesCollectionTile {...sharedProps} count={0} name="Test List" variant="lists" />);
    expect(screen.getByText('You have not added any objects to your List yet.')).toBeInTheDocument();
  });

  it('renders the empty state for favorites variant when count is 0', () => {
    render(<FavoritesCollectionTile {...sharedProps} count={0} name="New List" variant="favorites" />);
    const container = screen.getByTestId('favorites');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Favorites');
    expect(screen.getByText('You have not added any objects to your Favorites yet.')).toBeInTheDocument();
  });

  it('shows the correct translation text when formatlotStr is provided', () => {
    render(
      <FavoritesCollectionTile
        id="favorites-collection-tile-4"
        imageSrc="https://via.placeholder.com/400"
        count={0}
        name="某人列表"
        emptyListsText="创建您的第一个列表"
        formatlotStr={(count: number) => `列表中有 ${count} 件拍品`}
        variant="lists"
      />,
    );
    expect(screen.getByText('列表中有 0 件拍品')).toBeInTheDocument();
    expect(screen.getByText('创建您的第一个列表')).toBeInTheDocument();
  });

  it('calls formatlotStr and displays its output correctly', () => {
    const mockFormatlotStr = vi.fn((count) => `Formatted: ${count}`);
    render(
      <FavoritesCollectionTile
        {...sharedProps}
        count={2}
        name="New List"
        formatlotStr={mockFormatlotStr}
        variant="lists"
      />,
    );
    expect(screen.getByText('Formatted: 2')).toBeInTheDocument();
    expect(mockFormatlotStr).toHaveBeenCalledWith(2);
  });

  it('renders a button for the create variant with correct aria-label and calls onClick', () => {
    const onClick = vi.fn();
    render(<FavoritesCollectionTile {...sharedProps} count={0} name="" variant="create" onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Create your first List.' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Create your first List.');
    button.focus();
    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick when pressing Enter or Space on the create variant', async () => {
    const onClick = vi.fn();
    render(<FavoritesCollectionTile {...sharedProps} count={0} name="" variant="create" onClick={onClick} />);
    const tile = screen.getByTestId('create-list');
    tile.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('renders the correct aria-label for the create variant', () => {
    render(
      <FavoritesCollectionTile {...sharedProps} count={0} name="" variant="create" createFirstListText="Create List" />,
    );
    const button = screen.getByTestId('create-list');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Create List');
  });

  it('renders the correct aria-label for the favorites empty state', () => {
    render(
      <FavoritesCollectionTile
        {...sharedProps}
        count={0}
        name="New List"
        variant="favorites"
        favoritesAriaLabel="Favorites Empty State"
      />,
    );
    const container = screen.getByTestId('favorites');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Favorites Empty State');
  });

  it('renders the correct aria-label for the lists empty state', () => {
    render(
      <FavoritesCollectionTile
        {...sharedProps}
        count={0}
        name="Test List"
        variant="lists"
        emptyListAriaLabel="Empty Lists State"
      />,
    );
    const container = screen.getByTestId('empty-list');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Empty Lists State');
  });

  it('renders the correct aria-label for a list with data', () => {
    render(
      <FavoritesCollectionTile
        {...sharedProps}
        count={2}
        name="New List"
        variant="lists"
        listAriaLabel="List with Data"
      />,
    );
    const container = screen.getByTestId('list');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'List with Data');
  });

  it('renders the image with correct alt and src when not empty and not create variant', () => {
    render(<FavoritesCollectionTile {...sharedProps} count={2} name="New List" variant="lists" />);
    const img = screen.getByAltText('New List');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', sharedProps.imageSrc);
  });
});
