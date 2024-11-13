import { screen, render } from '@testing-library/react';
import NavigationItemTrigger from './NavigationItemTrigger';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationList from '../NavigationList/NavigationList';
import userEvent from '@testing-library/user-event';
import { LinkVariants } from '../../Link';

describe('NavigationItemTrigger', () => {
  // const mockHandleSelection = vi.fn();
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

  it('should open on hover and close once a link is clicked', async () => {
    const onClick = vi.fn();

    render(
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
      </NavigationItemTrigger>,
    );

    const navigationTrigger = screen.getByTestId('navigation-item-trigger-test-trigger');
    const navigationItem = screen.getByTestId('nav-item-Home');

    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');
    // Simulate hover to open submenu
    await userEvent.hover(navigationTrigger as HTMLLIElement);
    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'true');

    // Simulate click to close submenu
    await userEvent.click(navigationItem as HTMLLIElement);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(navigationTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});
