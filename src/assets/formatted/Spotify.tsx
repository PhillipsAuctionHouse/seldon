import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgSpotifyProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgSpotify = memo(
  forwardRef((props: SvgSpotifyProps, ref: Ref<SVGSVGElement>) => {
    const { height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgSpotify';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 30 30"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#1ED760"
          d="M15 0C6.716 0 0 6.716 0 15c0 8.285 6.716 15 15 15 8.285 0 15-6.715 15-15S23.285 0 15 0m6.879 21.634a.934.934 0 0 1-1.286.31c-3.522-2.15-7.956-2.638-13.177-1.445A.935.935 0 0 1 7 18.675c5.714-1.306 10.615-.743 14.569 1.673.44.27.58.846.31 1.286m1.836-4.085a1.17 1.17 0 0 1-1.609.387c-4.032-2.48-10.178-3.197-14.947-1.75a1.17 1.17 0 0 1-1.46-.779 1.17 1.17 0 0 1 .78-1.458c5.448-1.653 12.22-.852 16.85 1.993.55.338.724 1.058.386 1.607m.157-4.252c-4.834-2.872-12.81-3.136-17.426-1.735a1.403 1.403 0 1 1-.814-2.685c5.298-1.609 14.106-1.298 19.672 2.006a1.402 1.402 0 1 1-1.431 2.413"
        />
      </svg>
    );
  }),
);

export default SvgSpotify;
