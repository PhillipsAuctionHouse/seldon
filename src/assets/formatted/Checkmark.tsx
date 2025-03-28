import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCheckmarkProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgCheckmark = memo(
  forwardRef((props: SvgCheckmarkProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgCheckmark';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
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
          strokeLinecap="round"
          strokeWidth={2}
          d="m3.5 8.5 2.157 3.02a.5.5 0 0 0 .76.063L13.5 4.5"
        />
      </svg>
    );
  }),
);

export default SvgCheckmark;
