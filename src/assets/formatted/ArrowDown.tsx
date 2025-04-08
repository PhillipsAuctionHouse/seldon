import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgArrowDownProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgArrowDown = memo(
  forwardRef < SVGSVGElement,
  SvgArrowDownProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgArrowDown';
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
          <path fill={color} d="M13 4v13.844l4.854-4.107 1.292 1.526L12 21.31l-7.146-6.047 1.292-1.526L11 17.844V4z" />
        </svg>
      );
    }),
);

export default SvgArrowDown;
