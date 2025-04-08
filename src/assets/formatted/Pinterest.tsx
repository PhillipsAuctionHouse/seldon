import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPinterestProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgPinterest = memo(
  forwardRef<SVGSVGElement, SvgPinterestProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgPinterest';
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
          d="M13.049 15.797c-.837-.104-1.57-.523-2.197-1.046-.418 2.302-.941 4.498-2.615 5.649-.523-3.452.732-6.067 1.255-8.891-.941-1.57.105-4.812 2.092-4.08 2.51.941-2.196 5.963.942 6.59 3.242.628 4.602-5.649 2.615-7.74-2.93-2.93-8.473-.105-7.846 4.184.21 1.046 1.256 1.36.419 2.824-1.883-.419-2.406-1.883-2.301-3.87.209-3.034 2.615-5.44 5.648-5.754 3.557-.418 6.8 1.255 7.323 4.603.523 3.766-1.57 7.845-5.335 7.531"
        />
      </svg>
    );
  }),
);

export default SvgPinterest;
