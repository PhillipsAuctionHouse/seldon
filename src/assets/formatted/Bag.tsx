import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgBagProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgBag = memo(
  forwardRef<SVGSVGElement, SvgBagProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgBag';
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
          stroke={color}
          strokeWidth={2}
          d="M16 11V7a4 4 0 1 0-8 0v4m-3.913 9h15.826a1 1 0 0 0 .997-1.083L20 8H4l-.91 10.917A1 1 0 0 0 4.087 20Z"
        />
      </svg>
    );
  }),
);

export default SvgBag;
