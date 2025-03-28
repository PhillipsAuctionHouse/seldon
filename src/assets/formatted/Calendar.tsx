import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCalendarProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgCalendar = memo(
  forwardRef((props: SvgCalendarProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgCalendar';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="0 0 15 15"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path d="M10.5 8.25H8.25A.75.75 0 0 0 7.5 9v2.25c0 .412.338.75.75.75h2.25c.412 0 .75-.338.75-.75V9a.75.75 0 0 0-.75-.75m0-7.5v.75h-6V.75A.75.75 0 0 0 3.75 0 .75.75 0 0 0 3 .75v.75h-.75C1.417 1.5.757 2.175.757 3L.75 13.5a1.5 1.5 0 0 0 1.5 1.5h10.5c.825 0 1.5-.675 1.5-1.5V3c0-.825-.675-1.5-1.5-1.5H12V.75a.75.75 0 0 0-.75-.75.75.75 0 0 0-.75.75M12 13.5H3a.75.75 0 0 1-.75-.75v-7.5h10.5v7.5c0 .412-.338.75-.75.75" />
      </svg>
    );
  }),
);

export default SvgCalendar;
