import classnames from 'classnames';
import * as React from 'react';
import { findChildrenOfType, noOp, px } from '../../utils';
import Search from '../Search/Search';
import Logo from '../../assets/PhillipsLogo.svg?react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Default mobile menu label
   */
  defaultMobileMenuLabel?: string;
  /**
   * Logo src
   */
  logo?: React.ReactElement<React.Component> | string;
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
  defaultMobileMenuLabel: string;
  expandedItem: string;
  setExpandedItem: (item: string) => void;
  isExpanded: boolean;
  onSelect: (label: string) => void;
  /**
   * Is the user within the search input and searching
   */
  isSearchExpanded: boolean;
  /**
   * Set the search expanded state
   */
  setIsSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const defaultHeaderContext = {
  defaultMobileMenuLabel: '',
  expandedItem: '',
  setExpandedItem: noOp,
  isExpanded: false,
  onSelect: noOp,
  isSearchExpanded: false,
  setIsSearchExpanded: noOp,
};
export const HeaderContext = React.createContext<HeaderContextType>(defaultHeaderContext);

const Header = ({
  defaultMobileMenuLabel = 'Main Menu',
  logo = <Logo />,
  className,
  children,
  toggleOpenText = 'Open Menu',
  toggleCloseText = 'Close Menu',
  logoText = 'Home Page',
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  const searchElement = findChildrenOfType(children, Search);
  const navElements = findChildrenOfType(children, Search, true);
  const [toggleState, setToggleState] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState(defaultMobileMenuLabel);
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  const toggleText = toggleState ? toggleCloseText : toggleOpenText;
  const isExpanded = expandedItem !== defaultMobileMenuLabel;
  const handleMenuToggle = function () {
    setToggleState((prev) => !prev);
    setExpandedItem(defaultMobileMenuLabel);
  };
  const onSelect = function (label: string) {
    setExpandedItem((prev) => (prev === defaultMobileMenuLabel ? label : defaultMobileMenuLabel));
  };

  const onSearchExpanded = (prev: boolean) => {
    setIsSearchExpanded(prev);
  };

  return (
    <header {...props} className={classnames(`${px}-header`, className)}>
      <div className={`${px}-header__top-row`}>
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
      </div>
      <div
        className={classnames(`${px}-header__overlay`, { [`${px}-header__overlay--active`]: toggleState })}
        data-testid="header-overlay"
        onClick={handleMenuToggle}
      />
      <button
        aria-label={toggleText}
        data-testid="mobile-menu-toggle"
        type="button"
        onClick={handleMenuToggle}
        className={classnames(`${px}-header__toggle-btn`, {
          [`${px}-header__toggle-btn--open`]: toggleText === toggleCloseText,
        })}
      >
        <span>{toggleText}</span>
      </button>

      <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--open`]: toggleState })}>
        <HeaderContext.Provider
          value={
            {
              defaultMobileMenuLabel,
              expandedItem,
              setExpandedItem: (item: string) => setExpandedItem(item),
              isExpanded,
              onSelect: (label: string) => onSelect(label),
              isSearchExpanded,
              setIsSearchExpanded: onSearchExpanded,
            } as HeaderContextType
          }
        >
          {navElements}
        </HeaderContext.Provider>
      </div>
      {searchElement}
    </header>
  );
};

export default Header;
