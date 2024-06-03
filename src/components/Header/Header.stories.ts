import type { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from './Header';
import Logo from '../../assets/PhillipsLogo.svg';
import Navigation from '../Navigation/Navigation';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';

const meta = {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs

  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground = (props: HeaderProps) => (
  <div>
    <Header {...props}>
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
    </Header>
    </div>
);

Playground.args = {
  logo: Logo,
    logoText: 'Phillips Auctioneers',
};
