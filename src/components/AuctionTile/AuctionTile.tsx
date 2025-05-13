import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';

export type AuctionTileProps = ComponentProps<'div'> & {
  auctionImageHref: string;
  auctionType: string;
  auctionTitle: string;
  auctionDate: string;
  auctionLocation: string;
};
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/RW-Design-System?node-id=22259-4172&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-auctiontile--overview)
 */
const AuctionTile = forwardRef<HTMLDivElement, AuctionTileProps>(
  ({ className, auctionImageHref, auctionType, auctionTitle, auctionDate, auctionLocation, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AuctionTile');
    const componentProps = { ...commonProps, ...props };

    return (
      <div {...componentProps} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__image`}>
          <img src={auctionImageHref} alt="Auction Image" />
        </div>
        <div className={`${baseClassName}__details`}>
          <Text variant={TextVariants.badge}>{auctionType}</Text>
          <Text variant={TextVariants.title4}>{auctionTitle}</Text>
          <div className={`${baseClassName}__date_location`}>
            <Text variant={TextVariants.string2}>{auctionDate}</Text>
            <span className={`${baseClassName}__separator`}>•</span>
            <Text variant={TextVariants.string2}>{auctionLocation}</Text>
          </div>
        </div>
      </div>
    );
  },
);

AuctionTile.displayName = 'AuctionTile';

export default AuctionTile;
