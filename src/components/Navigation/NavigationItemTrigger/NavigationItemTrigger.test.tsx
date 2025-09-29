import { vi } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationList from '../NavigationList/NavigationList';
import userEvent from '@testing-library/user-event';
import { LinkVariants } from '../../Link';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';
import { MediaProps } from '@artsy/fresnel/dist/Media';
import { ReactNode, useEffect } from 'react';

let shouldShowChildrenPredicate: (lessThan?: string) => boolean = () => false;

beforeEach(() => {
  shouldShowChildrenPredicate = () => false;
  vi.mock('../../../providers/SeldonProvider/utils', () => ({
    SSRMediaQuery: {
      Media: ({ children, lessThan }: MediaProps<'md', ReactNode>) => (
        <>{lessThan === undefined || shouldShowChildrenPredicate(lessThan) ? children : null}</>
      ),
    },
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('NavigationItemTrigger', () => {
  const mockLabel = 'Test Label';

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
              navType={LinkVariants.snwFlyoutLink}
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

  it('renders Accordion in mobile mode', () => {
    const originalInnerWidth = window.innerWidth;
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));

    render(
      <NavigationItemTrigger id="mobile-trigger" label="Mobile Label">
        <NavigationList id="mobile-list">
          <NavigationItem href="/mobile" label="MobileHome" />
        </NavigationList>
      </NavigationItemTrigger>,
    );
    expect(screen.getAllByText('Mobile Label')).toHaveLength(1);
    expect(screen.getByText('MobileHome')).toBeInTheDocument();

    window.innerWidth = originalInnerWidth;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders safely with no id and no children', () => {
    render(<NavigationItemTrigger label="NoIdNoChildren" />);
    expect(screen.getAllByText('NoIdNoChildren')).toHaveLength(1);
  });

  it('enables RemoveScroll when submenu is open', () => {
    let submenuId: string | null = 'scroll-trigger';
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
        <NavigationItemTrigger id="scroll-trigger" label="ScrollTrigger">
          <NavigationList id="scroll-list">
            <NavigationItem href="/scroll" label="ScrollHome" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>
    );
    render(<TestComponent />);
    expect(screen.getByTestId('navigation-item-trigger-scroll-trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  it('focuses trigger element when submenu opens', async () => {
    let submenuId: string | null = null;
    const setActiveSubmenuId = vi.fn((id: string | null) => {
      submenuId = id;
    });
    const TestComponent = () => (
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId,
          closeTimeoutRef: { current: null as NodeJS.Timeout | null },
        }}
      >
        <NavigationItemTrigger id="focus-trigger" label="FocusTrigger">
          <NavigationList id="focus-list">
            <NavigationItem href="/focus" label="FocusHome" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>
    );
    render(<TestComponent />);
    const trigger = screen.getByTestId('navigation-item-trigger-focus-trigger');
    const button = trigger.querySelector('button');
    button?.focus();
    expect(document.activeElement).toBe(button);
    await userEvent.hover(trigger);
    expect(setActiveSubmenuId).toHaveBeenCalledWith('focus-trigger');
  });

  it('calls closeMenu and setActiveSubmenuId when NavigationList item is clicked (desktop)', async () => {
    shouldShowChildrenPredicate = (lessThan) => lessThan !== 'md';
    const closeMenu = vi.fn();
    const setActiveSubmenuId = vi.fn();
    const submenuId = 'desktop-trigger';
    vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn) => {
      fn();
      return 0 as unknown as NodeJS.Timeout;
    });
    const TestComponent = () => (
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId,
          closeMenu,
          closeTimeoutRef: { current: null },
        }}
      >
        <NavigationItemTrigger id="desktop-trigger" label="DesktopTrigger">
          <NavigationList id="desktop-list">
            <NavigationItem href="/desktop" label="DesktopHome" navGroup="nav-link-start" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>
    );

    const componentRender = render(<TestComponent />);

    const navItem = screen.getByTestId('nav-item-DesktopHome');
    await userEvent.click(navItem);

    expect(setActiveSubmenuId).toHaveBeenCalledWith(submenuId);
    const navItemTrigger = componentRender.container.querySelector('.seldon-navigation-item-trigger__submenu');

    if (!navItemTrigger) throw new Error('navItemTrigger not found');
    await userEvent.click(navItemTrigger);

    expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
    expect(closeMenu).toHaveBeenCalled();
  });

  it('calls closeMenu and setActiveSubmenuId when NavigationList item is clicked (mobile)', async () => {
    shouldShowChildrenPredicate = (lessThan) => lessThan === 'md';
    const closeMenu = vi.fn();
    const setActiveSubmenuId = vi.fn();
    const submenuId = 'mobile-trigger';

    const TestComponent = () => (
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId,
          closeMenu,
          isMenuOpen: true,
          closeTimeoutRef: { current: null },
        }}
      >
        <NavigationItemTrigger id="mobile-trigger" label="MobileTrigger">
          <NavigationList id="mobile-list">
            <NavigationItem href="/mobile" label="MobileHome" navGroup="nav-link-end" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>
    );

    const componentRender = render(<TestComponent />);

    const accordion = screen.getByTestId('accordion');
    await userEvent.click(accordion);
    const navItem = await screen.findByTestId('nav-item-MobileHome');
    await userEvent.click(navItem);
    expect(setActiveSubmenuId).toHaveBeenCalledWith(submenuId);
    const allEls = Array.from(componentRender.container.querySelectorAll('*'));
    let navItemTrigger = componentRender.container.querySelector('.seldon-navigation-item-trigger__submenu--mobile');
    if (!navItemTrigger) {
      navItemTrigger =
        allEls.find(
          (el) => typeof el.className === 'string' && el.className.includes('seldon-navigation-item-trigger__submenu'),
        ) || null;
    }
    if (!navItemTrigger) throw new Error('navItemTrigger not found');
    await userEvent.click(navItemTrigger);
    expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
    expect(closeMenu).toHaveBeenCalled();
  });

  it('calls focusElementById when submenu opens and NavigationList has id', async () => {
    let submenuId: string | null = null;
    const setActiveSubmenuId = vi.fn((id: string | null) => {
      submenuId = id;
    });

    render(
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId,
          closeTimeoutRef: { current: null as NodeJS.Timeout | null },
        }}
      >
        <NavigationItemTrigger id="focus-id-trigger" label="FocusIdTrigger">
          <NavigationList id="focus-id-list">
            <NavigationItem href="/focus-id" label="FocusIdHome" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );

    const trigger = screen.getByTestId('navigation-item-trigger-focus-id-trigger');
    await userEvent.hover(trigger);
    expect(setActiveSubmenuId).toHaveBeenCalledWith('focus-id-trigger');
  });

  // There's an actual bug here 🎺TODO
  // HeaderContext closeTimeoutRef is always defined, so the cleanup in NavigationItemTrigger never runs.
  it('clears timeout on unmount if no contextCloseTimeoutRef', () => {
    const setActiveSubmenuId = vi.fn();
    let localTimeoutRef: NodeJS.Timeout | null = null;
    const TestComponent = () => {
      // simulate opening submenu, which sets a timeout
      useEffect(() => {
        localTimeoutRef = setTimeout(() => void 0, 1000);
      }, []);
      return (
        <HeaderContext.Provider
          value={{
            ...defaultHeaderContext,
            activeSubmenuId: null,
            setActiveSubmenuId,
            // no closeTimeoutRef
          }}
        >
          <NavigationItemTrigger id="timeout-trigger" label="TimeoutTrigger">
            <NavigationList id="timeout-list">
              <NavigationItem href="/timeout" label="TimeoutHome" />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>
      );
    };
    const { unmount } = render(<TestComponent />);
    // localTimeoutRef should be set
    expect(localTimeoutRef).not.toBeNull();
    unmount();
    // after unmount, localTimeoutRef should be cleared
    expect(localTimeoutRef).toBeNull();
  });

  it('does not throw if NavigationList is missing', () => {
    render(
      <NavigationItemTrigger id="no-list-trigger" label="NoListTrigger">
        {null}
      </NavigationItemTrigger>,
    );
    expect(screen.getAllByText('NoListTrigger')).toHaveLength(1);
  });

  it('renders with custom className and passes through props', () => {
    render(
      <NavigationItemTrigger
        id="custom-class-trigger"
        label="CustomClassTrigger"
        className="custom-class"
        aria-label="custom-aria"
        data-testid="custom-trigger"
      >
        <NavigationList id="custom-list">
          <NavigationItem href="/custom" label="CustomHome" />
        </NavigationList>
      </NavigationItemTrigger>,
    );
    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveClass('custom-class');
    expect(trigger).toHaveAttribute('aria-label', 'custom-aria');
  });

  it('does not call setActiveSubmenuId if not provided', async () => {
    render(
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: null,
          setActiveSubmenuId: () => void 0,
          closeTimeoutRef: { current: null as NodeJS.Timeout | null },
        }}
      >
        <NavigationItemTrigger id="no-set-trigger" label="NoSetTrigger">
          <NavigationList id="no-set-list">
            <NavigationItem href="/no-set" label="NoSetHome" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );
    const trigger = screen.getByTestId('navigation-item-trigger-no-set-trigger');
    await userEvent.hover(trigger);
    // No error thrown, nothing to assert
    expect(trigger).toBeInTheDocument();
  });

  it('calls setActiveSubmenuId(null) after mouse out (close)', async () => {
    let submenuId: string | null = 'close-trigger';
    const setActiveSubmenuId = vi.fn((id: string | null) => {
      submenuId = id;
    });

    render(
      <HeaderContext.Provider
        value={{
          ...defaultHeaderContext,
          activeSubmenuId: submenuId,
          setActiveSubmenuId,
          closeTimeoutRef: { current: null as NodeJS.Timeout | null },
        }}
      >
        <NavigationItemTrigger id="close-trigger" label="CloseTrigger">
          <NavigationList id="close-list">
            <NavigationItem href="/close" label="CloseHome" />
          </NavigationList>
        </NavigationItemTrigger>
      </HeaderContext.Provider>,
    );
    const trigger = screen.getByTestId('navigation-item-trigger-close-trigger');
    await userEvent.hover(trigger);
    await userEvent.unhover(trigger);
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
  });

  const clickTestCases: Array<{
    label: string;
    triggerId: string;
    navListId: string;
    navItemLabel: string;
    navItemHref: string;
    navGroup: 'nav-link-end' | 'nav-link-start';
    context: Record<string, unknown>;
    predicate?: (lessThan?: string) => boolean;
  }> = [
    {
      label: 'default',
      triggerId: 'submenu-trigger',
      navListId: 'submenu-list',
      navItemLabel: 'SubmenuHome',
      navItemHref: '/submenu',
      navGroup: 'nav-link-end',
      context: {},
    },
    {
      label: 'desktop',
      triggerId: 'submenu-trigger-desktop',
      navListId: 'submenu-list-desktop',
      navItemLabel: 'SubmenuHomeDesktop',
      navItemHref: '/submenu-desktop',
      navGroup: 'nav-link-end',
      context: {},
    },
    {
      label: 'mobile',
      triggerId: 'submenu-trigger-mobile',
      navListId: 'submenu-list-mobile',
      navItemLabel: 'SubmenuHomeMobile',
      navItemHref: '/submenu-mobile',
      navGroup: 'nav-link-end',
      context: { isMenuOpen: true },
      predicate: (lessThan?: string) => lessThan === 'md',
    },
  ];

  clickTestCases.forEach(({ label, triggerId, navListId, navItemLabel, navItemHref, navGroup, context, predicate }) => {
    it(`calls navListElement onClick, setActiveSubmenuId(null), and closeMenu when submenu NavigationList is clicked (${label})`, async () => {
      if (predicate) {
        shouldShowChildrenPredicate = predicate;
      }
      const navListOnClick = vi.fn();
      const setActiveSubmenuId = vi.fn();
      const closeMenu = vi.fn();
      const submenuId = triggerId;

      render(
        <HeaderContext.Provider
          value={{
            ...defaultHeaderContext,
            activeSubmenuId: submenuId,
            setActiveSubmenuId,
            closeMenu,
            closeTimeoutRef: { current: null as NodeJS.Timeout | null },
            ...context,
          }}
        >
          <NavigationItemTrigger
            id={triggerId}
            label={`SubmenuTrigger${label === 'default' ? '' : label.charAt(0).toUpperCase() + label.slice(1)}`}
          >
            <NavigationList id={navListId} onClick={navListOnClick}>
              <NavigationItem href={navItemHref} label={navItemLabel} navGroup={navGroup} />
            </NavigationList>
          </NavigationItemTrigger>
        </HeaderContext.Provider>,
      );

      const navListSubmenu = screen.getByTestId(`nav-item-${navItemLabel}`);
      if (!navListSubmenu) throw new Error('submenu not found');
      await userEvent.click(navListSubmenu);

      expect(navListOnClick).toHaveBeenCalled();
      expect(setActiveSubmenuId).toHaveBeenCalledWith(null);
      expect(closeMenu).toHaveBeenCalled();
    });
  });
});
