import { vi } from 'vitest';
import { screen, render, act, fireEvent } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationList from '../NavigationList/NavigationList';
import userEvent from '@testing-library/user-event';
import { LinkVariants } from '../../Link';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';
import * as utils from '../../../utils';

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
      <NavigationItemTrigger id="test-trigger" label="test" onClick={onClick}>
        <NavigationList id="test-list-down">
          <NavigationItem href="/" label="Home" onClick={onClick} />
        </NavigationList>
      </NavigationItemTrigger>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should open on hover and close once a link is clicked', () => {
    const onClick = vi.fn();

    vi.useFakeTimers();
    let submenuId: string | null = null;

    const TestComponent = () => (
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId: (id: string | null) => {
            submenuId = id;
          },
          closeTimeoutRef: { current: null as NodeJS.Timeout | null },
        }}
      >
        <NavigationItemTrigger id="test-trigger" label="test-trigger" onClick={onClick}>
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
      </HeaderContext.Provider>
    );

    const { rerender } = render(<TestComponent />);

    const navigationTrigger = screen.getByTestId('navigation-item-trigger-test-trigger');
    screen.getByTestId('nav-item-Home');
    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');

    act(() => {
      void userEvent.hover(navigationTrigger as HTMLLIElement);
    });
    submenuId = 'test-trigger';

    rerender(<TestComponent />);

    act(() => {
      vi.runAllTimers();
    });

    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'true');

    act(() => {
      onClick();
    });

    expect(onClick).toHaveBeenCalledTimes(1);

    submenuId = null;

    rerender(<TestComponent />);

    act(() => {
      vi.runAllTimers();
    });

    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');

    vi.useRealTimers();
  });

  it('clears pending close timeout when opening submenu', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const timeoutId = setTimeout(() => {}, 200);

    render(
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: null,
          setActiveSubmenuId: vi.fn(),
          closeTimeoutRef: { current: timeoutId },
        }}
      >
        <NavigationItemTrigger id="trigger-1" label="Nav">
          <NavigationList id="list-1">
            <NavigationItem href="/" label="Item" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    await userEvent.hover(trigger as HTMLLIElement);

    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutId);
    clearTimeoutSpy.mockRestore();
  });

  it('cleans up local timeout on unmount when context does not provide closeTimeoutRef', () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const setActiveSubmenuId = vi.fn();
    const contextValue = {
      ...defaultHeaderContext,
      setActiveSubmenuId,
      closeTimeoutRef: undefined as unknown as React.RefObject<NodeJS.Timeout | null>,
    };

    const { unmount } = render(
      <HeaderContext.Provider value={contextValue}>
        <NavigationItemTrigger id="trigger-1" label="Nav">
          <NavigationList id="list-1">
            <NavigationItem href="/" label="Item" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    act(() => {
      fireEvent.mouseOver(trigger);
    });
    act(() => {
      fireEvent.mouseOut(trigger);
    });
    act(() => {
      unmount();
    });

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });

  it('does not call focusElementById when NavigationList has no id', () => {
    const focusSpy = vi.spyOn(utils, 'focusElementById').mockImplementation(() => {});

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId: vi.fn() }}>
        <NavigationItemTrigger id="trigger-1" label="Nav">
          <NavigationList id="">
            <NavigationItem href="/" label="Item" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    act(() => {
      fireEvent.mouseOver(trigger);
    });

    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('calls setActiveSubmenuId with null when id is undefined', () => {
    const setActiveSubmenuId = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId }}>
        <NavigationItemTrigger label="Nav">
          <NavigationList id="list-1">
            <NavigationItem href="/" label="Item" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger');
    act(() => {
      fireEvent.mouseOver(trigger);
    });

    expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
  });

  it('works with callback ref without throwing on hover', () => {
    const refCallback = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, setActiveSubmenuId: vi.fn() }}>
        <NavigationItemTrigger ref={refCallback} id="trigger-1" label="Nav">
          <NavigationList id="list-1">
            <NavigationItem href="/" label="Item" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger-trigger-1');
    act(() => {
      fireEvent.mouseOver(trigger);
    });

    expect(refCallback).toHaveBeenCalled();
  });
});
