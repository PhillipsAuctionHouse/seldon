import * as React from 'react';
import classnames from 'classnames';

import Navigation from '../Navigation/Navigation';
import NavigationList from '../Navigation/NavigationList';
import NavigationListItem from '../Navigation/NavigationListItem';
import NavigationListItemTrigger from '../Navigation/NavigationListItemTrigger';
import Header from './Header';
import Logo from '../../PhillipsLogo.svg';
import { px } from '../../utils';

const defaultMobileMenuLabel = 'Main Menu';
const HeaderComponent = () => {
  const [toggleState, setToggleState] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState(defaultMobileMenuLabel);
  const expanded = expandedItem !== defaultMobileMenuLabel;
  const handleSelection = function (label: string) {
    setExpandedItem((prev) => (prev === defaultMobileMenuLabel ? label : defaultMobileMenuLabel));
  };
  const handleFocusEvent = (e: React.FocusEvent) => {
    console.log(e.target.parentNode !== e.relatedTarget?.parentNode, e.target);
    if (e.target.parentNode?.parentNode !== e.relatedTarget?.parentNode?.parentNode) {
      console.log('Something happened', e.target.parentNode, e.relatedTarget?.parentNode);
      setExpandedItem(defaultMobileMenuLabel);
    }
  };
  return (
    <Header
      logo={Logo}
      logoText="Phillips Auctioneers"
      onMenuToggle={() => {
        setToggleState((prev) => !prev);
        setExpandedItem(defaultMobileMenuLabel);
      }}
    >
      <div className={classnames(`${px}-header__nav`, { [`${px}-header__nav--open`]: toggleState })}>
        <Navigation
          id="main-nav"
          label={expandedItem}
          backBtnLabel="← Back"
          onBack={() => setExpandedItem(defaultMobileMenuLabel)}
          expanded={expanded}
        >
          <NavigationList expanded={expanded}>
            <NavigationListItemTrigger
              label="Auctions"
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Auctions')}
            >
              <NavigationList>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  Interserct: Online Auction, Hong Kong
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  David Hockney, London
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  Editions & Works on Paper, New York
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  Auction Results
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  Artist & Makers
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  How to Buy
                </NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1} onBlur={handleFocusEvent}>
                  Remote Bidding
                </NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
            <NavigationListItem href="#">Calendar</NavigationListItem>
            <NavigationListItemTrigger
              label="Departments"
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Departments')}
            >
              <NavigationList>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  20th Century & Contemporary Art
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Design
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Editions
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Jewels
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Photographs
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Watches
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Departments' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Private Sales
                </NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
            <NavigationListItem element="button">Test-button</NavigationListItem>
            <NavigationListItem element="p" tabIndex="0">
              Test-p
            </NavigationListItem>
            <NavigationListItemTrigger
              label="Test-subnav"
              expandedItem={expandedItem}
              handleOnClick={() => handleSelection('Test-subnav')}
            >
              <NavigationList>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Test-subnav-1
                </NavigationListItem>
                <NavigationListItem
                  href="#"
                  tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}
                  onBlur={handleFocusEvent}
                >
                  Test-subnav-2
                </NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
          </NavigationList>
        </Navigation>
      </div>

      <input type="search" />
    </Header>
  );
};

export default HeaderComponent;
