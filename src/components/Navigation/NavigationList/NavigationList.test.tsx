import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationList from './NavigationList';
import NavigationItem from '../NavigationItem/NavigationItem';
import { LinkVariants } from '../../Link/types';
import NavigationItemTrigger from '../NavigationItemTrigger/NavigationItemTrigger';
import { px } from '../../../utils';
import userEvent from '@testing-library/user-event';
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

  it('renders left section heading when provided', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(screen.getByText('Left Section')).toBeInTheDocument();
  });

  it('renders right section heading when provided', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
      </NavigationList>,
    );

    expect(getByTestId('test-id')).toBeInTheDocument();
    expect(screen.getByText('Right Section')).toBeInTheDocument();
  });

  it('renders both section headings when provided', () => {
    render(
      <NavigationList {...reqProps} leftSectionHeading="Left Section" rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 2" />
      </NavigationList>,
    );

    expect(screen.getByText('Left Section')).toBeInTheDocument();
    expect(screen.getByText('Right Section')).toBeInTheDocument();
  });

  it('does not render left section heading when no left section items are present', () => {
    render(
      <NavigationList {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
      </NavigationList>,
    );

    expect(screen.queryByText('Left Section')).not.toBeInTheDocument();
  });

  it('does not render right section heading when no right section items are present', () => {
    render(
      <NavigationList {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
      </NavigationList>,
    );

    expect(screen.queryByText('Right Section')).not.toBeInTheDocument();
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

  it('calls both onClick handler and item onClick when left section item is clicked', async () => {
    const handleClick = vi.fn();
    const itemOnClick = vi.fn();

    render(
      <NavigationList {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-start" onClick={itemOnClick}>
          Large CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(handleClick).toHaveBeenCalled();
    expect(itemOnClick).toHaveBeenCalled();
  });

  it('calls both onClick handler and item onClick when right section item is clicked', async () => {
    const handleClick = vi.fn();
    const itemOnClick = vi.fn();

    render(
      <NavigationList {...reqProps} onClick={handleClick}>
        <NavigationItem label="Home" href="#" navGroup="nav-link-end" onClick={itemOnClick}>
          Small CTA 1
        </NavigationItem>
      </NavigationList>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(handleClick).toHaveBeenCalled();
    expect(itemOnClick).toHaveBeenCalled();
  });

  it('renders only left section when only left section items are present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} leftSectionHeading="Left Section">
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-start" label="Item 2" />
      </NavigationList>,
    );

    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--start`).length).toBe(1);
    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--end`).length).toBe(0);
  });

  it('renders only right section when only right section items are present', () => {
    const { getByTestId } = render(
      <NavigationList {...reqProps} rightSectionHeading="Right Section">
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 1" />
        <NavigationItem href="#" navGroup="nav-link-end" label="Item 2" />
      </NavigationList>,
    );

    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--start`).length).toBe(0);
    expect(getByTestId('test-id').querySelectorAll(`.${px}-nav__list__section--end`).length).toBe(1);
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
