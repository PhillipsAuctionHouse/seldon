import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFiltersProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgFilters = memo(
  forwardRef<SVGSVGElement, SvgFiltersProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgFilters';
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
          d="M6 3v3H2v2h4v3h6V8h10V6H12V3zm4 2H8v4h2zM12 13v3H2v2h10v3h6v-3h4v-2h-4v-3zm4 2h-2v4h2z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgFilters;
