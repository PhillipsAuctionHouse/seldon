import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { findChildrenExcludingTypes, findChildrenOfType, px } from '../../utils';
import Logo from '../../assets/PhillipsLogo.svg?react';
import UserManagement from '../../patterns/UserManagement/UserManagement';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import Navigation from '../../components/Navigation/Navigation';
import { Component, ComponentProps, forwardRef, ReactElement, useState, createContext } from 'react';
import { defaultHeaderContext } from './utils';
import { SSRMediaQuery } from '../../providers/utils';

export interface HeaderProps extends ComponentProps<'header'> {
  /**
   * Logo src
   */
  logo?: ReactElement<Component> | string;
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
};

export const HeaderContext = createContext<HeaderContextType>(defaultHeaderContext);

/**
 * ## Overview
 *
 * This component allows navigation, search, login/logout, and language selection and supports desktop and mobile layouts.  It requires the <SeldonProvider> to be wrapped around it to support SSR Media Queries.
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
      logo = <Logo />,
      className,
      children,
      toggleOpenText = 'Open Menu',
      toggleCloseText = 'Close Menu',
      logoText = 'Home Page',
      ...props
    },
    ref,
  ) => {
    const userManagementElement = findChildrenOfType(children, UserManagement);
    const languageSelectorElement = findChildrenOfType(children, LanguageSelector);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const navigationElement = findChildrenOfType(children, Navigation);
    const otherChildren = findChildrenExcludingTypes(children, [Navigation, UserManagement, LanguageSelector]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleText = isMenuOpen ? toggleCloseText : toggleOpenText;
    const handleMenuToggle = function () {
      setIsMenuOpen((prev) => !prev);
    };

    return (
      <header {...props} className={classnames(`${px}-header`, className)} ref={ref}>
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
            <a href="/" aria-label={logoText}>
              {typeof logo === 'object' ? (
                logo
              ) : (
                <img alt="Phillips" data-testid="header-logo-img" src={logo as string} height="14" />
              )}
            </a>
          </h1>
          {userManagementElement}
        </div>
        <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--closed`]: !isMenuOpen })}>
          <HeaderContext.Provider
            value={
              {
                isMenuOpen,
                isSearchExpanded,
                setIsSearchExpanded,
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
        <div className={classnames(`${px}-header__overlay`, { [`${px}-header__overlay--active`]: isSearchExpanded })} />
      </header>
    );
  },
);

Header.displayName = 'Header';

export default Header;
