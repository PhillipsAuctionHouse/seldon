import Breadcrumb from './Breadcrumb';
import { runCommonTests } from '../../utils/testUtils';
import { render, screen } from '@testing-library/react';

describe('Breadcrumb component', () => {
  const items = [
    { href: '/modernArt', label: 'Art, Modern to Contemporary' },
    { href: '/new', label: 'New Now (26 Sep 2023)' },
    { href: '/lot1', label: 'Lot 1' },
  ];

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

  it('Does not error out Breadcrumb without items', () => {
    render(<Breadcrumb items={[]} />);
    const navElement = screen.queryByRole('navigation', { name: 'Breadcrumb' });

    expect(navElement).toBeInTheDocument();
  });
});

describe('Breadcrumb', () => {
  runCommonTests(Breadcrumb, 'Breadcrumb');
});
