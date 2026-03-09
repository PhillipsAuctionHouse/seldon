import type { Meta } from '@storybook/react-vite';

import Navigation from './Navigation';
import NavigationItemWithSubmenu from './NavigationItemWithSubmenu/';
import NavigationList from './NavigationList/NavigationList';
import NavigationSubmenu from './NavigationSubmenu/NavigationSubmenu';
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
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  return (
    <HeaderContext.Provider
      value={{
        ...defaultHeaderContext,
        isSearchExpanded,
        setIsSearchExpanded,
        activeSubmenuId,
        setActiveSubmenuId,
      }}
    >
      <Navigation style={{ position: 'relative' } as CSSProperties}>
        {/* emulates the header that does the absolute positioning for submenus*/}
        <NavigationList id="topmenu">
          <NavigationItemWithSubmenu id="auctions-menu" label="Auctions">
            <NavigationSubmenu id="auctions-submenu" leftSectionHeading="Auctions">
              <NavigationItem
                badge="New York"
                href="#"
                navGroup="nav-link-start"
                navType={LinkVariants.linkLarge}
                label="Editions & Works on Paper"
              />
              <NavigationItem
                badge="London"
                href="#"
                navGroup="nav-link-start"
                navType={LinkVariants.linkLarge}
                label="Casa Fornaroli"
              />
              <NavigationItem href="#" navGroup="nav-link-end" label="View all Auctions" />
            </NavigationSubmenu>
          </NavigationItemWithSubmenu>
          <NavigationItem href="#" label="Calendar" />
        </NavigationList>
        <Search placeholder="Search" />
      </Navigation>
    </HeaderContext.Provider>
  );
};
