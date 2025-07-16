import { Meta } from '@storybook/react';
import SaleCard, { SaleCardProps } from './SaleCard';
import { getScssVar } from '../../utils/scssUtils';
import { SaleCardVariants } from './types';
import { SaleCardActions } from './SaleCardActions';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { px } from '../../utils';
import './_saleCard.scss';

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
      badgeText="Happening Now"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
      imageSrc="https://via.placeholder.com/400"
    >
      <SaleCardActions>
        <Button
          className={`${px}-sale-card__cta_button`}
          onClick={() => console.log('Primary button clicked')}
          variant={ButtonVariants.primary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Join Sale room
        </Button>
        <Button
          className={`${px}-sale-card__cta_button`}
          onClick={() => console.log('Secondary button clicked')}
          variant={ButtonVariants.secondary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Register to bid
        </Button>
      </SaleCardActions>
    </SaleCard>
    {divider}
    <SaleCard
      {...defaultProps}
      titleText="Modern & Contemporary Art Day Sale, Afternoon Session"
      location="Hong Kong"
      badgeText="Accepting Consignments"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
    >
      <SaleCardActions>
        <Button
          onClick={() => console.log('Primary button clicked')}
          variant={ButtonVariants.primary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Join Sale room
        </Button>
        <Button
          onClick={() => console.log('Secondary button clicked')}
          variant={ButtonVariants.secondary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Register to bid
        </Button>
      </SaleCardActions>
    </SaleCard>
    {divider}
    <SaleCard
      {...defaultProps}
      titleText="Modern & Contemporary: Online Auction, New York"
      date="27 Aug - 05 Sep"
      badgeText="Bidding Open"
      modalButtonText="Session and viewing details"
      modalButtonOnClick={() => console.log('Modal button clicked')}
    >
      <SaleCardActions>
        <Button
          onClick={() => console.log('Primary button clicked')}
          variant={ButtonVariants.primary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Browse
        </Button>
        <Button
          onClick={() => console.log('Secondary button clicked')}
          variant={ButtonVariants.secondary}
          style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
        >
          Register to bid
        </Button>
      </SaleCardActions>
    </SaleCard>
  </div>
);

export const SaleCardWithPrimaryCTA = () => (
  <SaleCard
    {...defaultProps}
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
  >
    <SaleCardActions>
      <Button
        onClick={() => console.log('Primary button clicked')}
        variant={ButtonVariants.primary}
        style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
      >
        Sell with us
      </Button>
    </SaleCardActions>
  </SaleCard>
);

export const SaleCardWithSecondaryCTA = () => (
  <SaleCard
    imageSrc="https://picsum.photos/160/90"
    auctionType="Live Auction"
    titleText="Modern & Contemporary Art Day Sale, Morning Session"
    date="2 PM EST, May 27, 2025"
    location="New York"
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
  >
    <SaleCardActions>
      <Button
        onClick={() => console.log('Secondary button clicked')}
        variant={ButtonVariants.secondary}
        style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
      >
        Register to bid
      </Button>
    </SaleCardActions>
  </SaleCard>
);

export const SaleCardWithDownloadLink = () => (
  <SaleCard
    {...defaultProps}
    badgeText="Happening Now"
    modalButtonText="Session and viewing details"
    modalButtonOnClick={() => console.log('Modal button clicked')}
  >
    <SaleCardActions>
      <Button
        onClick={() => console.log('Primary button clicked')}
        variant={ButtonVariants.primary}
        style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
      >
        View Results
      </Button>
      <Button
        href="https://dist.phillips.com/content/web/docs/forms/NY_Conditions_of_Sale.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variant={ButtonVariants.tertiary}
        style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
      >
        Download PDF
      </Button>
    </SaleCardActions>
  </SaleCard>
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
