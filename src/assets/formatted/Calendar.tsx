import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCalendarProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgCalendar = memo(
  forwardRef < SVGSVGElement,
  SvgCalendarProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgCalendar';
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
            d="M9 4.999V3H7v2H2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5h-5V3h-2v2H9zM7 7v.53c0 .26.21.47.47.47h1.06c.26 0 .47-.21.47-.47V7h6v.53c0 .26.21.47.47.47h1.06c.26 0 .47-.21.47-.47V7h3v3H4V7zm-3 5h16v7H4zm5 5h6v-2H9z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default SvgCalendar;
