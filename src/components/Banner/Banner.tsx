import classnames from 'classnames';
import { type ComponentProps, forwardRef } from 'react';

import { getCommonProps, px } from '../../utils';
import { Text, type TextProps, TextVariants } from '../Text';
import { BannerMediaSize, BannerVariants } from './types';

export { BannerMediaSize, BannerVariants } from './types';

const base = `${px}-banner`;

export interface BannerRootProps extends ComponentProps<'article'> {
  /**
   * Visual variant for the banner root.
   * - `inline`: bordered row chrome (border-top / border-bottom).
   * - `top`: Usually rendered at the top of a page, stacked layout (image above content) below 961px; side-by-side from 961px up.
   */
  variant?: BannerVariants;
}

export type BannerMediaProps = ComponentProps<'div'> & {
  /** Flex-basis for the media column from `snw-mobile` up. */
  size?: BannerMediaSize;
};

/**
 * ## Overview
 *
 * Compositional banner layout: `Banner.Root` wraps `Banner.Media`
 * and `Banner.Content` with `Banner.Eyebrow` / `Banner.Title` / `Banner.Description` / `Banner.Cta`.
 * Pass `variant={BannerVariants.inline}` on `Banner.Root` for bordered row chrome.
 * Use `size` on `Banner.Media` to control column width from `snw-mobile` up.
 *
 * [Figma Link](https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Responsive-Web?node-id=2134-5414)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-banner--overview)
 */
const BannerRoot = forwardRef<HTMLElement, BannerRootProps>(
  ({ children, className, variant = BannerVariants.top, id, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps({ id, ...props }, 'Banner');
    return (
      <article
        {...commonProps}
        {...props}
        id={id}
        ref={ref}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${variant}`]: variant,
        })}
      >
        <div className={`${base}__inner`}>{children}</div>
      </article>
    );
  },
);

const BannerMedia = forwardRef<HTMLDivElement, BannerMediaProps>(
  ({ children, className, size = BannerMediaSize.third, ...props }, ref) => {
    const basisMod = size === BannerMediaSize.half ? '1-2' : '1-3';

    return (
      <div {...props} ref={ref} className={classnames(`${base}__media`, `${base}__media--${basisMod}`, className)}>
        {children}
      </div>
    );
  },
);

const BannerContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(({ children, className, ...props }, ref) => (
  <div {...props} ref={ref} className={classnames(`${base}__body`, className)}>
    {children}
  </div>
));

const BannerEyebrow = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = TextVariants.labelSmall, ...props }, ref) => (
    <Text {...props} ref={ref} variant={variant} className={classnames(`${base}__eyebrow`, className)} />
  ),
);

const BannerTitle = forwardRef<HTMLElement, TextProps>(
  ({ className, element = 'h3', variant = TextVariants.headingMedium, ...props }, ref) => (
    <Text
      {...props}
      ref={ref}
      variant={variant}
      element={element}
      className={classnames(`${base}__title`, className)}
    />
  ),
);

const BannerDescription = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = TextVariants.bodyMedium, ...props }, ref) => (
    <Text {...props} ref={ref} variant={variant} className={classnames(`${base}__description`, className)} />
  ),
);

const BannerCta = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = TextVariants.linkMedium, ...props }, ref) => (
    <Text {...props} ref={ref} variant={variant} className={classnames(`${base}__cta`, className)} />
  ),
);

const BannerImage = forwardRef<HTMLImageElement, ComponentProps<'img'>>(({ className, alt = '', ...props }, ref) => (
  <img {...props} ref={ref} alt={alt} className={classnames(`${base}__media-img`, className)} />
));

BannerRoot.displayName = 'Banner.Root';
BannerMedia.displayName = 'Banner.Media';
BannerContent.displayName = 'Banner.Content';
BannerEyebrow.displayName = 'Banner.Eyebrow';
BannerTitle.displayName = 'Banner.Title';
BannerDescription.displayName = 'Banner.Description';
BannerCta.displayName = 'Banner.Cta';
BannerImage.displayName = 'Banner.Image';

const Banner = Object.assign(BannerRoot, {
  Root: BannerRoot,
  Media: BannerMedia,
  Content: BannerContent,
  Eyebrow: BannerEyebrow,
  Title: BannerTitle,
  Description: BannerDescription,
  Cta: BannerCta,
  Image: BannerImage,
});

export default Banner;
