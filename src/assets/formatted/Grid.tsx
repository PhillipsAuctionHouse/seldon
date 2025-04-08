import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgGridProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgGrid = memo(
  forwardRef<SVGSVGElement, SvgGridProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgGrid';
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
        <g clipPath="url(#Grid_svg__a)">
          <path stroke={color} strokeWidth={2} d="M3 3h7v7H3zm0 11h7v7H3zM14 3h7v7h-7zm0 11h7v7h-7z" />
        </g>
        <defs>
          <clipPath id="Grid_svg__a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgGrid;
