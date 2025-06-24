import { Meta } from '@storybook/react';
import SaleCard, { SaleCardProps } from './SaleCard';
import { getScssVar } from '../../utils/scssUtils';

const meta = {
  title: 'Components/SaleCard',
  component: SaleCard,
} satisfies Meta<typeof SaleCard>;

export default meta;

export const Playground = (props: SaleCardProps) => (
  <div>
    <SaleCard {...props} />
  </div>
);

const defaultProps = {
  imageSrc: 'https://picsum.photos/160/90',
  type: 'Live Auction',
  title: 'Modern & Contemporary Art Day Sale, Morning Session',
  date: '2 PM EST, May 27, 2025',
  location: 'New York',
};

Playground.args = { ...defaultProps };

Playground.argTypes = {};

const divider = (
  <div
    style={{
      height: '1px',
      backgroundColor: getScssVar('$light-gray', '#ECEAE7'),
      width: '100%',
    }}
  />
);

export const MultipleSales = () => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--spacing-sm)',
      flexDirection: 'column',
    }}
  >
    <SaleCard {...defaultProps} />
    {divider}
    <SaleCard {...defaultProps} title="Modern & Contemporary Art Day Sale, Afternoon Session" location="Hong Kong" />
    {divider}
    <SaleCard {...defaultProps} title="Modern & Contemporary: Online Auction, New York" date="27 Aug - 05 Sep" />
  </div>
);

export const WithBothCTAButtons = () => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--spacing-sm)',
      flexDirection: 'column',
    }}
  >
    <SaleCard
      {...defaultProps}
      primaryButtonText="Join Sale room"
      primaryButtonOnClick={() => console.log('Primary button clicked')}
      secondaryButtonText="Register to Bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      badgeText="Happening Now"
      modalLink={{
        text: 'Session & Viewing Details',
        onClick: () => console.log('Modal link clicked'),
      }}
    />
    {divider}
    <SaleCard
      {...defaultProps}
      primaryButtonText="Join Sale room"
      primaryButtonOnClick={() => console.log('Primary button clicked')}
      secondaryButtonText="Register to Bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      title="Modern & Contemporary Art Day Sale, Afternoon Session"
      location="Hong Kong"
      badgeText="Accepting Consignments"
      modalLink={{
        text: 'Session & Viewing Details',
        onClick: () => console.log('Modal link clicked'),
      }}
    />
    {divider}
    <SaleCard
      {...defaultProps}
      primaryButtonText="Browse"
      primaryButtonOnClick={() => console.log('Primary button clicked')}
      secondaryButtonText="Register to Bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      title="Modern & Contemporary: Online Auction, New York"
      date="27 Aug - 05 Sep"
      badgeText="Bidding Open"
      modalLink={{
        text: 'Session & Viewing Details',
        onClick: () => console.log('Modal link clicked'),
      }}
    />
  </div>
);

export const WithOnlyPrimaryCTAButton = () => (
  <SaleCard
    {...defaultProps}
    badgeText="Happening Now"
    modalLink={{
      text: 'Session & Viewing Details',
      onClick: () => console.log('Modal link clicked'),
    }}
    primaryButtonText="Sell with us"
    primaryButtonOnClick={() => console.log('Primary button clicked')}
  />
);

export const WithOnlySecondaryCTAButton = () => (
  <SaleCard
    imageSrc="https://picsum.photos/160/90"
    type="Live Auction"
    title="Modern & Contemporary Art Day Sale, Morning Session"
    date="2 PM EST, May 27, 2025"
    location="New York"
    primaryButtonText="Bid Now"
    primaryButtonOnClick={() => console.log('Primary button clicked')}
    secondaryButtonText="Register to "
    secondaryButtonOnClick={() => console.log('Secondary button clicked')}
    badgeText="Happening Now"
    modalLink={{
      text: 'Session & Viewing Details',
      onClick: () => console.log('Modal link clicked'),
    }}
  />
);

export const WithDownloadPdfLink = () => (
  <SaleCard
    {...defaultProps}
    primaryButtonText="View Results"
    primaryButtonOnClick={() => console.log('Primary button clicked')}
    badgeText="Happening Now"
    modalLink={{
      text: 'Session & Viewing Details',
      onClick: () => console.log('Modal link clicked'),
    }}
    pdfLink={{
      text: 'Download PDF',
      url: 'https://dist.phillips.com/content/web/docs/forms/NY_Conditions_of_Sale.pdf',
    }}
  />
);

export const WithoutCTAButtons = () => (
  <SaleCard
    imageSrc="https://picsum.photos/160/90"
    type="Live Auction"
    title="Modern & Contemporary Art Day Sale, Morning Session"
    date="2 PM EST, May 27, 2025"
    location="New York"
    badgeText="Happening Now"
    modalLink={{
      text: 'Session & Viewing Details',
      onClick: () => console.log('Modal link clicked'),
    }}
  />
);
