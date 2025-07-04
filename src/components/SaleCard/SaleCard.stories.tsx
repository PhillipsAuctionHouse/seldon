import { Meta } from '@storybook/react';
import SaleCard, { SaleCardProps } from './SaleCard';
import { getScssVar } from '../../utils/scssUtils';
import { SaleCardVariants } from './types';

const meta = {
  title: 'Patterns/SaleCard',
  component: SaleCard,
} satisfies Meta<typeof SaleCard>;

export default meta;

export const SaleCardPlayground = (props: SaleCardProps) => (
  <div>
    <SaleCard {...props} />
  </div>
);

const defaultProps = {
  imageSrc: 'https://picsum.photos/160/90',
  auctionType: 'Live Auction',
  titleText: 'Modern & Contemporary Art Day Sale, Morning Session',
  date: '2 PM EST, May 27, 2025',
  location: 'New York',
};

SaleCardPlayground.args = { ...defaultProps };

SaleCardPlayground.argTypes = {};

const divider = (
  <div
    style={{
      height: '1px',
      backgroundColor: getScssVar('$light-gray', '#ECEAE7'),
      width: '100%',
    }}
  />
);

export const SaleCardRelated = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexDirection: 'column' }}>
    <SaleCard {...defaultProps} variant={SaleCardVariants.RELATED_SALE_TILE} badgeText="Happening Now" />
    {divider}
    <SaleCard
      {...defaultProps}
      titleText="Modern & Contemporary Art Day Sale, Afternoon Session"
      location="Hong Kong"
      badgeText="Happening Now"
      variant={SaleCardVariants.RELATED_SALE_TILE}
    />
    {divider}
    <SaleCard
      {...defaultProps}
      titleText="Modern & Contemporary: Online Auction, New York"
      date="27 Aug - 05 Sep"
      badgeText="Happening Now"
      variant={SaleCardVariants.RELATED_SALE_TILE}
    />
  </div>
);

export const SaleCardWithPrimaryAndSecondaryCTA = () => (
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
      secondaryButtonText="Register to bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      badgeText="Happening Now"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
      imageSrc="https://via.placeholder.com/400"
    />
    {divider}
    <SaleCard
      {...defaultProps}
      primaryButtonText="Join Sale room"
      primaryButtonOnClick={() => console.log('Primary button clicked')}
      secondaryButtonText="Register to bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      titleText="Modern & Contemporary Art Day Sale, Afternoon Session"
      location="Hong Kong"
      badgeText="Accepting Consignments"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
    />
    {divider}
    <SaleCard
      {...defaultProps}
      primaryButtonText="Browse"
      primaryButtonOnClick={() => console.log('Primary button clicked')}
      secondaryButtonText="Register to bid"
      secondaryButtonOnClick={() => console.log('Secondary button clicked')}
      titleText="Modern & Contemporary: Online Auction, New York"
      date="27 Aug - 05 Sep"
      badgeText="Bidding Open"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
    />
  </div>
);

export const SaleCardWithPrimaryCTA = () => (
  <SaleCard
    {...defaultProps}
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
    primaryButtonText="Sell with us"
    primaryButtonOnClick={() => console.log('Primary button clicked')}
  />
);

export const SaleCardWithSecondaryCTA = () => (
  <SaleCard
    imageSrc="https://picsum.photos/160/90"
    auctionType="Live Auction"
    titleText="Modern & Contemporary Art Day Sale, Morning Session"
    date="2 PM EST, May 27, 2025"
    location="New York"
    secondaryButtonText="Register to bid"
    secondaryButtonOnClick={() => console.log('Secondary button clicked')}
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
  />
);

export const SaleCardWithDownloadLink = () => (
  <SaleCard
    {...defaultProps}
    primaryButtonText="View Results"
    primaryButtonOnClick={() => console.log('Primary button clicked')}
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
    secondaryButtonText="Download PDF"
    secondaryButtonHref="https://dist.phillips.com/content/web/docs/forms/NY_Conditions_of_Sale.pdf"
  />
);

export const SaleCardNoCTA = () => (
  <SaleCard
    imageSrc="https://picsum.photos/160/90"
    auctionType="Live Auction"
    titleText="Modern & Contemporary Art Day Sale, Morning Session"
    date="2 PM EST, May 27, 2025"
    location="New York"
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
  />
);
