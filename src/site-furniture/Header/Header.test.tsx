import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import LogoSVG from '../../assets/PhillipsLogo.svg?react';
import LogoIMG from '../../assets/PhillipsLogo.svg';
import { px } from '../../utils';
import Navigation from '../../components/Navigation/Navigation';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../../components/Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import { LinkVariants } from '../../components/Link/types';
import Search from '../../components/Search/Search';

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
    expect(logoElement).toContainHTML(`<img  alt="Phillips" data-testid="header-logo-img" src=${LogoIMG} />`);
  });
});
