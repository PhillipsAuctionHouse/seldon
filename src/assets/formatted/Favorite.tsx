import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFavoriteProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgFavorite = memo(
  forwardRef((props: SvgFavoriteProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgFavorite';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#favorite_svg__a)">
          <path
            fill={color}
            stroke={color}
            strokeWidth={2}
            d="m16.76 6.45.006-.007.037-.04a10 10 0 0 1 .784-.753c.548-.472 1.316-1.033 2.22-1.436.901-.401 1.903-.63 2.95-.49 1.032.138 2.2.647 3.429 1.876 2.459 2.46 2.55 4.748 2.116 6.41a7.5 7.5 0 0 1-1.481 2.848l-.003.003v.001h-.001L16 26.53 5.183 14.863v-.001h-.001l-.003-.004a3 3 0 0 1-.143-.173 7.5 7.5 0 0 1-1.338-2.676c-.434-1.66-.343-3.95 2.116-6.41 1.23-1.228 2.397-1.737 3.43-1.875 1.046-.14 2.048.089 2.949.49.904.403 1.672.964 2.22 1.436a10 10 0 0 1 .784.753l.037.04.006.008h.001l.759.89.759-.89Z"
          />
        </g>
        <defs>
          <clipPath id="favorite_svg__a">
            <path fill="#fff" d="M0 0h32v32H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgFavorite;
