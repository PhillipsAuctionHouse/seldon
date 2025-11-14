import { render, screen } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';
import { LinkVariants } from '../../Link/types';
import NavigationItemTrigger from '../NavigationItemTrigger/NavigationItemTrigger';
import { px } from '../../../utils';
import userEvent from '@testing-library/user-event';

describe('NavigationList', () => {
  const reqProps = { id: 'test-id' };
  const renderNavList = () => (
    <NavigationList {...reqProps}>
      <NavigationItemTrigger id="auctions" label="Auctions">
        <NavigationList id={`${px}-auction-nav-list`}>
          <NavigationItem
            badge="New York"
            href="#"
            navGroup="nav-link-start"
            navType={LinkVariants.linkLarge}
            label="Editions & Works on Paper"
          />
        </NavigationList>
      </NavigationItemTrigger>
      <NavigationItem href="#" label="Departments" />
    </NavigationList>
  );
  it('renders without error', () => {
    render(renderNavList());
  });

  it('renders children when no left or right section items are present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').children.length).toBe(3);
  });

  it('renders left section items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-start">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-start">
          Large CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-start').length).toBe(2);
  });

  it('renders right section items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-end">
          Small CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-end">
          Small CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-end').length).toBe(2);
  });

  it('renders both left and right section items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-start">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-end">
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-start').length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll('.seldon-nav__item--nav-link-end').length).toBe(1);
  });

  it('calls onClick handler when left section item is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <NavigationList {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-start">
          Large CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls onClick handler when right section item is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <NavigationList {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-end">
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);
    expect(handleClick).toHaveBeenCalled();
  });
});
