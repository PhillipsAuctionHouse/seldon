import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

/**
 * Props for the AuctionCard component.
 */
export interface AuctionCardProps extends ComponentProps<'div'> {
  /** Eyebrow shown above the title (e.g. "Live Auction"). */
  saleTypeLabel?: string;
  /** Main title (rendered uppercase, Distinct Display). */
  title?: string;
  /** Sale location (e.g. "New York"). */
  location?: string;
  /** Free-form date string (e.g. "Begins 22 April"). */
  date?: string;
  /** Free-form time string (e.g. "12pm ET 2026"). */
  time?: string;
  /** Primary CTA — filled black pill button. */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA — outlined pill button. */
  secondaryCta?: { label: string; href: string };
  /** Background variant. Defaults to `translucent` to overlay over a hero image. */
  background?: 'translucent' | 'opaque';
}

/**
 * ## Overview
 *
 * Auction-card overlay used on top of the homepage Hero. Renders a
 * translucent white card with sale type label, title, location,
 * date/time, and up to two CTAs (filled + outlined pill buttons).
 *
 * [Figma Link](https://www.figma.com/design/hOoH4zNM3acxBH2Ey4Dqhb/01_Homepage?node-id=2527-11492)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-auctioncard--overview)
 */
const AuctionCard = forwardRef<HTMLDivElement, AuctionCardProps>(
  (
    {
      className,
      saleTypeLabel,
      title,
      location,
      date,
      time,
      primaryCta,
      secondaryCta,
      background = 'translucent',
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'AuctionCard');
    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--${background}`]: background,
    });
    const dateTime = [date, time].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} aria-label="Upcoming auction" {...commonProps}>
        <div className={`${baseClassName}__inner`}>
          {saleTypeLabel ? <span className={`${baseClassName}__label`}>{saleTypeLabel}</span> : null}
          {title ? <h2 className={`${baseClassName}__title`}>{title}</h2> : null}
          {location ? <span className={`${baseClassName}__line`}>{location}</span> : null}
          {dateTime ? <span className={`${baseClassName}__line`}>{dateTime}</span> : null}
          {primaryCta || secondaryCta ? (
            <div className={`${baseClassName}__buttons`}>
              {primaryCta ? (
                <a href={primaryCta.href} className={`${baseClassName}__cta ${baseClassName}__cta--primary`}>
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a href={secondaryCta.href} className={`${baseClassName}__cta ${baseClassName}__cta--secondary`}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

AuctionCard.displayName = 'AuctionCard';

export default AuctionCard;
