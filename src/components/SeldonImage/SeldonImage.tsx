import { ComponentProps, forwardRef, useRef, useState, useEffect, useCallback, memo } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { PhillipsLogo } from '../../assets/icons';

type AspectRatio = '16/9' | '1/1' | 'none';

export interface SeldonImageProps extends ComponentProps<'div'> {
  /**
   * The aspect ratio of the image container.
   */
  aspectRatio?: AspectRatio;
  /**
   * The resize behavior of the image (see CSS object-fit).
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * Whether the image has a blur background covering the background of the image container
   */
  hasBlurBackground?: boolean;
  /**
   * The image to display.
   */
  src: string;
  /**
   * The srcset of the image [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset]
   */
  srcSet?: string;
  /**
   * The sizes of the image [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes]
   */
  sizes?: string;
  /**
   * The alt text of the image.
   */
  alt: string;
  /**
   * The class name of the child img element.
   */
  imageClassName?: string;
  /**
   * The style of the child img element.
   */
  imageStyle?: React.CSSProperties;
  /**
   * The text to display when the image fails to load.
   */
  errorText?: string;
}

function isImageValid(src: string) {
  const promise = new Promise((resolve) => {
    const img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    img.src = src;
  });

  return promise;
}

/**
 * ## Overview
 *
 * Component for displaying an image with optional blur background, aspect ratio, and object fit.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?m=auto&node-id=4501-64590)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-seldonimage--overview)
 */
const SeldonImage = memo(
  forwardRef<HTMLDivElement, SeldonImageProps>(
    (
      {
        className,
        aspectRatio = 'none',
        objectFit = 'none',
        hasBlurBackground = false,
        imageClassName,
        imageStyle,
        src,
        alt,
        srcSet,
        sizes,
        errorText = 'Error loading image',
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SeldonImage');
      const imgRef = useRef<HTMLImageElement>(null);

      const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');

      const loadImage = useCallback(async () => {
        const isValid = await isImageValid(src);
        if (!isValid) {
          setLoadingState('error');
        } else {
          setLoadingState('loaded');
        }
      }, [src]);

      useEffect(() => {
        void loadImage();
      }, [loadImage]);

      return (
        <div
          ref={ref}
          className={classnames(baseClassName, className, {
            [`${baseClassName}--hidden`]: loadingState === 'loading' || loadingState === 'error',
            [`${baseClassName}--aspect-ratio-${aspectRatio.replace('/', '-')}`]: aspectRatio !== 'none',
          })}
          role="img"
          aria-label={alt}
          {...props}
          {...commonProps}
        >
          {hasBlurBackground && (
            <div
              className={classnames(`${baseClassName}-blur`, {
                [`${baseClassName}-blur--hidden`]: loadingState === 'loading' || loadingState === 'error',
              })}
              style={{ backgroundImage: `url(${src})` }}
            />
          )}
          {loadingState === 'error' ? (
            <div className={`${baseClassName}--error`}>
              <PhillipsLogo aria-label={errorText} />
            </div>
          ) : null}
          <img
            className={classnames(`${baseClassName}-img`, imageClassName, {
              [`${baseClassName}-img--hidden`]: loadingState !== 'loaded',
              [`${baseClassName}-img--object-fit-${objectFit}`]: objectFit !== 'none',
            })}
            style={imageStyle}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            data-testid={`${commonProps['data-testid']}-img`}
            ref={imgRef}
            onLoad={() => {
              setLoadingState('loaded');
            }}
            onError={() => {
              setLoadingState('error');
            }}
          />
        </div>
      );
    },
  ),
);

SeldonImage.displayName = 'SeldonImage';

export default SeldonImage;
