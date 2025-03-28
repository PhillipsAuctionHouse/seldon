import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCarouselArrowPrevProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgCarouselArrowPrev = memo(
  forwardRef((props: SvgCarouselArrowPrevProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgCarouselArrowPrev';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 32"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path stroke={color} strokeWidth={2} d="M14.417 1.082 1.583 15.749l12.834 14.666" />
      </svg>
    );
  }),
);

export default SvgCarouselArrowPrev;
