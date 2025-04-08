import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgLinkedInProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgLinkedIn = memo(
  forwardRef < SVGSVGElement,
  SvgLinkedInProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgLinkedIn';
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
          <g clipPath="url(#LinkedIn_svg__a)">
            <path
              fill={color}
              d="M20.389 13.924V20.4h-3.54v-6.116c0-1.559-.572-2.518-1.828-2.518-.8 0-1.599.48-1.827 1.319-.115.36-.115.6-.115.96V20.4H9.54V9.128h3.54v1.559c.686-1.2 1.828-1.919 3.198-1.919 2.284 0 4.112 1.679 4.112 5.156M5.656 3.611c-1.028-.12-1.942.72-2.056 1.8v.12c0 1.078.8 1.918 1.827 1.918h.115c1.028.12 1.941-.72 2.055-1.8V5.53c0-1.08-.685-1.919-1.713-1.919zM3.829 20.4h3.54V9.128h-3.54z"
            />
          </g>
          <defs>
            <clipPath id="LinkedIn_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgLinkedIn;
