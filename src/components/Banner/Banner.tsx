import classnames from 'classnames';
import { createContext, type ComponentProps, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

import { Breakpoints, getCommonProps, px } from '../../utils';
import { SSRMediaQuery } from '../../providers/SeldonProvider/utils';
import { Text, type TextProps, TextVariants } from '../Text';
import { BannerImageSize, BannerVariants } from './types';

export { BannerImageSize, BannerVariants } from './types';

type RegisterBannerImageSize = (size: BannerImageSize | null) => void;

const BannerMediaLayoutContext = createContext<RegisterBannerImageSize | undefined>(undefined);

const base = `${px}-banner`;

export interface BannerRootProps extends ComponentProps<'article'> {
  /**
   * Visual variant for the banner root.
   * - `inline`: bordered row chrome (border-top / border-bottom).
   * - `top`: Usually rendered at the top of a page,stacked layout (image above content) through 768px; side-by-side from 961px up.
   */
  variant?: BannerVariants;
}

export type BannerMediaProps = ComponentProps<'div'> & {
  /**
   * Flex-basis for the media column from `snw-mobile` up. When `Banner.Image` sets
   * `imageSize` inside this `Media`, that wins after mount.
   */
  imageSize?: BannerImageSize;
};

export type BannerMediaFrameProps = ComponentProps<'div'>;

export type BannerImageProps = ComponentProps<'img'> & {
  /**
   * Flex-basis for the parent `Banner.Media` column from `snw-mobile` up.
   * Registers with the nearest `Banner.Media` after mount.
   */
  imageSize?: BannerImageSize;
};

/**
 * ## Overview
 *
 * Compositional banner layout: `Banner.Root` wraps `Banner.Media`, optional `Banner.Separator`,
 * and `Banner.Content` with `Banner.Eyebrow` / `Banner.Title` / `Banner.Description` / `Banner.Cta`.
 * Pass `variant={BannerVariants.inline}` on `Banner.Root` for bordered row chrome.
 * Use `Banner.Image` (or `imageSize` on `Banner.Media`) for column width from `snw-mobile` up.
 *
 * [Figma Link](https://www.figma.com/design/wRbSaO9MngnSedlDSQka3Y/Design-System--Responsive-Web?node-id=2134-5414)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-banner--overview)
 */
const BannerRoot = forwardRef<HTMLElement, BannerRootProps>(({ children, className, variant, id, ...props }, ref) => {
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
});

const BannerMedia = forwardRef<HTMLDivElement, BannerMediaProps>(
  ({ children, className, imageSize: imageSizeFromProp, ...props }, ref) => {
    const [registeredSize, setRegisteredSize] = useState<BannerImageSize | null>(null);
    const registerImageSize = useCallback<RegisterBannerImageSize>((size) => {
      setRegisteredSize(size);
    }, []);

    const resolved: BannerImageSize = registeredSize ?? imageSizeFromProp ?? BannerImageSize.Third;
    const basisMod = resolved === BannerImageSize.Half ? '1-2' : '1-3';

    return (
      <BannerMediaLayoutContext.Provider value={registerImageSize}>
        <div {...props} ref={ref} className={classnames(`${base}__media`, `${base}__media--${basisMod}`, className)}>
          {children}
        </div>
      </BannerMediaLayoutContext.Provider>
    );
  },
);

const BannerSeparator = () => (
  <SSRMediaQuery.Media greaterThanOrEqual={Breakpoints.snwMobile}>
    <div className={`${base}__column-gap`} aria-hidden />
  </SSRMediaQuery.Media>
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

const BannerMediaFrame = forwardRef<HTMLDivElement, BannerMediaFrameProps>(({ children, className, ...props }, ref) => (
  <div {...props} ref={ref} className={classnames(`${base}__media-frame`, className)}>
    {children}
  </div>
));

const BannerImage = forwardRef<HTMLImageElement, BannerImageProps>(
  ({ imageSize = BannerImageSize.Third, className, alt = '', ...props }, ref) => {
    const register = useContext(BannerMediaLayoutContext);

    useEffect(() => {
      if (!register) return;
      register(imageSize);
      return () => {
        register(null);
      };
    }, [imageSize, register]);

    return <img {...props} ref={ref} alt={alt} className={classnames(`${base}__media-img`, className)} />;
  },
);

const BannerMediaImg = forwardRef<HTMLImageElement, ComponentProps<'img'>>(({ className, alt = '', ...props }, ref) => (
  <img {...props} ref={ref} alt={alt} className={classnames(`${base}__media-img`, className)} />
));

BannerRoot.displayName = 'Banner.Root';
BannerMedia.displayName = 'Banner.Media';
BannerSeparator.displayName = 'Banner.Separator';
BannerContent.displayName = 'Banner.Content';
BannerEyebrow.displayName = 'Banner.Eyebrow';
BannerTitle.displayName = 'Banner.Title';
BannerDescription.displayName = 'Banner.Description';
BannerCta.displayName = 'Banner.Cta';
BannerMediaFrame.displayName = 'Banner.MediaFrame';
BannerImage.displayName = 'Banner.Image';
BannerMediaImg.displayName = 'Banner.MediaImg';

const Banner = Object.assign(BannerRoot, {
  Root: BannerRoot,
  Media: BannerMedia,
  Separator: BannerSeparator,
  Content: BannerContent,
  Eyebrow: BannerEyebrow,
  Title: BannerTitle,
  Description: BannerDescription,
  Cta: BannerCta,
  MediaFrame: BannerMediaFrame,
  Image: BannerImage,
  MediaImg: BannerMediaImg,
});

export default Banner;
