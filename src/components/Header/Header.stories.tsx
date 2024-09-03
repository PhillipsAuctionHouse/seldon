import type { Meta } from '@storybook/react';
import Header, { HeaderProps } from './Header';
import Navigation from '../Navigation/Navigation';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import { LinkVariants } from '../Link/types';
import { px } from '../../utils';
import UserManagement from '../UserManagement/UserManagement';
import Search from '../Search/Search';
import { AuthState } from '../UserManagement/types';
import { LanguageSelector } from '../LanguageSelector';
import PhillipsLogo from '../../assets/PhillipsLogo.svg?react';
import { SupportedLanguages } from '../../types/commonTypes';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

const generateLoremIpsum = (numOfParagraphs = 10) => {
  let loremIpsum = '';
  for (let i = 0; i < numOfParagraphs; i++) {
    loremIpsum += faker.lorem.paragraph();
  }
  return loremIpsum;
};

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    docs: {
      story: {
        height: '700px',
      },
    },
    layout: 'fullscreen',
  },
  args: {
    authState: AuthState.LoggedOut,
  },
  argTypes: { authState: { control: { type: 'select' }, options: Object.values(AuthState) } },
} satisfies Meta<typeof Header & typeof UserManagement>;

export default meta;

export const Playground = ({ authState, ...props }: HeaderProps & { authState?: AuthState }) => {
  const [currentLanguage, setCurrentLanguage] = useState(SupportedLanguages.en);
  return (
    <div>
      <Header {...props} logo={<PhillipsLogo />}>
        <Navigation id={`${px}-main-nav`}>
          <NavigationList id={`${px}-main-nav-list`}>
            <NavigationItemTrigger id="auctions" label="Auctions">
              <NavigationList id={`${px}-auctions-nav-list`}>
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Editions & Works on Paper"
                />
                <NavigationItem
                  badge="London"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Casa Fornaroli"
                />
                <NavigationItem
                  badge="Geneva"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="The Geneva Watch Auction: XVII"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Day Sale—Morning Session"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Day Sale—Afternoon Session"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Evening Sale"
                />
                <NavigationItem
                  badge="London"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Wired: Online Auction"
                />
                <NavigationItem
                  badge="Hong Kong "
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="The Imperial Patek Philippe Sale"
                />
                <NavigationItem
                  badge="Hong Kong"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Disruptors: Evening Sale of Modern & Contemporary Art, Design and Watches"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Browse Full Auction Calendar"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Auction Calendar"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Auction Results"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Artists & Makers"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="How To Buy"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Remote Bidding"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label="Calendar" />
            <NavigationItemTrigger id="departments" label="Departments">
              <NavigationList id={`${px}-departments-nav-list`}>
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art"
                />
                <NavigationItem href="#" navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} label="Design" />
                <NavigationItem href="#" navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} label="Editions" />
                <NavigationItem href="#" navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} label="Jewels" />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Photographs"
                />
                <NavigationItem href="#" navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} label="Watches" />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Private Sales"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItemTrigger id="exhibitions" label="Exhibitions">
              <NavigationList id={`${px}-exhibitions-nav-list`}>
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Written in the Sky: Works by Ed Ruscha"
                />
                <NavigationItem
                  badge="Paris"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modeler le papier // Shapes On Paper"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="ALT POP: An Alternative History to American Pop Art"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-lg"
                  navType={LinkVariants.snwFlyoutLink}
                  label="New Terrains: Contemporary Native American Art"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Past Exhibitions"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label="Perpetual" />
            <NavigationItem href="#" label="Dropshop" />
            <NavigationItemTrigger id="buy-sell" label="Buy & Sell">
              <NavigationList id={`${px}-buy-sell-nav-list`}>
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="How To Buy"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="How To Sell"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Remote Bidding"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Private Services"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Trusts, Estates & Valuations"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Fiduciary Services"
                />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Buy Catalogues"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label="Editorial" />
            <NavigationItemTrigger id="about-us" label="About Us">
              <NavigationList id={`${px}-about-us-nav-list`}>
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Our History"
                />
                <NavigationItem navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} href="#" label="Our Team" />
                <NavigationItem
                  navGroup="nav-link-sm"
                  navType={LinkVariants.snwFlyoutLink}
                  href="#"
                  label="Locations"
                />
                <NavigationItem navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} href="#" label="Press" />
                <NavigationItem navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} href="#" label="Careers" />
              </NavigationList>
            </NavigationItemTrigger>
          </NavigationList>
        </Navigation>
        <LanguageSelector onLanguageChange={setCurrentLanguage} currentLanguage={currentLanguage} />
        <UserManagement
          authState={authState}
          onLogin={() => console.log('login')}
          onLogout={() => console.log('logout')}
          accountDetailsLink={({ children }) => <a href="#">{children}</a>}
        />
        <Search />
      </Header>
      {generateLoremIpsum(200)}
    </div>
  );
};
