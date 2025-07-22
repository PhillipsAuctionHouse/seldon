import classNames from 'classnames';
import { NavigationMenu } from 'radix-ui';
import { Icon } from '../../components/Icon';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import { SupportedLanguages } from '../../types/commonTypes';
import React from 'react';
import './_newHeader.scss';

const NewHeader = () => {
  // Handle language change
  const handleLanguageChange = (language: SupportedLanguages) => {
    console.log('Language changed to:', language);
    // Additional language change handling logic can be added here
  };

  const handleAccountClick = () => {
    console.log('Account clicked');
    // Account click handling logic can be added here
  };

  return (
    <header className="header">
      <div className="header__top-bar">
        <div className="header__left-section">
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>

        <h1 data-testid="header-logo" className="header__logo">
          <a href="/" aria-label="Phillips Home Page">
            <Icon icon="PhillipsLogo" aria-hidden="true" />
          </a>
        </h1>

        <div className="header__right-section">
          <button onClick={handleAccountClick} aria-label="Account" className="header__account-button">
            <Icon icon="Account" />
          </button>
        </div>
      </div>
      <NavigationMenu.Root className="navigation-menu" orientation="horizontal">
        <NavigationMenu.List className="navigation-menu__list">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="snwHeaderLink navigation-menu__trigger">AUCTIONS</NavigationMenu.Trigger>
            <NavigationMenu.Content className="navigation-menu__content">
              <div className="navigation-menu__columns">
                <div className="navigation-menu__column">
                  <h3 className="navigation-menu__column-heading">Upcoming</h3>
                  <ul className="navigation-menu__list-container one">
                    <ListItem badge="New York" href="#" title="Editions & Works on Paper" />
                    <ListItem badge="New York" href="#" title="Design" />
                    <ListItem
                      badge="Geneva"
                      href="#"
                      title="Reloaded: The Rebirth of Mechanical Watchmaking, 1980-1999"
                    />
                    <ListItem href="#" title="Phillips Watches Online: The Geneva Sessions, Fall 2024" />
                    <ListItem badge="Hong Kong" href="#" title="Modern & Contemporary Art Evening Sale" />
                    <ListItem href="#" title="Damien Hirst: Online Auction" />
                    <ListItem badge="Hong Kong" href="#" title="New Now: Modern & Contemporary Art" />
                    <ListItem badge="London" href="#" title="Casa Fornaroli" />
                    <ListItem badge="Geneva" href="#" title="The Geneva Watch Auction: XVII" />
                    <ListItem badge="London" href="#" title="Wired: Online Auction" />
                    <ListItem badge="Hong Kong" href="#" title="The Imperial Patek Philippe Sale" />
                    <ListItem
                      badge="Hong Kong"
                      href="#"
                      title="Disruptors: Evening Sale of Modern & Contemporary Art, Design and Watches"
                    />
                    <ListItem href="#" title="View All" />
                  </ul>
                </div>
                <div className="navigation-menu__column">
                  <h3 className="navigation-menu__column-heading">Auction Information & Services</h3>
                  <ul className="navigation-menu__list-container one">
                    <ListItem href="#" title="Auction Calendar" />
                    <ListItem href="#" title="Auction Results" />
                    <ListItem href="#" title="Artists & Makers" />
                    <ListItem href="#" title="How To Buy" />
                    <ListItem href="#" title="Remote Bidding" />
                  </ul>
                </div>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="snwHeaderLink navigation-menu__link" href="#">
              CALENDAR
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="snwHeaderLink navigation-menu__trigger">
              DEPARTMENTS
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="navigation-menu__content">
              <div className="navigation-menu__columns">
                <div className="navigation-menu__column">
                  <h3 className="navigation-menu__column-heading">Our Specialist Departments</h3>
                  <ul className="navigation-menu__list-container one">
                    <ListItem href="#" title="Modern & Contemporary Art" />
                    <ListItem href="#" title="Design" />
                    <ListItem href="#" title="Editions" />
                    <ListItem href="#" title="Jewels" />
                    <ListItem href="#" title="Photographs" />
                    <ListItem href="#" title="Watches" />
                    <ListItem href="#" title="Private Sales" />
                    <ListItem href="#" title="View All" />
                  </ul>
                </div>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="snwHeaderLink navigation-menu__link" href="#">
              EXHIBITIONS
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="snwHeaderLink navigation-menu__link" href="#">
              PERPETUAL
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="snwHeaderLink navigation-menu__link" href="#">
              DROPSHOP
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link className="snwHeaderLink navigation-menu__link" href="#">
              EDITORIAL
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="navigation-menu__indicator">
            <div className="navigation-menu__arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="navigation-menu__viewport-position">
          <NavigationMenu.Viewport className="navigation-menu__viewport" />
        </div>
      </NavigationMenu.Root>
    </header>
  );
};

interface ListItemProps {
  badge?: string;
  className?: string;
  title?: string;
  href?: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ badge, className, title, ...props }, forwardedRef) => (
    <li className="navigation-menu__list-item">
      <NavigationMenu.Link asChild>
        <a className={classNames('navigation-menu__list-item-link', className)} {...props} ref={forwardedRef}>
          <div className="navigation-menu__list-item-heading">
            {title}
            {badge && <span className="navigation-menu__list-item-badge">{badge}</span>}
          </div>
        </a>
      </NavigationMenu.Link>
    </li>
  ),
);

ListItem.displayName = 'ListItem';
NewHeader.displayName = 'NewHeader';

export default NewHeader;
