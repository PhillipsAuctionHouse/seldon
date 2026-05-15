import classnames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';

/**
 * Props for the ImageBanner component.
 */
export interface ImageBannerProps extends ComponentProps<'section'> {
  /** Optional background image URL. When omitted, falls back to a gradient. */
  imageSrc?: string;
  /** Headline rendered as the wordmark / display title (e.g. "DROPSHOP"). */
  wordmark?: string;
  /** Tagline rendered below the wordmark. Use `\n` for line breaks. */
  tagline?: string;
  /** Pill-button label. */
  buttonLabel?: string;
  /** Destination URL — when set, the entire banner is a clickable link. */
  href?: string;
  /** Visual theme. `gradient-gray` is the Dropshop look. */
  theme?: 'gradient-gray' | 'image';
}

/**
 * ## Overview
 *
 * Full-bleed image banner with overlay wordmark, tagline, and pill CTA.
 * Used for the homepage Dropshop banner and other landing-page promos.
 *
 * [Figma Link](https://www.figma.com/design/hOoH4zNM3acxBH2Ey4Dqhb/01_Homepage?node-id=2527-11534)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-imagebanner--overview)
 */
const ImageBanner = forwardRef<HTMLElement, ImageBannerProps>(
  ({ className, imageSrc, wordmark, tagline, buttonLabel, href, theme = 'gradient-gray', ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'ImageBanner');
    const classes = classnames(baseClassName, className, {
      [`${baseClassName}--${theme}`]: theme,
    });
    const bgStyle = imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined;

    const content = (
      <div className={`${baseClassName}__content`}>
        {wordmark ? <span className={`${baseClassName}__wordmark`}>{wordmark}</span> : null}
        {tagline ? (
          <p className={`${baseClassName}__tagline`}>
            {tagline.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < tagline.split('\n').length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        ) : null}
        {buttonLabel ? <span className={`${baseClassName}__button`}>{buttonLabel}</span> : null}
      </div>
    );

    return (
      <section ref={ref} className={classes} {...commonProps}>
        {href ? (
          <a href={href} className={`${baseClassName}__link`} style={bgStyle}>
            {content}
          </a>
        ) : (
          <div className={`${baseClassName}__inner`} style={bgStyle}>
            {content}
          </div>
        )}
      </section>
    );
  },
);

ImageBanner.displayName = 'ImageBanner';

export default ImageBanner;
