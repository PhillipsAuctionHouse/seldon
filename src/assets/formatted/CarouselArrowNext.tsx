import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCarouselArrowNextProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgCarouselArrowNext = memo(
  forwardRef((props: SvgCarouselArrowNextProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgCarouselArrowNext';
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
        <path stroke={color} strokeWidth={2} d="m1.583 1.082 12.834 14.667L1.583 30.415" />
      </svg>
    );
  }),
);

export default SvgCarouselArrowNext;
