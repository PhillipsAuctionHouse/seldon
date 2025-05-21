import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Text, TextVariants } from '../Text';

export type AuctionTileProps = ComponentProps<'div'> & {
  imageSrc: string;
  imageAlt?: string;
  type: string;
  title: string;
  date: string;
  location: string;
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
  ({ className, imageSrc, imageAlt = 'Auction Image', type, title, date, location, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AuctionTile');
    const componentProps = { ...commonProps, ...props };

    return (
      <div {...componentProps} className={classnames(baseClassName, className)} ref={ref}>
        <div className={`${baseClassName}__image`}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className={`${baseClassName}__details`}>
          <Text variant={TextVariants.badge}>{type}</Text>
          <Text variant={TextVariants.title4}>{title}</Text>
          <div className={`${baseClassName}__date_location`}>
            <Text variant={TextVariants.string2}>{date}</Text>
            <span className={`${baseClassName}__separator`}>•</span>
            <Text variant={TextVariants.string2}>{location}</Text>
          </div>
        </div>
      </div>
    );
  },
);

AuctionTile.displayName = 'AuctionTile';

export default AuctionTile;
