import classnames from 'classnames';
import { type ComponentProps, forwardRef } from 'react';

import { getCommonProps, px } from '../../utils';
import { SeldonImage } from '../SeldonImage';
import { Text, TextVariants } from '../Text';
import { CardVariants } from './types';

export interface CardRootProps extends ComponentProps<'div'> {
  /**
   * Layout variant for the card.
   */
  variant?: CardVariants;
}

export type CardProps = CardRootProps;

export type CardImageProps = Omit<ComponentProps<typeof SeldonImage>, 'className'>;
export type CardContentProps = ComponentProps<'div'>;
export type CardEyebrowProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardTitleProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardDescriptionProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardBadgeProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardMetaProps = ComponentProps<'div'>;
export type CardMetaItemProps = Omit<ComponentProps<typeof Text>, 'variant'>;

/**
 * ## Overview
 *
 * Shared compound card shell for editorial, sale, and media tiles.
 */
const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, id, variant = CardVariants.default, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'Card');
    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--${variant}`]: variant,
    });

    return <div className={classes} id={id} ref={ref} {...commonProps} />;
  },
);

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(({ ...props }, ref) => (
  <SeldonImage {...props} className={`${px}-card__image`} ref={ref} />
));

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div {...props} className={classnames(`${px}-card__details`, className)} ref={ref} />
));

const CardEyebrow = forwardRef<HTMLElement, CardEyebrowProps>(({ className, ...props }, ref) => (
  <Text
    {...props}
    className={classnames(`${px}-card__eyebrow`, className)}
    ref={ref}
    variant={TextVariants.labelSmall}
  />
));

const CardTitle = forwardRef<HTMLElement, CardTitleProps>(({ className, ...props }, ref) => (
  <Text
    {...props}
    className={classnames(`${px}-card__title`, className)}
    ref={ref}
    variant={TextVariants.headingSmall}
  />
));

const CardDescription = forwardRef<HTMLElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <Text
    {...props}
    className={classnames(`${px}-card__description`, className)}
    ref={ref}
    variant={TextVariants.bodySmall}
  />
));

const CardBadge = forwardRef<HTMLElement, CardBadgeProps>(({ className, ...props }, ref) => (
  <Text {...props} className={classnames(`${px}-card__badge`, className)} ref={ref} variant={TextVariants.badgeSmall} />
));

const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(({ className, ...props }, ref) => (
  <div {...props} className={classnames(`${px}-card__meta`, className)} ref={ref} />
));

const CardMetaItem = forwardRef<HTMLElement, CardMetaItemProps>(({ className, ...props }, ref) => (
  <Text
    {...props}
    className={classnames(`${px}-card__meta-item`, className)}
    ref={ref}
    variant={TextVariants.labelSmall}
  />
));

CardRoot.displayName = 'Card.Root';
CardImage.displayName = 'Card.Image';
CardContent.displayName = 'Card.Content';
CardEyebrow.displayName = 'Card.Eyebrow';
CardTitle.displayName = 'Card.Title';
CardDescription.displayName = 'Card.Description';
CardBadge.displayName = 'Card.Badge';
CardMeta.displayName = 'Card.Meta';
CardMetaItem.displayName = 'Card.MetaItem';

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Image: CardImage,
  Content: CardContent,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Badge: CardBadge,
  Meta: CardMeta,
  MetaItem: CardMetaItem,
});

export default Card;
