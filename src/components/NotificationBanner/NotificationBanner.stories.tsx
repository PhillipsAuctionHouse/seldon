import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { LanguageSelector } from '../../patterns/LanguageSelector';
import { AuthState } from '../../patterns/UserManagement/types';
import UserManagement from '../../patterns/UserManagement/UserManagement';
import Header, { HeaderProps } from '../../site-furniture/Header/Header';
import { SupportedLanguages } from '../../types/commonTypes';
import { px } from '../../utils';
import { Icon } from '../Icon';
import { LinkVariants } from '../Link';
import Navigation from '../Navigation/Navigation';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import NavigationItemTrigger from '../Navigation/NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from '../Navigation/NavigationList/NavigationList';
import Search, { SearchProps } from '../Search/Search';
import { SearchResult } from '../Search/SearchResults/SearchResults';
import NotificationBanner, { NotificationBannerProps } from './NotificationBanner';

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

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/NotificationBanner',
  component: NotificationBanner,
} satisfies Meta<typeof NotificationBanner>;

export default meta;
export const Playground = (props: NotificationBannerProps) => <NotificationBanner {...props} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  children: (
    <div style={{ fontWeight: '600', color: 'black', fontSize: '16px' }}>
      <a href="#" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        Our Moved by Beauty: Works by Lucie Rie from an Important Asian Collection Sale
      </a>{' '}
      is currently experiencing technical difficulties and there is a delay with livestream sale room bidding. You can
      bid, but there may be a delay with confirmations.
    </div>
  ),
};

Playground.argTypes = {};

export const WithHeader = ({ authState, ...props }: HeaderProps & { authState?: AuthState }) => {
  const [currentLanguage, setCurrentLanguage] = useState(SupportedLanguages.en);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [notificationData, setNotificationData] = useState<React.ReactNode>(<></>);
  const updateHeights = () => {
    if (bannerRef.current) setBannerHeight(bannerRef.current.clientHeight);
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  };

  useEffect(() => {
    updateHeights();

    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [notificationData]);

  useEffect(() => {
    // Simulate fetching notification data
    const timeout = setTimeout(() => {
      setNotificationData(
        <div style={{ fontWeight: '600', color: 'black', fontSize: '16px' }}>
          <a href="#" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Our Moved by Beauty: Works by Lucie Rie from an Important Asian Collection Sale
          </a>{' '}
          is currently experiencing technical difficulties and there is a delay with livestream sale room bidding. You
          can bid, but there may be a delay with confirmations.
        </div>,
      );
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <NotificationBanner ref={bannerRef}>{notificationData}</NotificationBanner>
      <Header {...props} logo={<Icon icon="PhillipsLogo" />} bannerHeight={bannerHeight as number} ref={headerRef}>
        <Navigation id={`${px}-main-nav`}>
          <NavigationList id={`${px}-main-nav-list`}>
            <NavigationItemTrigger id="auctions" label="Auctions">
              <NavigationList
                id={`${px}-auctions-nav-list`}
                leftSectionHeading="Upcoming"
                rightSectionHeading="Auction Information & Services"
                bannerHeadingHeight={(bannerHeight + headerHeight) as number}
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
      <div style={{ ['paddingTop']: `${bannerHeight + headerHeight}px` } as React.CSSProperties}>
        {generateLoremIpsum(100)}
      </div>
    </div>
  );
};
