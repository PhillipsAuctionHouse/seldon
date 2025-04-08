import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgSuccessProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgSuccess = memo(
  forwardRef < SVGSVGElement,
  SvgSuccessProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgSuccess';
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
          <path stroke={color} strokeLinecap="square" strokeWidth={2} d="M20 6 9 17l-5-5" />
        </svg>
      );
    }),
);

export default SvgSuccess;
