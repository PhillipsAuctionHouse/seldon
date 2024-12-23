import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Countdown } from '../../components/Countdown';
import { SeldonImage } from '../../components/SeldonImage';
import { AuctionStatus } from '../../types/commonTypes';
import { Text, TextVariants } from '../../components/Text';
import { PageContentWrapper as PageMargin } from '../../components/PageContentWrapper';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface SaleHeaderBannerProps extends ComponentProps<'div'> {
  /**
   * The time that lots start to close (for live auctions)
   */
  auctionEndTime?: Date;
  /**
   * What is the title of the auction?
   */
  auctionTitle: React.ReactNode;
  /**
   * The URL of the banner image
   */
  imageSrcUrl: string;
  /**
   * The srcset of the banner image [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset]
   */
  imageSrcSet?: string;
  /**
   * The sizes of the banner image [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes]
   */
  imageSizes?: ComponentProps<'img'>['sizes'];
  /**
   * Image loading attribute. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading]
   */
  imageLoading?: ComponentProps<'img'>['loading'];
  /**
   * Image fetch priority. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-fetchpriority]
   */
  imageFetchPriority?: ComponentProps<'img'>['fetchPriority'];
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
  auctionState: AuctionStatus;
  /**
   * The label for the header
   */
  headerLabel: React.ReactNode;
  /**
   * An element to be rendered at the bottom of the banner
   */
  footerElement?: React.ReactNode;
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
      auctionEndTime,
      auctionTitle,
      imageSrcUrl,
      imageSrcSet,
      imageSizes,
      imageLoading,
      imageFetchPriority,
      location,
      auctionState,
      occurrenceInformation,
      onClick,
      children,
      className,
      footerElement,
      headerLabel,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SaleHeaderBanner');
    const isOpenForBidding = auctionState === AuctionStatus.live;

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {isOpenForBidding && auctionEndTime ? (
          <div className={`${baseClassName}__stack__mobile-countdown`}>
            {<Countdown endDateTime={auctionEndTime} showBottomBorder={false} />}
          </div>
        ) : null}
        <SeldonImage
          aspectRatio="16/9"
          src={imageSrcUrl}
          alt={String(auctionTitle)}
          objectFit="cover"
          className={`${baseClassName}__image`}
          srcSet={imageSrcSet}
          sizes={imageSizes}
          loading={imageLoading}
          fetchPriority={imageFetchPriority}
        />
        <PageMargin className={`${baseClassName}__stack-wrapper`} {...commonProps} {...props} ref={ref}>
          <div className={`${baseClassName}__stack`}>
            {isOpenForBidding && auctionEndTime ? (
              <div className={`${baseClassName}__stack__desktop-countdown`}>
                {<Countdown endDateTime={auctionEndTime} />}
              </div>
            ) : null}
            <Text variant={TextVariants.badge}>{headerLabel}</Text>
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
              {children}
            </div>
            {footerElement}
          </div>
        </PageMargin>
      </div>
    );
  },
);

SaleHeaderBanner.displayName = 'SaleHeaderBanner';

export default SaleHeaderBanner;
