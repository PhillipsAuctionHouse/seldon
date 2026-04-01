import React, { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export interface VideoProps extends ComponentProps<'div'> {
  /**
   * Aspect ratio of the video
   */
  aspectRatio?: number;
  /**
   * The url of the video source
   */
  videoSource: string;
  /**
   * The ref to the iframe
   */
  iframeRef?: React.Ref<HTMLIFrameElement>;
  /**
   * The class name for the iframe
   */
  iframeClassName?: string;
}
/**
 * ## Overview
 *
 * A component for rendering a video iframe with a specified aspect ratio and height.
 *
 * [Figma Link](https://www.figma.com/design/Hp2FyltbOmRxTuw9kSwBAd/EPIC-About-Us?node-id=1103-5014)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-video--overview)
 */
const Video = forwardRef<HTMLDivElement, VideoProps>(
  ({ aspectRatio, className, videoSource, iframeRef, iframeClassName, ...props }, ref) => {
    const { className: baseClassName, 'data-testid': dataTestId, ...commonProps } = getCommonProps(props, 'Video');

    const componentProps = {
      className: classnames(baseClassName, className),
      'data-testid': dataTestId,
      style: { '--aspect-ratio': aspectRatio } as React.CSSProperties,
      ...commonProps,
      ...props,
    };

    return (
      <div {...componentProps} ref={ref}>
        <iframe
          ref={iframeRef}
          data-testid={`${dataTestId}-iframe`}
          className={classnames(`${baseClassName}__iframe`, iframeClassName)}
          src={videoSource}
          allowFullScreen
          allow="encrypted-media"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  },
);

Video.displayName = 'Video';

export default Video;
