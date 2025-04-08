import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgHomeProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgHome = memo(
  forwardRef < SVGSVGElement,
  SvgHomeProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgHome';
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
            stroke={color}
            strokeWidth={2}
            d="M9 21H3V9.505a1 1 0 0 1 .447-.833L12 3l8.553 5.672a1 1 0 0 1 .447.833V21h-6m-6 0h6m-6 0v-7.753a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V21"
          />
        </svg>
      );
    }),
);

export default SvgHome;
