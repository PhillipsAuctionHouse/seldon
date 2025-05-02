import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgSearchProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgSearch = memo(
  forwardRef<SVGSVGElement, SvgSearchProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgSearch';
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
          d="M14.906 16.32a8 8 0 1 1 1.414-1.414l4.155 4.155a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707 0zM16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgSearch;
