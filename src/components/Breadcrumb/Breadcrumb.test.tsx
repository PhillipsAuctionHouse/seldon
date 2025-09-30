import Breadcrumb from './Breadcrumb';
import { render, screen } from '@testing-library/react';

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
};

const items = [
  { href: '/modernArt', label: 'Art, Modern to Contemporary' },
  { href: '/new', label: 'Modern & Contemporary Art Evening Sale - Test3' },
  { label: 'Lot 1' },
];

describe('Breadcrumb component', () => {
  const reqProps = { id: 'test-id' };

  beforeEach(() => {
    setWindowWidth(1024);
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 768,
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders breadcrumb items in desktop view', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Art, Modern to Contemporary')).toBeInTheDocument();
    expect(screen.getByText('Lot 1')).toBeInTheDocument();
  });

  it('renders back button in mobile view', () => {
    setWindowWidth(375);
    render(<Breadcrumb {...reqProps} items={items} />);
    const backButton = screen.getByTestId('test-id-back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/new');
    expect(backButton.querySelector('svg')).toBeInTheDocument();
  });

  it.each([
    [
      [
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Current', href: '/current' },
      ],
      '/section',
    ],
    [[{ label: 'Home', href: '/' }, { label: 'Section' }, { label: 'Current', href: '/current' }], '/'],
  ])('renders back button with correct href', (breadcrumbItems, expectedHref) => {
    render(<Breadcrumb id="test-breadcrumb" items={breadcrumbItems} />);
    const backButton = screen.getByTestId('test-breadcrumb-back-button');
    expect(backButton).toHaveAttribute('href', expectedHref);
  });

  it.each([
    [undefined, false],
    [1, true],
  ])('truncates item at index %s', (truncateIndex, shouldTruncate) => {
    render(<Breadcrumb items={items} truncateIndex={truncateIndex} />);
    const truncatedItem = screen.getByRole('listitem', { name: 'Modern & Contemporary Art Evening Sale - Test3' });
    if (shouldTruncate) {
      expect(truncatedItem).toHaveClass('seldon-breadcrumb--truncate');
    } else {
      expect(truncatedItem).not.toHaveClass('seldon-breadcrumb--truncate');
    }
  });

  it('renders Breadcrumb with items', () => {
    render(<Breadcrumb items={items} />);
    const navElement = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(navElement).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(items.length);
  });

  it('last item is not a link', () => {
    render(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Lot 1');
    expect(lastItem.tagName).toBe('SPAN');
  });
});
