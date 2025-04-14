import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ListPreview from './ListPreview';
import { runCommonTests } from '../../utils/testUtils';

const MockEditListMenu = () => <div data-testid="edit-list-menu">Edit Menu</div>;

const defaultProps = {
  list: {
    count: 2,
    name: 'New List',
  },
  listImageUrl: 'https://via.placeholder.com/400',
  isFavorites: false,
  EditListMenu: MockEditListMenu,
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

  it('shows EditListMenu when not in favorites view', () => {
    render(<ListPreview {...defaultProps} />);
    expect(screen.getByTestId('edit-list-menu')).toBeInTheDocument();
  });

  it('hides EditListMenu when in favorites view', () => {
    render(<ListPreview {...defaultProps} isFavorites={true} />);
    expect(screen.queryByTestId('edit-list-menu')).not.toBeInTheDocument();
  });

  // it shows the dropdown menu when the edit list button is clicked

  // it calles the onEditListClick function when the edit list button is clicked
});
