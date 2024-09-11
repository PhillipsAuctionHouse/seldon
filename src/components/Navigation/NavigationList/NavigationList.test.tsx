import { render } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';
import { LinkVariants } from '../../Link/types';
import NavigationItemTrigger from '../NavigationItemTrigger/NavigationItemTrigger';
import { px } from '../../../utils';

describe('NavigationList', () => {
  const reqProps = { id: 'test-id' };
  const renderNavList = () => (
    <NavigationList {...reqProps}>
      <NavigationItemTrigger id="auctions" label="Auctions">
        <NavigationList id={`${px}-auction-nav-list`}>
          <NavigationItem
            badge="New York"
            href="#"
            navGroup="nav-link-left"
            navType={LinkVariants.snwFlyoutLink}
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
        <NavigationItem href="#" navGroup="nav-link-left">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-left">
          Large CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-left').length).toBe(2);
  });

  it('renders right section items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-right">
          Small CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-right">
          Small CTA 2
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-right').length).toBe(2);
  });

  it('renders both left and right section items when present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps}>
        <NavigationItem href="#" navGroup="nav-link-left">
          Large CTA 1
        </NavigationItem>
        <NavigationItem href="#" navGroup="nav-link-right">
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(getByTestId('test-id').querySelectorAll('.nav-link-left').length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll('.nav-link-right').length).toBe(1);
  });
});
