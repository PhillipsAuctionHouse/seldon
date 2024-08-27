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

export const Playground = ({
  // authState,
  ...props
}: HeaderProps & { authState?: AuthState }) => (
  <div>
    <Header {...props}>
      <Navigation id={`${px}-main-nav`} backBtnLabel="← Back">
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
              <NavigationItem href="#" navGroup="nav-link-sm" navType={LinkVariants.snwFlyoutLink} label="How To Buy" />
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
          <NavigationItem href="#" label="Exhibitions" />
          <NavigationItem href="#" label="Perpetual" />
          <NavigationItem href="#" label="Dropshop" />
          <NavigationItem href="#" label="Editorial" />
          {/* <UserManagement
            authState={authState}
            onLanguageChange={(language) => console.log('languageChange', language)}
          /> */}
        </NavigationList>
        <Search placeholder="Search for makers" />
      </Navigation>
    </Header>
    <main>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </main>
  </div>
);
