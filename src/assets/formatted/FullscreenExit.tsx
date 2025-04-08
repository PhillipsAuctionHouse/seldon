import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFullscreenExitProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgFullscreenExit = memo(
  forwardRef < SVGSVGElement,
  SvgFullscreenExitProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgFullscreenExit';
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
          <path stroke={color} strokeWidth={2} d="M8 3v5H3m13-5v5h5m0 8h-5v5m-8 0v-5H3" />
        </svg>
      );
    }),
);

export default SvgFullscreenExit;
