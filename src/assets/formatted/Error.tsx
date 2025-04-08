import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgErrorProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgError = memo(
  forwardRef < SVGSVGElement,
  SvgErrorProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgError';
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
          <path fill={color} d="M11 13V7h2v6zM12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgError;
