import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { DetailList } from '../DetailList/index';
import { Detail } from '../../components/Detail/index';
import { AuctionStatus, SupportedLanguages } from '../../types/commonTypes';
import { Countdown } from '../../components/Countdown/index';
import { CountdownVariants } from '../../components/Countdown/types';

export interface BidSnapshotProps extends ComponentProps<'div'> {
  /**
   * Active bid of current user. -  '$1,000'
   */
  activeBid?: string;
  /**
   * State of the object
   */
  auctionStatus?: AuctionStatus;
  /**
   * An array of bids for the Object. Should include starting bid as first element and current bid as last element
   */
  bids?: string[];
  /**
   * Bids label text, a fucntion for label of bids amoutn (2 bids, 3 bids, etc) where the number is the length of the bids array.
   */
  bidsLabelText?: (numberOfBids: number) => string;
  /**
   * Current bid text, a string for label of current bid detail
   */
  currentBidText?: string;
  /**
   * Closing label text, for countdown timer
   */
  closingText?: string;
  /**
   * Language selection for the application
   */
  lang?: keyof typeof SupportedLanguages;
  /**
   * End time for this object
   */
  lotCloseDate?: Date;
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
      auctionStatus = AuctionStatus.ready,
      bids = [],
      bidsLabelText = bidsTranslation,
      children,
      className,
      closingText = 'Closes in',
      currentBidText = 'Current bid',
      lang = 'en',
      lotCloseDate,
      startingBidText = 'Starting bid',
      soldForText = 'Sold for',
      wonForText = 'Won for',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'BidSnapshot');
    const currentDate = new Date();
    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {
          // auctionStatus is not past (auction is active or upcoming),
          !(auctionStatus === AuctionStatus.past) ? (
            // if auction has not started
            auctionStatus === AuctionStatus.ready ? (
              // show starting bid
              <DetailList hasSeparators className={`${baseClassName}__text`}>
                <Detail label={startingBidText} value={bids[0]} hasWrap={false} />
              </DetailList>
            ) : (
              // otherwise, show current bid
              <DetailList hasSeparators className={`${baseClassName}__text`}>
                <Detail
                  label={currentBidText}
                  subLabel={bids.length > 0 && `(${bidsLabelText(bids.length)})`}
                  value={bids[bids.length - 1]}
                  hasWrap={false}
                />
              </DetailList>
            )
          ) : // if auctionStatus is past,
          // if activeBid was the last bid, show won for activeBid
          activeBid === bids[bids.length - 1] ? (
            <DetailList hasSeparators className={`${baseClassName}__text`}>
              <Detail label={wonForText} value={bids[bids.length - 1]} hasWrap={false} />
            </DetailList>
          ) : (
            // if active bid was not last bid show Sold for
            <DetailList hasSeparators className={`${baseClassName}__text`}>
              <Detail label={soldForText} value={bids[bids.length - 1]} hasWrap={false} />
            </DetailList>
          )
        }

        {activeBid && auctionStatus !== AuctionStatus.ready ? children : null}

        {
          // Countdown timer
          lotCloseDate && lotCloseDate > currentDate ? (
            <Countdown
              endDateTime={lotCloseDate}
              label={closingText}
              variant={CountdownVariants.compact}
              locale={SupportedLanguages[lang]}
              formatDurationStr={(str) => str.replace(/seconds?/, 'sec').replace(/minutes?/, 'min')}
            />
          ) : null
        }
      </div>
    );
  },
);

BidSnapshot.displayName = 'BidSnapshot';

export default BidSnapshot;
