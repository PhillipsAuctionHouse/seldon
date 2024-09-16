import type { Meta } from '@storybook/react';
import Header, { HeaderProps } from './Header';
import Navigation from '../../components/Navigation/Navigation';
import NavigationList from '../../components/Navigation/NavigationList/NavigationList';
import NavigationItemTrigger from '../../components/Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import { LinkVariants } from '../../components/Link/types';
import { px } from '../../utils';
import UserManagement from '../../patterns/UserManagement/UserManagement';
import Search, { SearchProps } from '../../components/Search/Search';
import { AuthState } from '../../patterns/UserManagement/types';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import PhillipsLogo from '../../assets/PhillipsLogo.svg?react';
import { SupportedLanguages } from '../../types/commonTypes';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { SearchResult } from '../../components/Search/SearchResults/SearchResults';
import React from 'react';

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
    <div style={{ maxHeight: '400px' }}>
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
