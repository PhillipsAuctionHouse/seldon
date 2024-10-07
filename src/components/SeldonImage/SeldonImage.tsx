import { ComponentProps, forwardRef, useRef, useState, useEffect } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

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
const SeldonImage = forwardRef<HTMLDivElement, SeldonImageProps>(
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
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SeldonImage');
    const imgRef = useRef<HTMLImageElement>(null);

    const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');

    useEffect(() => {
      if (imgRef.current?.complete) {
        setLoadingState('loaded');
      }
    }, []);

    return (
      <div
        ref={ref}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--hidden`]: loadingState === 'loading',
          [`${baseClassName}--aspect-ratio-${aspectRatio.replace('/', '-')}`]: aspectRatio !== 'none',
        })}
        {...props}
        {...commonProps}
      >
        {hasBlurBackground && (
          <div
            className={classnames(`${baseClassName}-blur`, {
              [`${baseClassName}-blur--hidden`]: loadingState === 'loading',
            })}
            style={{ backgroundImage: `url(${src})` }}
          />
        )}
        <img
          className={classnames(`${baseClassName}-img`, imageClassName, {
            [`${baseClassName}-img--hidden`]: loadingState === 'loading',
            [`${baseClassName}-img--object-fit-${objectFit}`]: objectFit !== 'none',
          })}
          style={imageStyle}
          src={src}
          alt={alt}
          role="img"
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
);

SeldonImage.displayName = 'SeldonImage';

export default SeldonImage;
