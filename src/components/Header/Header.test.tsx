import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import LogoSVG from '../../assets/PhillipsLogo.svg?react';
import LogoIMG from '../../assets/PhillipsLogo.svg';
import { px } from '../../utils';
import Navigation from '../Navigation/Navigation';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import { LinkVariants } from '../Link/types';
import Search from '../Search/Search';

describe('Header', () => {
  const headerComponent = () => (
    <Header logo={LogoIMG}>
      <Navigation id={`${px}-main-nav`}>
        <NavigationList id={`${px}-main-nav-list`}>
          <NavigationItemTrigger id="auctions" label={`Auctions`}>
            <NavigationList id={`${px}-auction-nav-list`}>
              <NavigationItem
                badge="New York"
                href="#"
                navGroup="nav-link-lg"
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

  // it('should expand a nav category in the mobile menu when a nav item trigger is selected', async () => {
  //   render(headerComponent());
  //   const navItemTrigger = screen.getByTestId(`navigation-item-trigger-auctions`);
  //   await userEvent.click(navItemTrigger);
  //   expect(navItemTrigger).toHaveClass(`${px}-nav__item--expanded`);
  // });
});

describe('Header with logo', () => {
  it('should render the logo as an object', () => {
    render(<Header logo={<LogoSVG />} />);
    const logoElement = screen.getByTestId('header-logo-svg');
    expect(logoElement).toBeInTheDocument();
  });
  it('logo should be clickable', () => {
    render(<Header logo={<LogoSVG />} />);
    const logoElement = screen.getByRole('link', { name: 'Home Page' });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', '/');
  });
  it('logo text should be used', () => {
    render(<Header logo={<LogoSVG />} logoText="Logo Text" />);
    const logoElement = screen.getByRole('link', { name: 'Logo Text' });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', '/');
  });
  it('should render the logo as an image', () => {
    render(<Header logo={LogoIMG} />);
    const logoElement = screen.getByTestId('header-logo');
    expect(logoElement).toContainHTML(
      `<img  alt="Phillips" data-testid="header-logo-img" src=${LogoIMG} height="14" />`,
    );
  });
});
