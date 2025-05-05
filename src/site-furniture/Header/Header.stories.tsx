import { faker } from '@faker-js/faker';
import type { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { LinkVariants } from '../../components/Link/types';
import Navigation from '../../components/Navigation/Navigation';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../../components/Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import Search, { SearchProps } from '../../components/Search/Search';
import { SearchResult } from '../../components/Search/SearchResults/SearchResults';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import { AuthState } from '../../patterns/UserManagement/types';
import UserManagement from '../../patterns/UserManagement/UserManagement';
import { SupportedLanguages } from '../../types/commonTypes';
import { px } from '../../utils';
import Header, { HeaderProps } from './Header';

const generateLoremIpsum = (numOfParagraphs = 10) => {
  let loremIpsum = '';
  for (let i = 0; i < numOfParagraphs; i++) {
    loremIpsum += faker.lorem.paragraph();
  }
  return loremIpsum;
};

const fetchData = async (searchQuery: string) => {
  console.log('searchQuery', searchQuery);
  let searchResults: { makers: Array<SearchResult> } = { makers: [] };
  // Call to get search results
  searchResults = await new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          makers: [
            { id: 'result1', label: 'Name', url: 'http://www.example.com' },
            { id: 'result2', label: 'Another Name', url: 'http://www.example.com' },
            { id: 'result3', label: 'Yet Another Name', url: 'http://www.example.com' },
            { id: 'result4', label: 'Name', url: 'http://www.example.com' },
            { id: 'result5', label: 'Another Name', url: 'http://www.example.com' },
            { id: 'result6', label: 'Yet Another Name Yet Again', url: 'http://www.example.com' },
            { id: 'result7', label: 'Name', url: 'http://www.example.com' },
            { id: 'result8', label: 'Another Name', url: 'http://www.example.com' },
            { id: 'result9', label: 'Yet Another Name Yet Again', url: 'http://www.example.com' },
            { id: 'result10', label: 'Name', url: 'http://www.example.com' },
            { id: 'result11', label: 'Another Name', url: 'http://www.example.com' },
            { id: 'result12', label: 'Yet Another Name Yet Again', url: 'http://www.example.com' },
          ],
        }),
      2000,
    );
  });
  return searchResults;
};

const StatefulSearch = (props: SearchProps) => {
  const [autoCompleteResults, setAutoCompleteResults] = React.useState([] as Array<SearchResult>);
  const [state, setState] = React.useState<SearchProps['state']>('idle');

  const onSearch = (searchQuery: string) => {
    if (searchQuery?.includes('?')) {
      setState('invalid');
      return;
    }
    // Call to get auto complete results
    if (searchQuery.length > 2) {
      setState('loading');
      fetchData(searchQuery)
        .then((data) => {
          setAutoCompleteResults(data.makers);
          setState('idle');
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <Search
      {...props}
      onSearch={(value) => {
        onSearch(value);
      }}
      searchResults={autoCompleteResults}
      state={state}
    />
  );
};

const meta = {
  title: 'SiteFurniture/Header',
  component: Header,
  subcomponents: { Search: Search as React.ComponentType<unknown> },
  parameters: {
    docs: {
      story: {
        height: '700px',
      },
    },
    layout: 'fullscreen',
  },
  args: {
    // @ts-expect-error passing UserManagement authState prop through in this story
    authState: AuthState.LoggedOut,
  },
  // @ts-expect-error passing UserManagement authState prop through in this story
  argTypes: { authState: { control: { type: 'select' }, options: Object.values(AuthState) } },
} satisfies Meta<typeof Header>;

export default meta;

export const Playground = ({ authState, ...props }: HeaderProps & { authState?: AuthState }) => {
  const [currentLanguage, setCurrentLanguage] = useState(SupportedLanguages.en);
  return (
    <div style={{ minHeight: '400px' }}>
      <Header {...props} logo={<Icon icon="PhillipsLogo" />}>
        <Navigation id={`${px}-main-nav`}>
          <NavigationList id={`${px}-main-nav-list`}>
            <NavigationItemTrigger id="auctions" label="Auctions">
              <NavigationList
                id={`${px}-auctions-nav-list`}
                leftSectionHeading="Upcoming"
                rightSectionHeading="Auction Information & Services"
              >
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Editions & Works on Paper"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Design"
                />
                <NavigationItem
                  badge="Geneva"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Reloaded: The Rebirth of Mechanical Watchmaking, 1980-1999"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Phillips Watches Online: The Geneva Sessions, Fall 2024"
                />
                <NavigationItem
                  badge="Hong Kong"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Evening Sale"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Damien Hirst: Online Auction"
                />
                <NavigationItem
                  badge="Hong Kong"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="New Now: Modern & Contemporary Art"
                />
                <NavigationItem
                  badge="London"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Casa Fornaroli"
                />
                <NavigationItem
                  badge="Geneva"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="The Geneva Watch Auction: XVII"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Day Sale—Morning Session"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Day Sale—Afternoon Session"
                />
                <NavigationItem
                  badge="New York"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art Evening Sale"
                />
                <NavigationItem
                  badge="London"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Wired: Online Auction"
                />
                <NavigationItem
                  badge="Hong Kong "
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="The Imperial Patek Philippe Sale"
                />
                <NavigationItem
                  badge="Hong Kong"
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Disruptors: Evening Sale of Modern & Contemporary Art, Design and Watches"
                />
                <NavigationItem
                  href="#"
                  isViewAllLink
                  navGroup="nav-link-start"
                  navType={LinkVariants.link}
                  label="View All"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-end"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Auction Calendar"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-end"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Auction Results"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-end"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Artists & Makers"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-end"
                  navType={LinkVariants.snwFlyoutLink}
                  label="How To Buy"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-end"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Remote Bidding"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" label="Calendar" />
            <NavigationItemTrigger id="departments" label="Departments">
              <NavigationList id={`${px}-departments-nav-list`} leftSectionHeading="Our Specialist Departments">
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Modern & Contemporary Art"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Design"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Editions"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Jewels"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Photographs"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Watches"
                />
                <NavigationItem
                  href="#"
                  navGroup="nav-link-start"
                  navType={LinkVariants.snwFlyoutLink}
                  label="Private Sales"
                />
                <NavigationItem
                  href="#"
                  isViewAllLink
                  navGroup="nav-link-start"
                  navType={LinkVariants.link}
                  label="View All"
                />
              </NavigationList>
            </NavigationItemTrigger>
            <NavigationItem href="#" id="exhibitions" label="Exhibitions" />
            <NavigationItem href="#" label="Perpetual" />
            <NavigationItem href="#" label="Dropshop" />
            <NavigationItem href="#" label="Editorial" />
          </NavigationList>
          <StatefulSearch placeholder="Search for makers" />
        </Navigation>
        <LanguageSelector onLanguageChange={setCurrentLanguage} currentLanguage={currentLanguage} />
        <UserManagement authState={authState} onLogin={() => console.log('login')} href="/account" />
      </Header>
      {generateLoremIpsum(50)}
    </div>
  );
};
