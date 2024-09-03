import classnames from 'classnames';
import { findChildrenOfType, noOp, px } from '../../utils';
import Search from '../Search/Search';
import Logo from '../../assets/PhillipsLogo.svg?react';
import UserManagement from '../UserManagement/UserManagement';
import { LanguageSelector } from '../LanguageSelector';
import Navigation from '../Navigation/Navigation';
import { Component, ComponentProps, forwardRef, ReactElement, useState, createContext } from 'react';

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
type HeaderContextType = {
  expandedItem: string;
  setExpandedItem: (item: string) => void;
  isMenuOpen: boolean;
};

export const HeaderContext = createContext<HeaderContextType>({
  expandedItem: '',
  setExpandedItem: noOp,
  isMenuOpen: false,
});

/**
 * ## Overview
 *
 * This component allows navigation, search, login/logout, and language selection and supports desktop and mobile layouts
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
    const searchElement = findChildrenOfType(children, Search);
    const userManagementElement = findChildrenOfType(children, UserManagement);
    const languageSelectorElement = findChildrenOfType(children, LanguageSelector);
    const navElements = findChildrenOfType(children, Navigation);
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState('');
    const toggleText = isOpen ? toggleCloseText : toggleOpenText;
    const handleMenuToggle = function () {
      setIsOpen((prev) => !prev);
    };

    return (
      <header {...props} className={classnames(`${px}-header`, className)} ref={ref}>
        <div className={`${px}-header__top-row`}>
          {languageSelectorElement}
          <button
            aria-label={toggleText}
            data-testid="mobile-menu-toggle"
            type="button"
            onClick={handleMenuToggle}
            className={classnames(`${px}-header__toggle-btn`, {
              [`${px}-header__toggle-btn--open`]: isOpen,
            })}
          >
            <span /> {/** this is here so we can do transitions with pseudo icons */}
          </button>
          <h1
            data-testid="header-logo"
            className={`${px}-header__logo`}
            tabIndex={toggleText === toggleOpenText ? 0 : -1}
          >
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
        <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--closed`]: !isOpen })}>
          <HeaderContext.Provider value={{ isMenuOpen: isOpen, expandedItem, setExpandedItem } as HeaderContextType}>
            {navElements}
            {languageSelectorElement} {/* This is not visible through css when in desktop breakpoint */}
          </HeaderContext.Provider>
        </div>
        {searchElement}
      </header>
    );
  },
);

Header.displayName = 'Header';

export default Header;
