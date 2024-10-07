import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

type AspectRatio = '16/9' | '1/1' | 'none';

export interface SeldonImageProps extends ComponentProps<'div'> {
  aspectRatio?: AspectRatio;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  useBlurBackground?: boolean;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  src: string;
  alt?: string;
}

/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const SeldonImage = forwardRef<HTMLDivElement, SeldonImageProps>(
  (
    {
      className,
      aspectRatio = 'none',
      objectFit = 'none',
      useBlurBackground = false,
      imageClassName,
      imageStyle,
      src,
      alt,
      ...props
    },
    ref,
  ) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'SeldonImage');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const blurRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => {
      if (containerRef.current) {
        return containerRef.current;
      }
      return document.createElement('div');
    });

    const containerAspectRatioClass =
      aspectRatio !== 'none' ? `${baseClassName}--aspect-ratio-${aspectRatio.replace('/', '-')}` : '';
    const containerHiddenClass = imgRef.current?.complete ? '' : `${baseClassName}--hidden`;
    const imgObjectFitClass = objectFit !== 'none' ? `${baseClassName}-img--object-fit-${objectFit}` : '';
    const imgHiddenClass = imgRef.current?.complete ? '' : `${baseClassName}-img--hidden`;
    const blurHiddenClass = imgRef.current?.complete ? '' : `${baseClassName}-blur--hidden`;

    return (
      <div
        key={src}
        ref={containerRef}
        className={classnames(baseClassName, containerAspectRatioClass, containerHiddenClass, className)}
        {...props}
        {...commonProps}
      >
        {useBlurBackground && (
          <div
            ref={blurRef}
            className={classnames(`${baseClassName}-blur`, blurHiddenClass)}
            style={{ backgroundImage: `url(${src})` }}
          />
        )}
        <img
          className={classnames(`${baseClassName}-img`, imgObjectFitClass, imgHiddenClass, imageClassName)}
          style={imageStyle}
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => {
            imgRef.current?.classList.remove(imgHiddenClass);
            containerRef.current?.classList.remove(containerHiddenClass);
            blurRef.current?.classList.remove(blurHiddenClass);
          }}
        />
      </div>
    );
  },
);

SeldonImage.displayName = 'SeldonImage';

export default SeldonImage;
