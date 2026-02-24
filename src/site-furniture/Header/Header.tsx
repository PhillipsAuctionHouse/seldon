import classnames from 'classnames';
import React, {
  Component,
  ComponentProps,
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Icon } from '../../components/Icon';
import Navigation from '../../components/Navigation/Navigation';
import { LanguageSelector, LanguageSelectorProps } from '../../patterns/LanguageSelector';
import UserManagement, { UserManagementProps } from '../../patterns/UserManagement/UserManagement';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { findChildrenExcludingTypes, findChildrenOfType, px } from '../../utils';
import { useMobileMenu } from './hooks';
import { defaultHeaderContext } from './utils';

export interface HeaderProps extends ComponentProps<'header'> {
  /**
   * Logo src
   */
  logo?: ReactElement<Component> | string;
  /**
   * Logo href
   */
  logoHref?: string;
  /**
   * Toggle open text
   */
  toggleOpenText?: string;
  /**
   * Toggle close text
   */
  toggleCloseText?: string;
  /**
   * label for the Logo link
   */
  logoText?: string;
  /**
   * Is the header disabled
   */
  disabled?: boolean;
  /**
   * Reference to the notification banner
   */
  bannerRef?: React.MutableRefObject<HTMLDivElement | null>;
  /**
   * ID of the main content element for the skip link target (e.g. "main"). When set, a "Skip to main content" link is rendered for keyboard users.
   */
  skipToContentId?: string | null;
  /**
   * Accessible label for the skip link. Defaults to "Skip to main content".
   */
  skipLinkLabel?: string;
}
export type HeaderContextType = {
  /**
   * Used for mobile navigation menu hiding and showing
   */
  isMenuOpen: boolean;
  /**
   * Is the user within the search input and searching
   */
  isSearchExpanded: boolean;
  /**
   * Set the search expanded state
   */
  setIsSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Close the mobile menu
   * */
  closeMenu?: () => void;
  /**
   * Active submenu ID for navigation
   */
  activeSubmenuId: string | null;
  /**
   * Set the active submenu ID
   */
  setActiveSubmenuId: (id: string | null) => void;
};

export const HeaderContext = createContext<HeaderContextType>(defaultHeaderContext);

/**
 * ## Overview
 *
 * This component allows navigation, search, login/logout, and language selection and supports desktop and mobile layouts.  It requires the `<SeldonProvider>` to be wrapped around it to support SSR Media Queries.
 *
 * [Figma Link Mobile](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10877-33417&node-type=INSTANCE&m=dev)
 *
 * [Figma Link Desktop](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=10570-6295&node-type=FRAME&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-header--overview)
 */
const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      logo = <Icon icon="PhillipsLogo" />,
      logoHref = '/',
      className,
      children,
      toggleOpenText = 'Open Menu',
      toggleCloseText = 'Close Menu',
      logoText = 'Home Page',
      disabled,
      bannerRef,
      skipToContentId = 'main',
      skipLinkLabel = 'Skip to main content',
      ...props
    },
    ref,
  ) => {
    const userManagementChildren = findChildrenOfType(children, UserManagement);
    const userManagementElement = React.isValidElement(userManagementChildren?.[0])
      ? React.cloneElement(userManagementChildren[0], { disabled } as UserManagementProps)
      : '';
    const languageSelectorChildren = findChildrenOfType(children, LanguageSelector);
    const languageSelectorElement = React.isValidElement(languageSelectorChildren?.[0])
      ? React.cloneElement(languageSelectorChildren[0], { disabled } as LanguageSelectorProps)
      : '';
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const navigationElement = findChildrenOfType(children, Navigation);
    const otherChildren = findChildrenExcludingTypes(children, [Navigation, UserManagement, LanguageSelector]);
    const { closeMenu, handleMenuToggle, isMenuOpen, toggleText } = useMobileMenu({
      toggleOpenText,
      toggleCloseText,
    });

    const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

    const [bannerHeight, setBannerHeight] = useState(bannerRef?.current ? bannerRef.current.clientHeight : 0);
    const headerRef = React.useRef<HTMLElement | null>(null);

    useEffect(() => {
      const bannerElement = bannerRef?.current;
      if (!bannerElement) return;

      setBannerHeight(bannerElement.clientHeight);
      const resizeObserver = new window.ResizeObserver(() => {
        setBannerHeight(bannerElement.clientHeight);
      });

      resizeObserver.observe(bannerElement);
      return () => {
        resizeObserver.disconnect();
      };
    }, [bannerRef, bannerHeight]);

    useEffect(() => {
      const headerElement = headerRef.current;
      if (!headerElement) return;

      const updateHeaderHeight = () => {
        const height = headerElement.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      };

      // Set initial height
      updateHeaderHeight();

      // Watch for changes
      const resizeObserver = new window.ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        headerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <header
        {...props}
        className={classnames(`${px}-header`, className)}
        ref={combinedRef}
        style={{ '--banner-height': `${bannerHeight}px` } as React.CSSProperties}
      >
        {skipToContentId && (
          <a
            href={`#${skipToContentId}`}
            className={`${px}-header__skip-link`}
            data-testid="skip-to-content"
          >
            {skipLinkLabel}
          </a>
        )}
        <div className={`${px}-header__top-row`}>
          <SSRMediaQuery.Media greaterThanOrEqual="md">{languageSelectorElement}</SSRMediaQuery.Media>
          {/** only render language selector in this location on desktop */}
          <button
            aria-label={toggleText}
            data-testid="mobile-menu-toggle"
            type="button"
            onClick={handleMenuToggle}
            className={classnames(`${px}-header__toggle-btn`, {
              [`${px}-header__toggle-btn--open`]: isMenuOpen,
            })}
          >
            <span /> {/** this is here so we can do transitions with pseudo icons */}
          </button>
          <h1 data-testid="header-logo" className={`${px}-header__logo`}>
            <a href={logoHref} aria-label={logoText}>
              {typeof logo === 'object' ? (
                logo
              ) : (
                <img alt="Phillips" data-testid="header-logo-img" src={logo as string} />
              )}
            </a>
          </h1>
          {userManagementElement}
        </div>
        <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--closed`]: !isMenuOpen })}>
          <HeaderContext.Provider
            value={
              {
                activeSubmenuId,
                setActiveSubmenuId,
                isMenuOpen,
                isSearchExpanded,
                setIsSearchExpanded,
                closeMenu,
              } as HeaderContextType
            }
          >
            {React.Children.map(navigationElement, (child) =>
              React.isValidElement(child)
                ? React.cloneElement<PropsWithChildren>(child as ReactElement<PropsWithChildren>, {
                    children: [
                      ...React.Children.toArray((child.props as PropsWithChildren).children),
                      languageSelectorElement,
                    ],
                  })
                : child,
            )}
            {otherChildren}
          </HeaderContext.Provider>
        </div>
        <div
          className={classnames(`${px}-header__overlay`, {
            [`${px}-header__overlay--active`]: isSearchExpanded,
          })}
        />
      </header>
    );
  },
);

Header.displayName = 'Header';

export default Header;
