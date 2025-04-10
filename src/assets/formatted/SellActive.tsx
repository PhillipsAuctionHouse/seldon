import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgSellActiveProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgSellActive = memo(
  forwardRef<SVGSVGElement, SvgSellActiveProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgSellActive';
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
          stroke={color}
          strokeWidth={2}
          d="M3 3v7.352a1 1 0 0 0 .301.715L13.465 21 21 12.818l-9.755-9.533A1 1 0 0 0 10.546 3zm3.879 8.121A3 3 0 1 0 11.12 6.88 3 3 0 0 0 6.88 11.12Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgSellActive;
