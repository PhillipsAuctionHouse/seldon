import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgXProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgX = memo(
  forwardRef<SVGSVGElement, SvgXProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgX';
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
          d="M13.903 10.469 21.348 2h-1.764l-6.465 7.353L7.955 2H2l7.808 11.12L2 22h1.764l6.828-7.765L16.044 22H22zm-2.417 2.748-.791-1.107L4.4 3.3h2.71l5.08 7.11.791 1.107 6.604 9.242h-2.71z"
        />
      </svg>
    );
  }),
);

export default SvgX;
