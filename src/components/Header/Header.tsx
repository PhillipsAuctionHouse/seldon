import classnames from 'classnames';
import * as React from 'react';
import { px } from '../../utils';
// import Navigation from '../Navigation/Navigation';
// import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
// import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
// import NavigationList from '../Navigation/NavigationList/NavigationList';
import Search from '../Search/Search';
// import { LinkVariants } from '../Link/utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Logo src
   */
  logo: string;
  /**
   * Logo alt text
   */
  logoText: string;
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
  expandedItem: string;
  expanded: boolean;
  handleSelection: (label: string) => void;
  handleFocusEvent: (e: React.FocusEvent) => void;
};

const defaultMobileMenuLabel = 'Main Menu';
export const HeaderContext = React.createContext({
  expandedItem: defaultMobileMenuLabel,
  expanded: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleSelection: (_label: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  handleFocusEvent: (_e: React.FocusEvent) => {},
});

const Header = ({
  logo,
  logoText,
  className,
  children,
  toggleOpenText = 'Open Menu',
  toggleCloseText = 'Close Menu',
}: React.PropsWithChildren<HeaderProps>) => {
  const [toggleText, setToggleText] = React.useState(toggleOpenText);
  const [toggleState, setToggleState] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState(defaultMobileMenuLabel);
  const expanded = expandedItem !== defaultMobileMenuLabel;
  const handleMenuToggle = function () {
    console.log('handleMenuToggle');
    setToggleState((prev) => !prev);
    setToggleText((prev) => (prev === toggleOpenText ? toggleCloseText : toggleOpenText));
    setExpandedItem(defaultMobileMenuLabel);
  };
  const handleSelection = function (label: string) {
    console.log('handleSelection', label);
    setExpandedItem((prev) => (prev === defaultMobileMenuLabel ? label : defaultMobileMenuLabel));
  };
  const handleFocusEvent = (e: React.FocusEvent) => {
    console.log('handleFocusEvent', e.target, e.relatedTarget);
    console.log(e.target.parentNode !== e.relatedTarget?.parentNode, e.target);
    if (e.target.parentNode?.parentNode !== e.relatedTarget?.parentNode?.parentNode) {
      console.log('Something happened', e.target.parentNode, e.relatedTarget?.parentNode);
      setExpandedItem(defaultMobileMenuLabel);
    }
  };
  return (
    <header className={classnames(`${px}-header`, className)}>
      <button
        type="button"
        onClick={handleMenuToggle}
        className={classnames(`${px}-header__toggle-btn`, {
          [`${px}-header__toggle-btn--open`]: toggleText === toggleCloseText,
        })}
      >
        <span>{toggleText}</span>
      </button>
      <h1 className={`${px}-header__logo`} tabIndex={toggleText === toggleOpenText ? 0 : -1}>
        <img src={logo} height="14" alt={logoText} />
      </h1>
      <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--open`]: toggleState })}>
        <HeaderContext.Provider
          value={{ expandedItem, expanded, handleSelection, handleFocusEvent } as HeaderContextType}
        >
          {children}
        </HeaderContext.Provider>
      </div>
      <Search />
    </header>
  );
};

export default Header;
