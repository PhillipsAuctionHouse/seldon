import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFullscreenProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgFullscreen = memo(
  forwardRef < SVGSVGElement,
  SvgFullscreenProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgFullscreen';
      const titleId = propsTitleId || kebabCase(title);

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height={height}
          width={width}
          role="img"
          ref={ref}
          aria-labelledby={titleId}
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          <path stroke={color} strokeWidth={2} d="M3 8V3h5m13 5V3h-5m0 18h5v-5M3 16v5h5" />
        </svg>
      );
    }),
);

export default SvgFullscreen;
