import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgDeleteProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgDelete = memo(
  forwardRef<SVGSVGElement, SvgDeleteProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgDelete';
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
        <path fill={color} d="M11 10H9v8h2zM15 10h-2v8h2z" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h5v2h-2v14H4V8H2V6h5zm8 0v2H9V4zM6 8h12v12H6z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgDelete;
