import React, { useState } from 'react';
import { vi } from 'vitest';
import { screen, render, act, fireEvent, waitFor } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationList from '../NavigationList/NavigationList';
import userEvent from '@testing-library/user-event';
import { LinkVariants } from '../../Link';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';
import * as utils from '../../../utils';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

/** Wraps trigger-with-submenu in Radix Root + Viewport so desktop branch does not throw */
function withNavMenuRoot(children: React.ReactNode) {
  return (
    <NavigationMenu.Root>
      {children}
      <NavigationMenu.Viewport data-testid="nav-viewport" />
    </NavigationMenu.Root>
  );
}

describe('NavigationItemTrigger', () => {
  const mockLabel = 'Test Label';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the label correctly', () => {
    render(<NavigationItemTrigger data-testid={`nav-trigger`} label={mockLabel} />);

    expect(screen.queryByTestId(/nav-trigger/)).toBeInTheDocument();
    expect(screen.queryByTestId(/nav-trigger/)?.textContent).toEqual(mockLabel);
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();

    render(
      withNavMenuRoot(
        <HeaderContext.Provider value={defaultHeaderContext}>
          <NavigationItemTrigger id="test-trigger" label="test" onClick={onClick}>
            <NavigationList id="test-list-down">
              <NavigationItem href="/" label="Home" onClick={onClick} />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      ),
    );

    // Use mobile branch: open accordion then click link (desktop submenu content may not be in DOM until open)
    const accordionTrigger = screen.getByTestId('accordion-item-test-trigger-trigger');
    await userEvent.click(accordionTrigger);
    const navigationItem = await screen.findByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders submenu trigger with correct initial aria-expanded', () => {
    render(
      withNavMenuRoot(
        <HeaderContext.Provider
          value={{
            ...defaultHeaderContext,
            activeSubmenuId: null,
            setActiveSubmenuId: vi.fn(),
          }}
        >
          <NavigationItemTrigger id="test-trigger" label="test-trigger">
            <NavigationList id="test-list-down">
              <NavigationItem
                badge="New York"
                href="#"
                navGroup="nav-link-start"
                navType={LinkVariants.linkLarge}
                label="Home"
              />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      ),
    );

    const navigationTrigger = screen.getByTestId('navigation-item-trigger-test-trigger');
    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not call focusElementById when NavigationList has no id', () => {
    const focusSpy = vi.spyOn(utils, 'focusElementById').mockImplementation(() => {});

    render(
      withNavMenuRoot(
        <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId: vi.fn() }}>
          <NavigationItemTrigger id="trigger-1" label="Nav">
            <NavigationList id="">
              <NavigationItem href="/" label="Item" />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      ),
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    act(() => {
      fireEvent.mouseOver(trigger);
    });

    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('renders trigger without id and is hoverable', () => {
    render(
      withNavMenuRoot(
        <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId: vi.fn() }}>
          <NavigationItemTrigger label="Nav">
            <NavigationList id="list-1">
              <NavigationItem href="/" label="Item" />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      ),
    );

    const trigger = screen.getByTestId('navigation-item-trigger');
    expect(trigger).toBeInTheDocument();
    act(() => {
      fireEvent.mouseOver(trigger);
    });
  });

  it('works with callback ref without throwing on hover', () => {
    const refCallback = vi.fn();

    render(
      withNavMenuRoot(
        <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId: vi.fn() }}>
          <NavigationItemTrigger ref={refCallback} id="trigger-1" label="Nav">
            <NavigationList id="list-1">
              <NavigationItem href="/" label="Item" />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      ),
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    act(() => {
      fireEvent.mouseOver(trigger);
    });

    expect(refCallback).toHaveBeenCalled();
  });

  it('closes submenu after clicking a link in it', async () => {
    const setActiveSubmenuId = vi.fn();
    function TestWrapper() {
      const [value, setValue] = useState<string>('test-trigger');
      return (
        <NavigationMenu.Root value={value} onValueChange={(v) => setValue(v ?? '')}>
          <HeaderContext.Provider
            value={{
              ...defaultHeaderContext,
              setActiveSubmenuId: (id: string | null) => {
                setActiveSubmenuId(id);
                setValue('');
              },
            }}
          >
            <NavigationItemTrigger id="test-trigger" label="Auctions">
              <NavigationList id="auctions-submenu">
                <NavigationItem
                  href="/auctions"
                  label="View Auctions"
                  navGroup="nav-link-start"
                  navType={LinkVariants.linkLarge}
                />
              </NavigationList>
            </NavigationItemTrigger>
          </HeaderContext.Provider>
          <NavigationMenu.Viewport data-testid="nav-viewport" />
        </NavigationMenu.Root>
      );
    }

    render(<TestWrapper />);

    const trigger = screen.getByTestId('navigation-item-trigger-test-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const link = screen.getByRole('link', { name: /view auctions/i });
    await userEvent.click(link);

    await waitFor(() => {
      expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
