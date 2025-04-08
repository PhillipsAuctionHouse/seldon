import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronLeftProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgChevronLeft = memo(
  forwardRef < SVGSVGElement,
  SvgChevronLeftProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgChevronLeft';
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
            d="m9.829 12 6.424-7.341-1.506-1.318L7.171 12l7.576 8.659 1.506-1.317z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgChevronLeft;
