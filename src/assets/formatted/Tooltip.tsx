import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgTooltipProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgTooltip = memo(
  forwardRef < SVGSVGElement,
  SvgTooltipProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgTooltip';
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
          <path fill={color} d="M11 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0M13 11v6h-2v-6z" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgTooltip;
