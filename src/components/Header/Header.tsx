import classnames from 'classnames';
import * as React from 'react';

import { px } from '../../utils';

interface HeaderProps {
  /**
   * Logo src
   */
  logo: string;
  /**
   * Logo alt text
   */
  logoText: string;
  /**
   * Any children to render inside of header
   */
  children: React.ReactNode| JSX.Element;
  /**
  * Optional class for component
  */
  className?: string;
  /**
  * Method for toggling open the menu on small screen sizes
  */
  onMenuToggle?: () => void;
  /**
   * Toggle open text
   */
  toggleOpenText?: string;
  /**
   * Toggle close text
   */
  toggleCloseText?: string;
}
const Header = ({
  logo,
  logoText,
  children,
  className,
  onMenuToggle,
  toggleOpenText = "Open Menu",
  toggleCloseText = "Close Menu"
}: HeaderProps) => {
  const [toggleText, setToggleText] = React.useState(toggleOpenText);
  const handleMenuToggle = function() {
    onMenuToggle();
    setToggleText(prev => prev === toggleOpenText ? toggleCloseText : toggleOpenText);
  }
  return (
    <header className={classnames(`${px}-header`, className)}>
        <button type="button" onClick={handleMenuToggle}  className={classnames(`${px}-header__toggle-btn`, {[`${px}-header__toggle-btn--open`]: toggleText === toggleCloseText})}><span>{toggleText}</span></button>
        <h1 className={`${px}-header__logo`}><img src={logo} width="228" height="18" alt={logoText}/></h1>
        {children}
    </header>
  );
};

export default Header;