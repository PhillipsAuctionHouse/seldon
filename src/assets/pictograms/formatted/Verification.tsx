import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface VerificationProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Verification = memo(
  forwardRef < SVGSVGElement,
  VerificationProps >
    ((props, ref) => {
      const { color, height, width, title, titleId: propsTitleId } = props;
      const titleId = propsTitleId || kebabCase(title || '');

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height={height}
          width={width}
          role="img"
          ref={ref}
          aria-labelledby={titleId}
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          <path fill={color} fillRule="evenodd" d="M10 29V17h12v12zm3-9h6v6h-6z" clipRule="evenodd" />
          <path fill={color} d="M26 18h19v3H26zM26 24h19v3H26zM55.121 37.5 46 46.621 40.879 41.5 43 39.379l3 3 7-7z" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M4 43h32.166c.952 5.675 5.888 10 11.834 10 6.627 0 12-5.373 12-12 0-4.843-2.869-9.016-7-10.912V11H4zm46-13.834V14H7v20h31.252c2.178-3.028 5.733-5 9.748-5q1.023.001 2 .166M36.683 37H7v3h29.041a12 12 0 0 1 .642-3M48 50a9 9 0 1 0 0-18 9 9 0 0 0 0 18"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Verification;
