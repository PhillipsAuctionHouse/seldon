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
   * The loading attribute of the image. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading]
   */
  loading?: ComponentProps<'img'>['loading'];
  /**
   * The fetch priority of the image. [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-fetchpriority]
   */
  fetchPriority?: ComponentProps<'img'>['fetchPriority'];
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

function isImageValid({
  img,
  src,
  srcSet,
  sizes,
}: {
  img: HTMLImageElement | null;
  src: string;
  srcSet?: string;
  sizes?: string;
}) {
  const promise = new Promise((resolve) => {
    let imgElement = img;
    if (!imgElement) {
      imgElement = document.createElement('img');
    }
    imgElement.onerror = () => resolve(false);
    imgElement.onload = () => resolve(true);
    if (srcSet) {
      imgElement.srcset = srcSet;
    }
    if (sizes) {
      imgElement.sizes = sizes;
    }
    imgElement.src = src;
    if (imgElement.complete) {
      resolve(true);
    }
  });

  return promise;
}

const isServer = typeof window === 'undefined';

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
        loading,
        fetchPriority,
        errorText = 'Error loading image',
        ...props
      },
      ref,
    ) => {
      const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SeldonImage');
      const imgRef = useRef<HTMLImageElement>(null);

      const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>(() => {
        if (isServer) {
          return 'loading';
        }
        const element = document.getElementById(src);

        if (element instanceof HTMLImageElement && !element.classList.contains(`${baseClassName}-img--hidden`)) {
          return 'loaded';
        }

        const img = document.createElement('img');
        if (srcSet) {
          img.srcset = srcSet;
        }
        if (sizes) {
          img.sizes = sizes;
        }
        img.src = src;
        if (img.complete) {
          return 'loaded';
        }

        return 'loading';
      });

      const loadImage = useCallback(async () => {
        const isValid = await isImageValid({
          img: imgRef.current,
          src,
          srcSet,
          sizes,
        });
        if (!isValid) {
          setLoadingState('error');
        } else {
          setLoadingState('loaded');
        }
      }, [src, srcSet, sizes]);

      useEffect(() => {
        void loadImage();
      }, [loadImage]);

      return (
        <div
          ref={ref}
          className={classnames(baseClassName, className, {
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
              [`${baseClassName}-img--hidden`]: loadingState === 'error',
              [`${baseClassName}-img--object-fit-${objectFit}`]: objectFit !== 'none',
            })}
            id={src}
            style={imageStyle}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            data-testid={`${commonProps['data-testid']}-img`}
            ref={imgRef}
            loading={loading}
            // @ts-expect-error - React throws error when this is passed as fetchPriority, so we need to disable the rule
            // let it be known that this is a valid attribute [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority]
            fetchpriority={fetchPriority} // eslint-disable-line react/no-unknown-property
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
