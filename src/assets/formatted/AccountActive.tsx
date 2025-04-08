import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgAccountActiveProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgAccountActive = memo(
  forwardRef < SVGSVGElement,
  SvgAccountActiveProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgAccountActive';
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
            stroke={color}
            strokeWidth={2}
            d="M19.955 21H4.043c.181-2.059.926-3.695 2.071-4.856C7.438 14.804 9.392 14 11.91 14c2.52 0 4.525.805 5.896 2.154 1.182 1.165 1.959 2.8 2.149 4.846ZM16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          />
        </svg>
      );
    }),
);

export default SvgAccountActive;
