import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ListPreview from './ListPreview';
import { runCommonTests } from '../../utils/testUtils';

// Mock components and functions
const mockNavigateToList = vi.fn();
const mockOnClickAnalyticsWrapper = vi.fn((callback, eventName) => () => {
  callback();
  return eventName;
});
const MockEditListMenu = () => <div data-testid="edit-list-menu">Edit Menu</div>;

const defaultProps = {
  list: {
    count: 2,
    name: 'New List',
  },
  transformedImageUrl:
    'https://assets.phillips.com/image/upload/t_Website_LotDetailZoomImage/v1742893121/auctions/CH080225/CH080225.jpg',
  isFavorites: false,
  navigateToList: mockNavigateToList,
  onClickAnalyticsWrapper: mockOnClickAnalyticsWrapper,
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

  it('calls navigation function with analytics wrapper when image is clicked', () => {
    render(<ListPreview {...defaultProps} />);

    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);

    expect(mockNavigateToList).toHaveBeenCalledTimes(1);
    expect(mockOnClickAnalyticsWrapper).toHaveBeenCalledWith(mockNavigateToList, 'navigateToList');
  });

  it('uses navigateToFavoritesList event name when in favorites view', () => {
    render(<ListPreview {...defaultProps} isFavorites={true} />);

    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);

    expect(mockOnClickAnalyticsWrapper).toHaveBeenCalledWith(mockNavigateToList, 'navigateToFavoritesList');
  });

  // it('passes custom element type when provided', () => {
  //   const CustomElement = ({ className, children, ...props }) => (
  //     <div data-testid="custom-element" className={className} {...props}>
  //       {children}
  //     </div>
  //   );

  //   render(<ListPreview {...defaultProps} element={CustomElement} />);
  //   expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  // });

  it('passes additional props to the component', () => {
    const testId = 'test-list-preview';
    render(<ListPreview {...defaultProps} data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
