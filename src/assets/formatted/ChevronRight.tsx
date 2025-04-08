import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronRightProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgChevronRight = memo(
  forwardRef < SVGSVGElement,
  SvgChevronRightProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgChevronRight';
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
            d="M9.252 3.341 16.83 12l-7.577 8.659-1.505-1.317L14.171 12 7.747 4.659z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgChevronRight;
