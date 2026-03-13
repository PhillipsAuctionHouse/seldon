import React from 'react';
import { render } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';
import { LinkVariants } from '../../Link/types';
import NavigationItemWithSubmenu from '../NavigationItemWithSubmenu/';
import NavigationSubmenu from '../NavigationSubmenu/NavigationSubmenu';
import { px } from '../../../utils';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

function withNavMenuRoot(children: React.ReactNode) {
  return (
    <NavigationMenu.Root>
      {children}
      <NavigationMenu.Viewport data-testid="nav-viewport" />
    </NavigationMenu.Root>
  );
}

describe('NavigationList', () => {
  const reqProps = { id: 'test-id' };
  const renderNavList = () => (
    <NavigationList {...reqProps}>
      <NavigationItemWithSubmenu id="auctions" label="Auctions">
        <NavigationSubmenu id={`${px}-auction-nav-list`}>
          <NavigationItem
            badge="New York"
            href="#"
            navGroup="nav-link-start"
            navType={LinkVariants.linkLarge}
            label="Editions & Works on Paper"
          />
        </NavigationSubmenu>
      </NavigationItemWithSubmenu>
      <NavigationItem href="#" label="Departments" />
    </NavigationList>
  );
  it('renders without error', () => {
    render(
      withNavMenuRoot(<HeaderContext.Provider value={defaultHeaderContext}>{renderNavList()}</HeaderContext.Provider>),
    );
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

  it('sets aria-hidden when isOffScreen is true', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} isOffScreen>
        <NavigationItem href="#" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not set aria-hidden when isOffScreen is false', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} isOffScreen={false}>
        <NavigationItem href="#" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toHaveAttribute('aria-hidden', 'false');
  });

  it('applies offscreen class when isOffScreen is true', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} isOffScreen>
        <NavigationItem href="#" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toHaveClass(`${px}-nav__list--offscreen`);
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} className="custom-class">
        <NavigationItem href="#" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toHaveClass('custom-class');
  });
});
