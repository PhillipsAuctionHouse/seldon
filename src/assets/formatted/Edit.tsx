import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgEditProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgEdit = memo(
  forwardRef < SVGSVGElement,
  SvgEditProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgEdit';
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
            d="M18.901 3.301a2 2 0 0 0-2.828 0L3.26 16.114l-1.24 5.483 5.483-1.24L20.316 7.544a2 2 0 0 0 0-2.828zm-1.5 4.329-1.414-1.414 1.5-1.5 1.414 1.414zm-2.828 0 1.414 1.414-9.49 9.49-1.827.413.413-1.827z"
            clipRule="evenodd"
          />
          <path fill={color} d="M11 20v2h11v-2z" />
        </svg>
      );
    }),
);

export default SvgEdit;
