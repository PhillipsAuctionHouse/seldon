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
  { href: '/lot1', label: 'Lot 1' },
];

describe('Breadcrumb component', () => {
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
      expect(linkElement).toHaveTextContent(item.label);

      if (index === 2) {
        expect(linkElement).toHaveAttribute('aria-current', 'page');
        expect(linkElement).toHaveAttribute('href', '');
      } else {
        expect(linkElement).toHaveAttribute('aria-current', 'false');
        expect(linkElement).toHaveAttribute('href', item.href);
      }
    });
  });

  it('truncates specific item based on truncateIndex', () => {
    render(<Breadcrumb items={items} truncateIndex={1} truncateLength={15} />);

    // Check if the truncated item is displayed correctly
    const truncatedItem = screen.getByText(/Modern & Contem.../i);
    expect(truncatedItem).toBeInTheDocument();

    // Check that the full item is not rendered
    const fullLabelItem = screen.queryByText(/Modern & Contemporary Art Evening Sale - Test3/i);
    expect(fullLabelItem).not.toBeInTheDocument();
  });

  it('does not truncate if truncateIndex is not provided', () => {
    render(<Breadcrumb items={items} />);

    // Check that the full long label is rendered
    const fullLabelItem = screen.getByText(/Modern & Contemporary Art Evening Sale - Test3/i);
    expect(fullLabelItem).toBeInTheDocument();
  });

  test('renders breadcrumb items in desktop view', () => {
    setWindowWidth(1024); // Simulate desktop width
    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Art, Modern to Contemporary')).toBeInTheDocument();
    expect(screen.getByText('Lot 1')).toBeInTheDocument();
  });
});
