import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgArrowUpProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgArrowUp = memo(
  forwardRef < SVGSVGElement,
  SvgArrowUpProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgArrowUp';
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
          <path fill={color} d="m12 2.69 7.146 6.047-1.292 1.526L13 6.156V20h-2V6.156l-4.854 4.107-1.292-1.526z" />
        </svg>
      );
    }),
);

export default SvgArrowUp;
