import classnames from 'classnames';
import { findChildrenOfType, px } from '../../utils';
import Search from '../Search/Search';
import Logo from '../../assets/PhillipsLogo.svg?react';
import UserManagement from '../UserManagement/UserManagement';
import { LanguageSelector } from '../LanguageSelector';
import Navigation from '../Navigation/Navigation';
import { Component, ComponentProps, forwardRef, ReactElement, useState, createContext, useRef, useEffect } from 'react';
import { defaultHeaderContext } from './utils';
import mergeRefs from 'merge-refs';

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
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const navElements = findChildrenOfType(children, Navigation);
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState('');
    const toggleText = isOpen ? toggleCloseText : toggleOpenText;
    const [headerHeight, setHeight] = useState(0);
    const handleMenuToggle = function () {
      setIsOpen((prev) => !prev);
    };
    const headerRef = useRef<HTMLElement>(null);
    const handleResize = () => {
      if (headerRef.current) {
        setHeight(headerRef.current.offsetHeight);
      }
    };

    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <header
        {...props}
        style={{ '--header-height': `${headerHeight}px` } as React.CSSProperties}
        className={classnames(`${px}-header`, className)}
        ref={mergeRefs(ref, headerRef)}
      >
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
        <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--closed`]: !isOpen })}>
          <HeaderContext.Provider
            value={
              {
                isMenuOpen: isOpen,
                expandedItem,
                setExpandedItem,
                isSearchExpanded,
                setIsSearchExpanded,
              } as HeaderContextType
            }
          >
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
