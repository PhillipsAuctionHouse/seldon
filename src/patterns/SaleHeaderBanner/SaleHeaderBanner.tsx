import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../../components/Text';
import Button from '../../components/Button/Button';
import { PageContentWrapper as PageMargin } from '../../components/PageContentWrapper';
import { Link } from '../../components/Link';
import { AuctionState } from './types';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface SaleHeaderBannerProps extends ComponentProps<'header'> {
  /**
   * What is the title of the auction?
   */
  auctionTitle: string;
  /**
   * Where is the auction taking place?
   */
  location: string;
  /**
   * Depending on auction state, When does the auction open or close
   */
  date: string;
  /**
   * Clarifies the date based on the auction state
   */
  occuranceLabel: string;
  /**
   * What is the current state of the auction?
   */
  auctionState: AuctionState;
  /**
   * The URL of the banner image
   */
  imageSrcUrl: string;
}
/**
 * ## Overview
 *
 * Sale header banner component, supports 3 states of the auction: pre-sale, open for bidding, and closed.
 *
 * [Figma Link](https://www.figma.com/design/OvBXAq48blO1r4qYbeBPjW/RW---Sale-Page-(PLP)?node-id=1-6&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-saleheaderbanner--overview)
 */

const SaleHeaderBanner = forwardRef<HTMLElement, SaleHeaderBannerProps>(
  ({ auctionTitle, date, location, auctionState, imageSrcUrl, occuranceLabel, className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleHeaderBanner');

    const isOpenForBidding = auctionState === AuctionState.openForBidding;
    const isClosed = auctionState === AuctionState.past;

    return (
      <header {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <img
          id="PLACEHOLDER FOR IMAGE COMPONENT"
          alt={auctionTitle}
          className={`${baseClassName}__image`}
          src={imageSrcUrl}
        ></img>
        <PageMargin>
          <div className={`${baseClassName}__stack`}>
            {isOpenForBidding && (
              <div id="PLACEHOLDER FOR TIMER COMPONENT" className={`${baseClassName}__countdown-container`}>
                <Text variant={TextVariants.heading5}>Lots Close in</Text>
                <Text variant={TextVariants.heading5}>2 Days</Text>
                <Text variant={TextVariants.heading5}>17 Hours</Text>
              </div>
            )}
            <Text variant={TextVariants.title1}>{auctionTitle}</Text>
            <Text variant={TextVariants.string2} className={`${baseClassName}__location`}>
              {location}
            </Text>
            <div
              className={
                isClosed ? `${baseClassName}__occurance-details-closed` : `${baseClassName}__occurance-details`
              }
            >
              <div className={`${baseClassName}__occurance-details-text`}>
                <Text variant={TextVariants.string2}>{occuranceLabel}</Text>
                <Text variant={TextVariants.string2} className={`${baseClassName}__date`}>
                  {date}
                </Text>
              </div>
              {isClosed && (
                <>
                  <hr />
                  <div className={`${baseClassName}__occurance-details-text`}>
                    <Text variant={TextVariants.string2}>Browse Upcoming Sale</Text>
                    <Link href="/calendar">View Calendar</Link>
                  </div>
                </>
              )}
            </div>
            {!isClosed && <Button className={`${baseClassName}__cta`}>Register to Bid</Button>}
          </div>
        </PageMargin>
      </header>
    );
  },
);

SaleHeaderBanner.displayName = 'SaleHeaderBanner';

export default SaleHeaderBanner;
