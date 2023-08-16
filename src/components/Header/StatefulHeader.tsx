import * as React from 'react';
import classnames from 'classnames';

import Navigation from '../Navigation/Navigation';
import NavigationList from '../Navigation/NavigationList';
import NavigationListItem from '../Navigation/NavigationListItem';
import NavigationListItemTrigger from '../Navigation/NavigationListItemTrigger';
import Header from './Header';
import Logo from '../../PhillipsLogo.svg'
import { px } from '../../utils';

const HeaderComponent = () => {
  const [toggleState, setToggleState] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState("Main Menu");
  const expanded = expandedItem !== "Main Menu";
  const handleSelection = function(e: React.KeyboardEvent<HTMLDivElement>, label:string) {
    if (e.code === 'Enter') {
      setExpandedItem(label)
    }
  }
  return (
    <Header logo={Logo} logoText="Phillips Auctioneers" onMenuToggle={() => setToggleState(prev => !prev)}>
      <div className={classnames(`${px}-header__nav`, {[`${px}-header__nav--open`]: toggleState})}>
        <Navigation id="main-nav" label={expandedItem} backBtnLabel="← Back" onClose={() => {
          setToggleState(prev => !prev);
          setExpandedItem('Main Menu');
        }} onBack={() => setExpandedItem('Main Menu')}  expanded={expanded}>
          <NavigationList expanded={expanded}>
            <NavigationListItemTrigger label="Auctions" expanded={expanded} expandedItem={expandedItem} onClick={() => setExpandedItem('Auctions')} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleSelection(e, 'Auctions')}>
              <NavigationList>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Interserct: Online Auction, Hong Kong</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>David Hockney, London</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Editions & Works on Paper, New York</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Auction Results</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Artist & Makers</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>How to Buy</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Remote Bidding</NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
            <NavigationListItem href="#" tabIndex={!expanded ? 0 : -1}>Calendar</NavigationListItem>
            <NavigationListItemTrigger label="Departments" expanded={expanded} expandedItem={expandedItem} onClick={() => setExpandedItem('Departments')}>
              <NavigationList>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>20th Century & Contemporary Art</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Design</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Editions</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Jewels</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Photographs</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Watches</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Private Sales</NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
            <NavigationListItem element="button" tabIndex={!expanded ? 0 : -1}>Test-button</NavigationListItem>
            <NavigationListItem element="p" tabIndex={!expanded ? 0 : -1}>Test-p</NavigationListItem>
            <NavigationListItemTrigger label="Test-subnav" expanded={expanded} expandedItem={expandedItem} onClick={() => setExpandedItem('Test-subnav')}>
              <NavigationList>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}>Test-subnav-1</NavigationListItem>
                <NavigationListItem href="#" tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}>Test-subnav-2</NavigationListItem>
              </NavigationList>
            </NavigationListItemTrigger>
          </NavigationList>
        </Navigation>
      </div>
    </Header>
  )
}

export default HeaderComponent;