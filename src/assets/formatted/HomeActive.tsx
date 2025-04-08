import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgHomeActiveProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgHomeActive = memo(
  forwardRef < SVGSVGElement,
  SvgHomeActiveProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgHomeActive';
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
          <path fill={color} d="M9 21H3V9.505a1 1 0 0 1 .447-.833L12 3l8.553 5.672a1 1 0 0 1 .447.833V21H9" />
          <path fill="#fff" d="M9 20v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1" />
          <path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={2}
            d="M9 21H3V9.505a1 1 0 0 1 .447-.833L12 3l8.553 5.672a1 1 0 0 1 .447.833V21h-6m-6 0h6m-6 0v-7.753a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V21m-6-8v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1Z"
          />
        </svg>
      );
    }),
);

export default SvgHomeActive;
