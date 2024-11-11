import { render, screen } from '@testing-library/react';
import NavigationItem from './NavigationItem';
import { HeaderContext } from '../../../site-furniture/Header/Header';
import userEvent from '@testing-library/user-event';
import { defaultHeaderContext } from '../../../site-furniture/Header/utils';

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

  it('calls closeMenu, closeSubmenu, and onClick when clicked', async () => {
    const closeMenu = vi.fn();
    const onClick = vi.fn();

    render(
      <HeaderContext.Provider value={{ ...defaultHeaderContext, closeMenu }}>
        <NavigationItem href="/" label="Home" onClick={onClick} />
      </HeaderContext.Provider>,
    );

    const navigationItem = screen.getByTestId('nav-item-Home');
    await userEvent.click(navigationItem);

    expect(closeMenu).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });
});
