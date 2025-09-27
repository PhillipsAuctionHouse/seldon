import { vi } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationList from '../NavigationList/NavigationList';
import userEvent from '@testing-library/user-event';
import { LinkVariants } from '../../Link';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';

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
  expect(screen.getAllByText('Mobile Label')).toHaveLength(2);
  expect(screen.getByText('MobileHome')).toBeInTheDocument();

  window.innerWidth = originalInnerWidth;
  window.dispatchEvent(new Event('resize'));
});

it('renders safely with no id and no children', () => {
  render(<NavigationItemTrigger label="NoIdNoChildren" />);
  expect(screen.getAllByText('NoIdNoChildren')).toHaveLength(2);
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
