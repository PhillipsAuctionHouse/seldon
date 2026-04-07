import classnames from 'classnames';
import { type ComponentProps, type ElementType, forwardRef } from 'react';

import { getCommonProps, px } from '../../utils';
import { Link, LinkVariants } from '../Link';
import { SeldonImage } from '../SeldonImage';
import { Video } from '../Video';
import { Text, TextVariants } from '../Text';
import { CardVariants } from './types';

export interface CardRootProps extends ComponentProps<'div'> {
  /**
   * Root element for the card shell. Defaults to `div`.
   */
  element?: ElementType;
  /**
   * Layout variant for the card.
   */
  variant?: CardVariants;
}

export type CardProps = CardRootProps;

export type CardImageProps = Omit<ComponentProps<typeof SeldonImage>, 'className'>;
export type CardVideoProps = ComponentProps<typeof Video>;
export type CardContentProps = ComponentProps<'div'>;
export type CardEyebrowProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardTitleProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardDescriptionProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardBadgeProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardMetaProps = ComponentProps<'div'>;
export type CardMetaItemProps = Omit<ComponentProps<typeof Text>, 'variant'>;
export type CardCtaProps = ComponentProps<typeof Link>;

/**
 * ## Overview
 *
 * Shared compound card shell for editorial, sale, and media tiles.
 *
 * [Figma Link](https://www.figma.com/design/raduA60GRdDPmI7D4mWr6a/07_Editorial--NEW-?node-id=4204-8920&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-card--overview)
 */
const CardRoot = forwardRef<HTMLElement, CardRootProps>(
  ({ element: Element = 'div', className, id, variant = CardVariants.default, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'Card');
    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--${variant}`]: variant,
    });

    return <Element className={classes} id={id} ref={ref} {...commonProps} {...props} />;
  },
);

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(({ aspectRatio, ...props }, ref) => (
  <SeldonImage {...props} aspectRatio={aspectRatio} className={`${px}-card__image`} ref={ref} />
));

const CardVideo = forwardRef<HTMLDivElement, CardVideoProps>(({ aspectRatio = 91 / 51, className, ...props }, ref) => (
  <Video {...props} ref={ref} aspectRatio={aspectRatio} className={classnames(`${px}-card__video`, className)} />
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

const CardCta = forwardRef<HTMLAnchorElement, CardCtaProps>(
  ({ className, variant = LinkVariants.linkSmall, ...props }, ref) => (
    <Link {...props} ref={ref} className={classnames(`${px}-card__cta`, className)} variant={variant} />
  ),
);

CardRoot.displayName = 'Card.Root';
CardImage.displayName = 'Card.Image';
CardVideo.displayName = 'Card.Video';
CardContent.displayName = 'Card.Content';
CardEyebrow.displayName = 'Card.Eyebrow';
CardTitle.displayName = 'Card.Title';
CardDescription.displayName = 'Card.Description';
CardBadge.displayName = 'Card.Badge';
CardMeta.displayName = 'Card.Meta';
CardMetaItem.displayName = 'Card.MetaItem';
CardCta.displayName = 'Card.Cta';

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Image: CardImage,
  Video: CardVideo,
  Content: CardContent,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Badge: CardBadge,
  Meta: CardMeta,
  MetaItem: CardMetaItem,
  Cta: CardCta,
});

export default Card;
