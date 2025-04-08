import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCloseDashProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgCloseDash = memo(
  forwardRef < SVGSVGElement,
  SvgCloseDashProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgCloseDash';
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
          <path fill={color} fillRule="evenodd" d="M4 11h16v2H4z" clipRule="evenodd" />
        </svg>
      );
    }),
);

export default SvgCloseDash;
