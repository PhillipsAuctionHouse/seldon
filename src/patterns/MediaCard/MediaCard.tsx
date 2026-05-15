import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

/**
 * Props for the MediaCard component.
 */
export interface MediaCardProps extends Omit<ComponentProps<'a'>, 'title'> {
  /** Thumbnail image URL. */
  imageSrc?: string;
  /** Alt text for the thumbnail. */
  imageAlt?: string;
  /** Eyebrow text shown above the title (e.g. department label). */
  eyebrow?: string;
  /** Card title (rendered uppercase). */
  title?: string;
  /** Optional supporting text shown below the title (e.g. publish date). */
  meta?: string;
  /** Destination URL — the entire card is wrapped in this anchor. */
  href: string;
  /** When true, renders a centered play-icon overlay on the thumbnail. */
  showPlayOverlay?: boolean;
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 64 64">
      <path d="M22 16L48 32L22 48V16Z" fill="rgba(255, 255, 255, 0.95)" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="0.5" />
    </svg>
  );
}

/**
 * ## Overview
 *
 * Editorial media card — 16:9 thumbnail with optional play overlay,
 * eyebrow, uppercase title, and optional supporting meta text. Used
 * for the homepage video rail and editorial article cards.
 *
 * [Figma Link](https://www.figma.com/design/hOoH4zNM3acxBH2Ey4Dqhb/01_Homepage?node-id=2527-11525)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-mediacard--overview)
 */
const MediaCard = forwardRef<HTMLAnchorElement, MediaCardProps>(
  ({ className, imageSrc, imageAlt, eyebrow, title, meta, href, showPlayOverlay = false, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'MediaCard');
    const classes = classnames(baseClassName, className);

    return (
      <a ref={ref} href={href} className={classes} {...commonProps}>
        <span className={`${baseClassName}__frame`}>
          {imageSrc ? <img src={imageSrc} alt={imageAlt ?? title ?? ''} className={`${baseClassName}__image`} /> : null}
          {showPlayOverlay ? (
            <span className={`${baseClassName}__play`}>
              <PlayIcon />
            </span>
          ) : null}
        </span>
        <div className={`${baseClassName}__content`}>
          {eyebrow ? <p className={`${baseClassName}__eyebrow`}>{eyebrow}</p> : null}
          {title ? <p className={`${baseClassName}__title`}>{title}</p> : null}
          {meta ? <p className={`${baseClassName}__meta`}>{meta}</p> : null}
        </div>
      </a>
    );
  },
);

MediaCard.displayName = 'MediaCard';

export default MediaCard;
