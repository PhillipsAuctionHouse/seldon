import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronNextProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgChevronNext = memo(
  forwardRef((props: SvgChevronNextProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgChevronNext';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
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
          d="m5.658 7.082-5.18 5.18c-.183.183-.216.668.063.947.279.28.764.246.947.063l5.745-5.745c.093-.093.147-.263.142-.445.005-.182-.05-.352-.142-.445L1.488.892C1.305.709.82.676.54.955c-.28.279-.246.764-.063.947z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgChevronNext;
