import classnames from 'classnames';
import * as React from 'react';
import { px } from '../../utils';
import Search from '../Search/Search';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Default mobile menu label
   */
  defaultMobileMenuLabel?: string;
  /**
   * Logo src
   */
  logo?: string;
  /**
   * Logo alt text
   */
  logoText?: string;
  /**
   * Toggle open text
   */
  toggleOpenText?: string;
  /**
   * Toggle close text
   */
  toggleCloseText?: string;
}
type HeaderContextType = {
  defaultMobileMenuLabel: string;
  expandedItem: string;
  setExpandedItem: (item: string) => void;
  isExpanded: boolean;
  onSelect: (label: string) => void;
};

export const HeaderContext = React.createContext({
  defaultMobileMenuLabel: '',
  expandedItem: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setExpandedItem: (_item: string) => {},
  isExpanded: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onSelect: (_label: string) => {},
});

const Header = ({
  defaultMobileMenuLabel = 'Main Menu',
  logo,
  logoText,
  className,
  children,
  toggleOpenText = 'Open Menu',
  toggleCloseText = 'Close Menu',
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  const [toggleState, setToggleState] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState(defaultMobileMenuLabel);
  const toggleText = toggleState ? toggleCloseText : toggleOpenText;
  const isExpanded = expandedItem !== defaultMobileMenuLabel;
  const handleMenuToggle = function () {
    setToggleState((prev) => !prev);
    setExpandedItem(defaultMobileMenuLabel);
  };
  const onSelect = function (label: string) {
    setExpandedItem((prev) => (prev === defaultMobileMenuLabel ? label : defaultMobileMenuLabel));
  };

  return (
    <header {...props} className={classnames(`${px}-header`, className)}>
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
      <h1 className={`${px}-header__logo`} tabIndex={toggleText === toggleOpenText ? 0 : -1}>
        <img data-testid="header-logo" src={logo} height="14" alt={logoText} />
      </h1>
      <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--open`]: toggleState })}>
        <HeaderContext.Provider
          value={
            {
              defaultMobileMenuLabel,
              expandedItem,
              setExpandedItem: (item: string) => setExpandedItem(item),
              isExpanded,
              onSelect: (label: string) => onSelect(label),
            } as HeaderContextType
          }
        >
          {children}
        </HeaderContext.Provider>
      </div>
      <Search />
    </header>
  );
};

export default Header;
