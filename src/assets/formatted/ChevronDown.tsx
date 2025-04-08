import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronDownProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgChevronDown = memo(
  forwardRef < SVGSVGElement,
  SvgChevronDownProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgChevronDown';
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
            d="M20.659 9.253 12 16.829 3.342 9.253l1.317-1.506L12 14.171l7.342-6.424z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgChevronDown;
