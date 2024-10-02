import Breadcrumb from './Breadcrumb';
import { render, screen } from '@testing-library/react';

// Mock window.innerWidth
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
    // Resize the window for tests
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024, // Start as desktop
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 768,
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders Breadcrumb with items', () => {
    render(<Breadcrumb items={items} />);

    const navElement = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const listItems = screen.getAllByRole('listitem');

    expect(navElement).toBeInTheDocument();
    expect(listItems).toHaveLength(items.length);

    items.forEach((item, index) => {
      const linkElement = listItems[index].querySelector('a');

      if (index !== 2) {
        expect(linkElement).toHaveTextContent(item.label);
        expect(linkElement).toHaveAttribute('aria-current', 'false');
        expect(linkElement).toHaveAttribute('href', item.href);
      }
    });
  });

  it('truncates specific item based on truncateIndex', () => {
    render(<Breadcrumb items={items} truncateIndex={1} />);
    // Check that the full item is rendered for screen readers
    const truncatedItem = screen.getByRole('listitem', { name: 'Modern & Contemporary Art Evening Sale - Test3' });
    expect(truncatedItem).toBeInTheDocument();
    expect(truncatedItem).toHaveClass('seldon-breadcrumb--truncate');
    const fullLabelItem = screen.getByRole('listitem', { name: 'Art, Modern to Contemporary' });
    expect(fullLabelItem).toBeInTheDocument();
    expect(fullLabelItem).not.toHaveClass('seldon-breadcrumb--truncate');
  });

  it('does not truncate if truncateIndex is not provided', () => {
    render(<Breadcrumb items={items} />);

    const truncatedItem = screen.getByRole('listitem', { name: 'Modern & Contemporary Art Evening Sale - Test3' });
    expect(truncatedItem).toBeInTheDocument();
    expect(truncatedItem).not.toHaveClass('seldon-breadcrumb--truncate');
  });

  test('renders breadcrumb items in desktop view', () => {
    // Simulate desktop width
    setWindowWidth(1024);
    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Art, Modern to Contemporary')).toBeInTheDocument();
    expect(screen.getByText('Lot 1')).toBeInTheDocument();
  });

  test('renders back button in mobile view', () => {
    render(<Breadcrumb {...reqProps} items={items} />);

    // Check if back button is rendered
    const backButton = screen.getByTestId('test-id-back-button');
    expect(backButton).toBeInTheDocument();
    // Check for default href if no second item
    expect(backButton).toHaveAttribute('href', '/new');
    // Check if SVG icon is rendered
    expect(backButton.querySelector('svg')).toBeInTheDocument();
  });

  test('last item is not a link', () => {
    render(<Breadcrumb items={items} />);

    const lastItem = screen.getByText('Lot 1');
    expect(lastItem).toBeInTheDocument();
    // Ensure the last item is a <span>, not a link
    expect(lastItem.tagName).toBe('SPAN');
  });
});
