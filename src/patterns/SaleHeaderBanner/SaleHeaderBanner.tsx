import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { SeldonImage } from '../../components/SeldonImage';
import { LotStatus } from '../../types/commonTypes';
import { Text, TextVariants } from '../../components/Text';
import { PageContentWrapper as PageMargin } from '../../components/PageContentWrapper';
import Button from '../../components/Button/Button';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface SaleHeaderBannerProps extends ComponentProps<'div'> {
  /**
   * What is the title of the auction?
   */
  auctionTitle: React.ReactNode;
  /**
   * The URL of the banner image
   */
  imageSrcUrl: string;
  /**
   * Where is the auction taking place?
   */
  location: React.ReactNode;

  occurrenceInformation: {
    /**
     * Depending on auction state, when does the auction open or close
     */
    date: React.ReactNode;
    /**
     * Clarifies the date based on the auction state
     */
    occurrenceLabel: React.ReactNode;
  }[];

  /**
   * What is the current state of the auction?
   */
  auctionState: LotStatus;
  /**
   * What text should the CTA button display?
   */
  ctaLabel?: React.ReactNode;
  /**
   * What action does the CTA take?
   */
  onClick?: () => void;
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

const SaleHeaderBanner = forwardRef<HTMLDivElement, SaleHeaderBannerProps>(
  (
    {
      auctionTitle,
      imageSrcUrl,
      location,
      auctionState,
      occurrenceInformation,
      ctaLabel = 'Register to Bid',
      onClick,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleHeaderBanner');
    const isOpenForBidding = auctionState === LotStatus.live;
    const isClosed = auctionState === LotStatus.past;
    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        <SeldonImage
          aspectRatio="16/9"
          src={imageSrcUrl}
          alt={String(auctionTitle)}
          objectFit="cover"
          className={`${baseClassName}__image`}
        />
        <PageMargin className={`${baseClassName}__stack-wrapper`} {...commonProps} {...props} ref={ref}>
          <div className={`${baseClassName}__stack`}>
            {isOpenForBidding && children}
            <Text variant={TextVariants.title1}>{auctionTitle}</Text>
            <Text variant={TextVariants.string2} className={`${baseClassName}__location`}>
              {location}
            </Text>
            <div className={`${baseClassName}__occurrence-details`}>
              {occurrenceInformation.map(({ date, occurrenceLabel }) => (
                <div className={`${baseClassName}__occurrence-details-text`} key={String(date)}>
                  <Text variant={TextVariants.string2}>{occurrenceLabel}</Text>
                  <Text variant={TextVariants.string2} className={`${baseClassName}__date`}>
                    {date}
                  </Text>
                </div>
              ))}

              {isClosed && children}
            </div>
            {!isClosed && (
              <Button className={`${baseClassName}__cta`} onClick={onClick}>
                {ctaLabel}
              </Button>
            )}
          </div>
        </PageMargin>
      </div>
    );
  },
);

SaleHeaderBanner.displayName = 'SaleHeaderBanner';

export default SaleHeaderBanner;
