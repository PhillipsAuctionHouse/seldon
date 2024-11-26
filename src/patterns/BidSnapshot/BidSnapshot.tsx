import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { DetailList } from '../DetailList/index';
import { Detail } from '../../components/Detail/index';
import { LotStatus, SupportedLanguages } from '../../types/commonTypes';
import { Countdown } from '../../components/Countdown/index';
import { CountdownVariants } from '../../components/Countdown/types';

export interface BidSnapshotProps extends ComponentProps<'div'> {
  /**
   * Active bid of current signed in user. -  '1000'
   */
  activeBid?: number | null;
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
      activeBid,
      lotStatus = LotStatus.ready,
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
    const isTopBid = activeBid === currentBid;
    const isReady = lotStatus === LotStatus.ready;
    const isLive = lotStatus === LotStatus.live;
    const isPast = lotStatus === LotStatus.past;
    const hasCountdownTimer = isLive && lotCloseDate;

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
        {activeBid && !isReady ? children : null}
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
