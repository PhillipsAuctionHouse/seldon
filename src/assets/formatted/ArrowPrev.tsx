import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgArrowPrevProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgArrowPrev = memo(
  forwardRef((props: SvgArrowPrevProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgArrowPrev';
    const titleId = kebabCase(title);

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
          d="M20.16 11.143c.464 0 .84.383.84.857a.85.85 0 0 1-.84.857H6.217l3.609 3.68a.87.87 0 0 1 0 1.212.83.83 0 0 1-1.19 0L3 12l5.638-5.749a.83.83 0 0 1 1.189 0 .87.87 0 0 1 0 1.212l-3.609 3.68z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgArrowPrev;
