import classnames from 'classnames';
import React, {
  Component,
  ComponentProps,
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactElement,
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
   * Height of the notification banner
   */
  bannerHeight?: number;
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
  /**
   * Reference to timeout for submenu closing
   */
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
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
      bannerHeight = 0,
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
    const { closeMenu, handleMenuToggle, isMenuOpen, toggleText } = useMobileMenu({ toggleOpenText, toggleCloseText });

    const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    return (
      <header
        {...props}
        className={classnames(`${px}-header`, className)}
        ref={ref}
        style={{ ['top']: `${bannerHeight}px` } as React.CSSProperties}
      >
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
                closeTimeoutRef,
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
