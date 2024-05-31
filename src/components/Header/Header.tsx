import classnames from 'classnames';
import * as React from 'react';
import { px } from '../../utils';
import Navigation from '../Navigation/Navigation';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import Search from '../Search/Search';
import { LinkVariants } from '../Link/utils';

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

const defaultMobileMenuLabel = 'Main Menu';
const Header = ({
  logo,
  logoText,
  className,
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
        <Navigation
          id={`${px}-main-nav`}
          label={expandedItem}
          backBtnLabel="← Back"
          onBack={() => setExpandedItem(defaultMobileMenuLabel)}
          expanded={expanded}
        >
          <NavigationList>
            <NavigationItemTrigger
              label={`Auctions`}
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Auctions')}
            >
              <NavigationList>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Editions & Works on Paper`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Casa Fornaroli`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>London</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`The Geneva Watch Auction: XVII`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>Geneva</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Modern & Contemporary Art Day Sale—Morning Session`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Modern & Contemporary Art Day Sale—Afternoon Session`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Modern & Contemporary Art Evening Sale`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Wired: Online Auction`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>London</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`The Imperial Patek Philippe Sale`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>Hong Kong</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Disruptors: Evening Sale of Modern & Contemporary Art, Design and Watches`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>Hong Kong</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkSm}
                  label={`Browse Full Auction Calendar`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Auction Calendar`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Auction Results`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Artists & Makers`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`How To Buy`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Remote Bidding`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label={`Calendar`} />
            <NavigationItemTrigger
              label={`Departments`}
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Departments')}
            >
              <NavigationList>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Modern & Contemporary Art`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Design`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Editions`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Jewels`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Photographs`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Watches`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  label={`Private Sales`}
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItemTrigger
              label={`Exhibitions`}
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Exhibitions')}
            >
              <NavigationList>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Written in the Sky: Works by Ed Ruscha`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`Modeler le papier // Shapes On Paper`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>Paris</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`ALT POP: An Alternative History to American Pop Art`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>
                <NavigationItem
                  href="#"
                  navGroup={'nav-link-lg'}
                  navType={LinkVariants.navLinkLg}
                  label={`New Terrains: Contemporary Native American Art`}
                  tabIndex={expandedItem === 'Auctions' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  <span className={`${px}-nav__item--badge `}>New York</span>
                </NavigationItem>

                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Past Exhibitions`}
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label={`Perpetual`} />
            <NavigationItem href="#" label={`Dropshop`} />
            <NavigationItemTrigger
              label={`Buy & Sell`}
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Buy & Sell')}
            >
              <NavigationList>
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`How To Buy`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`How To Sell`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Remote Bidding`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Private Services`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Trusts, Estates & Valuations`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Fiduciary Services`}
                />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Buy Catalogues`}
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label={`Editorial`} />
            <NavigationItemTrigger
              label={`About Us`}
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('About Us')}
            >
              <NavigationList>
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Our History`}
                />
                <NavigationItem navGroup={'nav-link-sm'} navType={LinkVariants.navLinkSm} href="#" label={`Our Team`} />
                <NavigationItem
                  navGroup={'nav-link-sm'}
                  navType={LinkVariants.navLinkSm}
                  href="#"
                  label={`Locations`}
                />
                <NavigationItem navGroup={'nav-link-sm'} navType={LinkVariants.navLinkSm} href="#" label={`Press`} />
                <NavigationItem navGroup={'nav-link-sm'} navType={LinkVariants.navLinkSm} href="#" label={`Careers`} />
              </NavigationList>
            </NavigationItemTrigger>
          </NavigationList>
        </Navigation>
      </div>
      <Search />
    </header>
  );
};

export default Header;
