import { render } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';

describe('NavigationList', () => {
  it('renders without error', () => {
    render(<NavigationList />);
  });

  it('renders children when no large or small CTA items are present', () => {
    const { getByTestId } = render(
      <NavigationList>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </NavigationList>,
    );

    expect(getByTestId('nav-list')).toBeInTheDocument();
    expect(getByTestId('nav-list').children.length).toBe(3);
  });

  it('renders large CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('nav-list')).toBeInTheDocument();
    expect(getByTestId('nav-list').querySelectorAll('.nav-link-lg').length).toBe(2);
  });

  it('renders small CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('nav-list')).toBeInTheDocument();
    expect(getByTestId('nav-list').querySelectorAll('.nav-link-sm').length).toBe(2);
  });

  it('renders both large and small CTA items when present', () => {
    const { getByTestId } = render(
      <NavigationList>
        <NavigationItem href="#" navGroup="nav-link-lg">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-sm">
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('nav-list')).toBeInTheDocument();
    expect(getByTestId('nav-list').querySelectorAll('.nav-link-lg').length).toBe(1);
    expect(getByTestId('nav-list').querySelectorAll('.nav-link-sm').length).toBe(1);
  });
});
