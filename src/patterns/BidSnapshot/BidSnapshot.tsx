import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';

import { findChildrenExcludingTypes, findChildrenOfType, getCommonProps } from '../../utils';
import { DetailList } from '../DetailList/index';
import { Detail } from '../../components/Detail/index';
import { AuctionStatus, SupportedLanguages } from '../../types/commonTypes';
import { Countdown } from '../../components/Countdown/index';
import { CountdownVariants } from '../../components/Countdown/types';
import { BidStatusEnum } from './types';
import BidMessage from './BidMessage';

export interface BidSnapshotProps extends ComponentProps<'div'> {
  /**
   * The user's current bid state, winning or losing, etc.
   */
  bidStatus?: BidStatusEnum;
  /**
   * State of the object
   */
  auctionStatus?: AuctionStatus;
  /**
   * Bids label text, a fucntion for label of bids amoutn (2 bids, 3 bids, etc) where the number is the length of the bids array.
   */
  bidsLabelText?: (numberOfBids: number) => string;
  /**
   * Currency to use for object - '$'
   */
  currency?: string | null;
  /**
   * The current highest bid for the object - '1000'
   */
  currentBid?: number | null;
  /**
   * Current bid text, a string for label of current bid detail
   */
  currentBidText?: string;
  /**
   * Closing label text, for countdown timer
   */
  closingText?: string;
  /**
   * Function to modify strings coming from date-fns (Minutes -> Mins etc)
   */
  formatDurationStr?: (duration: string) => string;
  /**
   * Language selection for the application
   */
  lang?: keyof typeof SupportedLanguages;
  /**
   * End time for this object
   */
  lotCloseDate?: Date | null;
  /**
   * Number of bids for each lot
   */
  numberOfBids?: number;
  /**
   * Default Starting bid amount for the object - '1000'
   */
  startingBid?: number | null;
  /**
   * Starting bid text, a string for label of starting bid detail
   */
  startingBidText?: string;
  /**
   * Sold for label text, a string for label of sold for detail
   */
  soldForText?: string;
  /**
   * Won for label text, a string for label of won for detail
   */
  wonForText?: string;
}

const bidsTranslation = (numberOfBids: number) => (numberOfBids === 1 ? `${numberOfBids} bid` : `${numberOfBids} bids`);
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=16780-34969&node-type=instance&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app//?path=/docs/patterns-bidsnapshot--overview)
 */
const BidSnapshot = forwardRef<HTMLDivElement, BidSnapshotProps>(
  (
    {
      bidStatus,
      auctionStatus = AuctionStatus.ready,
      bidsLabelText = bidsTranslation,
      children,
      className,
      closingText = 'Closes in',
      currency = '$',
      currentBid,
      currentBidText = 'Current bid',
      formatDurationStr = (str) => str.replace(/seconds?/, 'sec').replace(/minutes?/, 'min'),
      lang = 'en',
      lotCloseDate,
      numberOfBids = 0,
      startingBid,
      startingBidText = 'Starting bid',
      soldForText = 'Sold for',
      wonForText = 'Won for',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'BidSnapshot');

    const hasBids = currentBid !== null && numberOfBids > 0;
    const isTopBid = bidStatus === BidStatusEnum.Winning || bidStatus === BidStatusEnum.Won;
    const isReady = auctionStatus === AuctionStatus.ready;
    const isLive = auctionStatus === AuctionStatus.live;
    const isPast = auctionStatus === AuctionStatus.past;
    const hasCountdownTimer = isLive && lotCloseDate;
    const bidMessage = findChildrenOfType(children, BidMessage);
    const otherChildren = findChildrenExcludingTypes(children, [BidMessage]);

    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--live`]: isLive,
      [`${baseClassName}--has-bids`]: hasBids,
    });

    let label = currentBidText;
    if (isReady || !hasBids) label = startingBidText;
    if (isPast && hasBids) label = isTopBid ? wonForText : soldForText;

    return (
      <div {...commonProps} {...props} ref={ref} className={classes}>
        <DetailList hasSeparators className={`${baseClassName}__text`}>
          <Detail
            label={label}
            subLabel={isLive && currentBid && `(${bidsLabelText(numberOfBids)})`}
            value={`${currency}${(currentBid || startingBid)?.toLocaleString()}`}
            hasWrap={false}
          />
        </DetailList>
        {bidStatus && !isReady ? bidMessage : null}
        {otherChildren}
        {hasCountdownTimer ? (
          <Countdown
            endDateTime={lotCloseDate}
            label={closingText}
            variant={CountdownVariants.compact}
            locale={SupportedLanguages[lang]}
            formatDurationStr={formatDurationStr}
          />
        ) : null}
      </div>
    );
  },
);

BidSnapshot.displayName = 'BidSnapshot';

export default BidSnapshot;
