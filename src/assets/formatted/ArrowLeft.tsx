import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgArrowLeftProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgArrowLeft = memo(
  forwardRef < SVGSVGElement,
  SvgArrowLeftProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgArrowLeft';
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
          <path fill={color} d="m6.156 13 4.107 4.854-1.526 1.292L2.69 12l6.047-7.146 1.526 1.292L6.156 11H20v2z" />
        </svg>
      );
    }),
);

export default SvgArrowLeft;
