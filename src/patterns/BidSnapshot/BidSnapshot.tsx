import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';

import { findChildrenExcludingTypes, findChildrenOfType, getCommonProps } from '../../utils';
import { DetailList } from '../DetailList/index';
import { Detail } from '../../components/Detail/index';
import { LotStatus, SupportedLanguages } from '../../types/commonTypes';
import { Countdown } from '../../components/Countdown/index';
import { BidStatusEnum } from './types';
import BidMessage from './BidMessage';
import { differenceInMinutes, isAfter } from 'date-fns';

export interface BidSnapshotProps extends ComponentProps<'div'> {
  /**
   * The user's current bid state, winning or losing, etc.
   */
  bidStatus?: BidStatusEnum;
  /**
   * State of the object
   */
  lotStatus?: LotStatus;
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
   * When lots start to close for this sale
   */
  saleCloseDate?: Date | null;
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
   * Sold For amount
   * */
  soldPrice?: number;
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
      lotStatus = LotStatus.ready,
      bidStatus,
      bidsLabelText = bidsTranslation,
      children,
      className,
      closingText = 'Closes in',
      currency = '$',
      currentBid,
      currentBidText = 'Current bid',
      formatDurationStr = (str) => str.replace(/seconds?/, 'sec').replace(/minutes?/, 'min'),
      lang = 'en',
      saleCloseDate,
      lotCloseDate,
      numberOfBids = 0,
      startingBid,
      startingBidText = 'Starting bid',
      soldPrice,
      soldForText = 'Sold for',
      wonForText = 'Won for',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'BidSnapshot');

    const hasBids = currentBid !== null && numberOfBids > 0;
    const isReady = lotStatus === LotStatus.ready;
    const isLive = lotStatus === LotStatus.live;
    const isPast = lotStatus === LotStatus.past;
    const now = new Date();
    const hasCountdownTimer =
      isLive &&
      lotCloseDate &&
      isAfter(lotCloseDate, now) &&
      saleCloseDate &&
      (differenceInMinutes(saleCloseDate, now) < 60 || isAfter(now, saleCloseDate)); // only show within the 60 minutes of when the lots start closing or if we're past the close date

    const bidMessage = findChildrenOfType(children, BidMessage);
    const otherChildren = findChildrenExcludingTypes(children, [BidMessage]);

    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--live`]: isLive,
      [`${baseClassName}--has-bids`]: hasBids || isPast,
    });

    return (
      <div {...commonProps} {...props} ref={ref} className={classes}>
        <DetailList hasSeparators className={`${baseClassName}__text`}>
          {isPast ? (
            <Detail
              label={bidStatus === BidStatusEnum.Won ? wonForText : soldForText} // if the user has won show wonForText else show soldForText
              value={soldPrice ? `${currency}${soldPrice?.toLocaleString()}` : ''}
              hasWrap={false}
            />
          ) : null}
          {isLive && hasBids ? (
            <Detail
              label={currentBidText}
              subLabel={`(${bidsLabelText(numberOfBids)})`}
              value={`${currency}${currentBid?.toLocaleString()}`}
              hasWrap={false}
            />
          ) : null}
          {isReady || (isLive && !hasBids) ? (
            <Detail label={startingBidText} value={`${currency}${startingBid?.toLocaleString()}`} hasWrap={false} />
          ) : null}
        </DetailList>
        {
          bidStatus && !isReady ? bidMessage : null // only show bidMessage if the user has bid
        }
        {otherChildren}
        {hasCountdownTimer ? (
          <Countdown
            endDateTime={lotCloseDate}
            label={closingText}
            locale={SupportedLanguages[lang]}
            formatDurationStr={formatDurationStr}
            showBottomBorder={false}
          />
        ) : null}
      </div>
    );
  },
);

BidSnapshot.displayName = 'BidSnapshot';

export default BidSnapshot;
