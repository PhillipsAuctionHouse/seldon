import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from '../../components/Icon';
import { LinkVariants } from '../../components/Link/types';
import Navigation from '../../components/Navigation/Navigation';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../../components/Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import Search from '../../components/Search/Search';
import { px } from '../../utils';
import { default as Header } from './Header';
import { useMobileMenu } from './hooks';

describe('Header', () => {
  const headerComponent = () => (
    <Header logo={<Icon icon="PhillipsLogo" />}>
      <Navigation id={`${px}-main-nav`}>
        <NavigationList id={`${px}-main-nav-list`}>
          <NavigationItemTrigger id="auctions" label={`Auctions`}>
            <NavigationList id={`${px}-auction-nav-list`}>
              <NavigationItem
                badge="New York"
                href="#"
                navGroup="nav-link-start"
                navType={LinkVariants.snwFlyoutLink}
                label="Editions & Works on Paper"
              />
            </NavigationList>
          </NavigationItemTrigger>
        </NavigationList>
      </Navigation>
      <Search />
    </Header>
  );
  it('should render the header component with default props', () => {
    render(headerComponent());
    const toggleButton = screen.getByRole('button', { name: /Open Menu/i });
    const logo = screen.getByTestId('header-logo');
    const nav = screen.getByTestId(`${px}-main-nav`);
    const search = screen.getByTestId(`search`);
    expect(toggleButton).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  it('should toggle the menu when the toggle button is clicked', async () => {
    render(headerComponent());
    const nav = screen.getByTestId(`${px}-main-nav`);
    const toggleButton = screen.getByRole('button', { name: /Open Menu/i });
    expect(nav).toHaveClass(`${px}-nav`);
    await userEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /Close Menu/i })).toBeInTheDocument();
  });
});

describe('Header with logo', () => {
  it('should render the logo', () => {
    render(<Header logo={<Icon icon="PhillipsLogo" />} />);
    const logoElement = screen.getByTestId('icon-phillips-logo');
    expect(logoElement).toBeInTheDocument();
  });
  it('logo should be clickable', () => {
    render(<Header logo={<Icon icon="PhillipsLogo" />} />);
    const logoElement = screen.getByRole('link', { name: 'Home Page' });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', '/');
  });
  it('logo text should be used', () => {
    render(<Header logo={<Icon icon="PhillipsLogo" />} logoText="Logo Text" />);
    const logoElement = screen.getByRole('link', { name: 'Logo Text' });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', '/');
  });
});

describe('useMobileMenu', () => {
  const toggleCloseText = 'Close Menu';
  const toggleOpenText = 'Open Menu';

  it('should initialize with menu closed', () => {
    const { result } = renderHook(() => useMobileMenu({ toggleCloseText, toggleOpenText }));
    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.toggleText).toBe(toggleOpenText);
  });

  it('should toggle menu open and close', () => {
    const { result } = renderHook(() => useMobileMenu({ toggleCloseText, toggleOpenText }));

    act(() => {
      result.current.handleMenuToggle();
    });
    expect(result.current.isMenuOpen).toBe(true);
    expect(result.current.toggleText).toBe(toggleCloseText);

    act(() => {
      result.current.handleMenuToggle();
    });
    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.toggleText).toBe(toggleOpenText);
  });

  it('should close menu when closeMenu is called', () => {
    const { result } = renderHook(() => useMobileMenu({ toggleCloseText, toggleOpenText }));

    act(() => {
      result.current.handleMenuToggle();
    });
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });
    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.toggleText).toBe(toggleOpenText);
  });
});
