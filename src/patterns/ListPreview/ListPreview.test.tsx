import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListPreview from './ListPreview';
import { runCommonTests } from '../../utils/testUtils';

// Mock components and functions
const mockNavigateToList = jest.fn();
const mockOnClickAnalyticsWrapper = jest.fn((callback, eventName) => (event) => {
  callback();
  return eventName;
});
const MockEditListMenu = ({ list }) => <div data-testid="edit-list-menu">Edit Menu</div>;

const defaultProps = {
  list: {
    count: 2,
    name: 'New List',
  },
  transformedImageUrl: 'https://example.com/image.jpg',
  isFavorites: false,
  navigateToList: mockNavigateToList,
  onClickAnalyticsWrapper: mockOnClickAnalyticsWrapper,
  EditListMenu: MockEditListMenu,
};

describe('ListPreview', () => {
  // Run common tests provided by your utils
  runCommonTests(ListPreview, 'ListPreview', defaultProps);

  beforeEach(() => {
    jest.clearAllMocks();
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
    
    // Find the SeldonImage - we would need to adjust this selector based on how SeldonImage renders
    const image = screen.getByRole('img');
    fireEvent.click(image);
    
    expect(mockNavigateToList).toHaveBeenCalledTimes(1);
    expect(mockOnClickAnalyticsWrapper).toHaveBeenCalledWith(
      mockNavigateToList,
      'navigateToList'
    );
  });
  
  it('uses navigateToFavoritesList event name when in favorites view', () => {
    render(<ListPreview {...defaultProps} isFavorites={true} />);
    
    const image = screen.getByRole('img');
    fireEvent.click(image);
    
    expect(mockOnClickAnalyticsWrapper).toHaveBeenCalledWith(
      mockNavigateToList,
      'navigateToFavoritesList'
    );
  });

  it('passes custom element type when provided', () => {
    const CustomElement = ({ className, children, ...props }) => (
      <div data-testid="custom-element" className={className} {...props}>
        {children}
      </div>
    );
    
    render(<ListPreview {...defaultProps} element={CustomElement} />);
    expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  });

  it('passes additional props to the component', () => {
    const testId = 'test-list-preview';
    render(<ListPreview {...defaultProps} data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});