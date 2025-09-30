import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { Icon } from '../../components/Icon';
import { LinkVariants } from '../../components/Link/types';
import Navigation from '../../components/Navigation/Navigation';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../../components/Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import NotificationBanner from '../../components/NotificationBanner/NotificationBanner';
import Search from '../../components/Search/Search';
import { px } from '../../utils';
import { default as Header } from './Header';
import { useMobileMenu } from './hooks';

describe('Header', () => {
  let toggleButton: HTMLElement;
  let logo: HTMLElement;
  let nav: HTMLElement;
  let search: HTMLElement;

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

  beforeEach(() => {
    render(headerComponent());
    toggleButton = screen.getByRole('button', { name: /Open Menu/i });
    logo = screen.getByTestId('header-logo');
    nav = screen.getByTestId(`${px}-main-nav`);
    search = screen.getByTestId(`search`);
  });

  it('should render the header component with default props', () => {
    expect(toggleButton).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  it.each([[/Open Menu/i, /Close Menu/i]])(
    'should toggle the menu when the toggle button is clicked',
    async (_openText, closeText) => {
      expect(nav).toHaveClass(`${px}-nav`);
      await userEvent.click(toggleButton);
      expect(screen.getByRole('button', { name: closeText })).toBeInTheDocument();
    },
  );
});

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

it('should disconnect ResizeObserver on unmount', () => {
  const disconnectSpy = vi.fn();
  const originalResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class {
    observe = () => void 0;
    unobserve = () => void 0;
    disconnect = disconnectSpy;
  };
  const { unmount } = render(
    <Header logo={<Icon icon="PhillipsLogo" />} bannerRef={{ current: document.createElement('div') }} />,
  );
  unmount();
  expect(disconnectSpy).toHaveBeenCalled();
  window.ResizeObserver = originalResizeObserver;
});

it('provides all context values', () => {
  render(<Header logo={<Icon icon="PhillipsLogo" />} />);
  const toggleButton = screen.getByRole('button', { name: /Open Menu/i });
  expect(toggleButton).toBeInTheDocument();
  expect(screen.getByTestId('header-logo')).toBeInTheDocument();
});

interface TestHeaderWithBannerProps {
  bannerContentHeight?: number;
}

const TestHeaderWithBanner = ({ bannerContentHeight = 0 }: TestHeaderWithBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const setBannerRef = (el: HTMLDivElement | null) => {
    if (el) {
      Object.defineProperty(el, 'clientHeight', {
        value: bannerContentHeight,
        configurable: true,
      });
      (bannerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }
  };

  return (
    <div>
      <NotificationBanner ref={setBannerRef} style={{ height: `${bannerContentHeight}px` }}>
        <div>Banner Content</div>
      </NotificationBanner>
      <Header logo={<Icon icon="PhillipsLogo" />} bannerRef={bannerRef} />
    </div>
  );
};

it('should set bannerHeight from NotificationBanner height', async () => {
  render(<TestHeaderWithBanner bannerContentHeight={100} />);
  const header = screen.getByRole('banner');
  await waitFor(() => {
    const style = header.style.getPropertyValue('--banner-height');
    expect(style).toBe('100px');
  });
});
