import type { Meta } from '@storybook/react';

import Navigation from './Navigation';
import NavigationItemTrigger from './NavigationItemTrigger/NavigationItemTrigger';
import NavigationList from './NavigationList/NavigationList';
import NavigationItem from './NavigationItem/NavigationItem';
import { LinkVariants } from '../Link';
import Search from '../Search/Search';
import { CSSProperties, useState } from 'react';
import { HeaderContext } from '../../site-furniture/Header/Header';
import { defaultHeaderContext } from '../../site-furniture/Header/utils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '600px',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navigation>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Playground = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  return (
    <HeaderContext.Provider value={{ ...defaultHeaderContext, isSearchExpanded, setIsSearchExpanded }}>
      <Navigation style={{ position: 'relative' } as CSSProperties}>
        {/* emulates the header that does the absolute positioning for submenus*/}
        <NavigationList id="topmenu">
          <NavigationItemTrigger label="Auctions">
            <NavigationList id="submenu">
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
            </NavigationList>
          </NavigationItemTrigger>
          <NavigationItem href="#" label="Calendar" />
        </NavigationList>
        <Search placeholder="Search" />
      </Navigation>
    </HeaderContext.Provider>
  );
};
