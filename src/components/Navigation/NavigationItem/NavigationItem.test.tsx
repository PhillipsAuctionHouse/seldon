import { render, screen } from '@testing-library/react';
import NavigationItem from './NavigationItem';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import userEvent from '@testing-library/user-event';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';
import { MouseEvent } from 'react';

describe('NavigationItem', () => {
  it('renders the navigation item correctly', () => {
    render(<NavigationItem href="/" label="Home" />);

    const navigationItem = screen.getByText('Home');
    expect(navigationItem).toBeInTheDocument();
  });

  it('renders the navigation item with badge correctly', () => {
    render(<NavigationItem href="/" label="Home" badge="New" />);

    const navigationItem = screen.getByText('Home');
    const badge = screen.getByText('• New');
    expect(navigationItem).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });

  it('renders the navigation item with custom class name correctly', () => {
    render(<NavigationItem href="/" label="Home" className="custom-class" />);

    const navigationItem = screen.getByTestId('nav-item-Home');
    expect(navigationItem).toBeInTheDocument();
    expect(navigationItem).toHaveClass('custom-class');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext }}>
        <NavigationItem href="/" label="Home" onClick={onClick} />
      </HeaderContext.Provider>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(onClick).toHaveBeenCalled();
  });

  it('closes the mobile menu when a link is clicked', async () => {
    const closeMenu = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, closeMenu }}>
        <NavigationItem href="/" label="Home" />
      </HeaderContext.Provider>,
    );

    await userEvent.click(screen.getByText('Home'));

    expect(closeMenu).toHaveBeenCalledTimes(1);
  });

  it('does not close the menu for action-only items with no href (e.g. language rows)', async () => {
    const closeMenu = vi.fn();
    const onClick = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, closeMenu }}>
        <NavigationItem label="中文" onClick={onClick} />
      </HeaderContext.Provider>,
    );

    await userEvent.click(screen.getByText('中文'));

    expect(onClick).toHaveBeenCalled();
    expect(closeMenu).not.toHaveBeenCalled();
  });

  it('leaves the menu open on a modified click, which navigates in a new tab', async () => {
    const closeMenu = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, closeMenu }}>
        <NavigationItem href="/" label="Home" />
      </HeaderContext.Provider>,
    );

    // setup() keeps the modifier held across the click; the direct userEvent.* API resets state per call
    const user = userEvent.setup();
    await user.keyboard('{Meta>}');
    await user.click(screen.getByText('Home'));
    await user.keyboard('{/Meta}');

    expect(closeMenu).not.toHaveBeenCalled();
  });

  it('leaves the menu open when onClick prevents the navigation', async () => {
    const closeMenu = vi.fn();
    const onClick = vi.fn((event: MouseEvent<HTMLElement>) => event.preventDefault());

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, closeMenu }}>
        <NavigationItem href="/" label="Home" onClick={onClick} />
      </HeaderContext.Provider>,
    );

    await userEvent.click(screen.getByText('Home'));

    expect(onClick).toHaveBeenCalled();
    expect(closeMenu).not.toHaveBeenCalled();
  });
});
