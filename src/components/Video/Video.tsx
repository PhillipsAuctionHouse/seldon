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
   * The url of the video source
   */
  videoSource: string;
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
const Video = ({ aspectRatio = 16 / 9, className, videoSource, ...props }: VideoProps) => {
  const { className: baseClassName, 'data-testid': dataTestId, ...commonProps } = getCommonProps(props, 'Video');

  const componentProps = {
    className: classnames(baseClassName, className),
    'data-testid': dataTestId,
    style: { '--aspect-ratio': aspectRatio } as React.CSSProperties,
    ...commonProps,
    ...props,
  };

  return (
    <div {...componentProps}>
      <iframe
        data-testid={`${dataTestId}-iframe`}
        className={`${baseClassName}__iframe`}
        src={videoSource}
        allowFullScreen
        allow="encrypted-media"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Video;
