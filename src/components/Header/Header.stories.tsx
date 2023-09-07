import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

// import Navigation from '../Navigation/Navigation'
// import NavigationList from '../Navigation/NavigationList';
// import NavigationListItem from '../Navigation/NavigationListItem';
// import NavigationListItemTrigger from '../Navigation/NavigationListItemTrigger';
import Header from './Header';
import Logo from '../../PhillipsLogo.svg'
import { HeaderComponent } from '../Navigation/Navigation.stories';
import StatefulHeader from './StatefulHeader';

// const HeaderComponent = () => {
//   const [expandedItem, setExpandedItem] = React.useState("Main Menu");
//   const expanded = expandedItem !== "Main Menu"
//   return (
//     <div className="phillips-header-nav">
//       <Navigation id="main-nav" label={expandedItem} backBtnLabel="← Back" onBack={() => setExpandedItem('Main Menu')}  expanded={expanded}>
//         <NavigationList expanded={expanded}>
//           <NavigationListItemTrigger label="Auctions" expandedItem={expandedItem} onClick={() => setExpandedItem('Auctions')}>
//             <NavigationList>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Interserct: Online Auction, Hong Kong</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>David Hockney, London</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Editions & Works on Paper, New York</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Auction Results</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Artist & Makers</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>How to Buy</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Auctions' ? 0 : -1}>Remote Bidding</NavigationListItem>
//             </NavigationList>
//           </NavigationListItemTrigger>
//           <NavigationListItem href="#">Calendar</NavigationListItem>
//           <NavigationListItemTrigger label="Departments" expandedItem={expandedItem} onClick={() => setExpandedItem('Departments')}>
//             <NavigationList>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>20th Century & Contemporary Art</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Design</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Editions</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Jewels</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Photographs</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Watches</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Departments' ? 0 : -1}>Private Sales</NavigationListItem>
//             </NavigationList>
//           </NavigationListItemTrigger>
//           <NavigationListItem element="button">Test-button</NavigationListItem>
//           <NavigationListItem element="p">Test-p</NavigationListItem>
//           <NavigationListItemTrigger label="Test-subnav" expandedItem={expandedItem} onClick={() => setExpandedItem('Test-subnav')}>
//             <NavigationList>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}>Test-subnav-1</NavigationListItem>
//               <NavigationListItem href="#" tabIndex={expandedItem === 'Test-subnav' ? 0 : -1}>Test-subnav-2</NavigationListItem>
//             </NavigationList>
//           </NavigationListItemTrigger>
//         </NavigationList>
//       </Navigation>
//     </div>
//   )
// }
const meta = {
  title: 'Components/Header',
  component: StatefulHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Playground: Story = {
  decorators: [StatefulHeader]
};


