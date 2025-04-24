import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgAccountProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgAccount = memo(
  forwardRef<SVGSVGElement, SvgAccountProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgAccount';
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
          d="M11.91 14c2.52 0 4.525.805 5.896 2.154 1.182 1.165 1.957 2.8 2.147 4.846H4.043c.182-2.059.926-3.695 2.071-4.855C7.438 14.803 9.392 14 11.91 14ZM12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
        />
      </svg>
    );
  }),
);

export default SvgAccount;
