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
  forwardRef<SVGSVGElement, SvgFullscreenProps>((props, ref) => {
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
        <path
          fill={color}
          fillRule="evenodd"
          d="M2 2h6v2H4v4H2zm14 0h6v6h-2V4h-4zM2 16h2v4h4v2H2zm20 0v6h-6v-2h4v-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgFullscreen;
