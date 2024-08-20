import React, { ComponentProps } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';

export interface VideoProps extends ComponentProps<'div'> {
  /**
   * Aspect ratio of the video
   * Defaults to 1.777 (16/9)
   */
  aspectRatio?: number;
  /**
   * Height of the video (pixels)
   * Defaults to 800
   */
  height?: number;
  /**
   * The url of the video source
   */
  videoSource: string;
}
/**
 * ## Overview
 *
 * A component for rendering a video iframe with a specified aspect ratio and height.
 *
 * TODO: Add Figma link. Is there a design for this component?
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-video--overview)
 */
const Video = ({
  className,
  aspectRatio = 16 / 9,
  height = 800,
  videoSource,
  ...props
}: React.PropsWithChildren<VideoProps>) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Video');

  const componentProps = {
    className: classnames(baseClassName, className),
    style: { aspectRatio, height },
    ...commonProps,
    ...props,
  };

  return (
    <div className={classnames(`${baseClassName}__container`)}>
      <div {...componentProps}>
        <iframe
          data-testid={`${commonProps[`data-testid`]}-iframe`}
          className={classnames(`${baseClassName}__iframe`)}
          src={videoSource}
          allowFullScreen
          allow="encrypted-media"
        />
      </div>
    </div>
  );
};

export default Video;
