import { forwardRef } from 'react';
const SvgCarouselArrowNext = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    stroke={props.color}
    strokeWidth={2}
    viewBox="0 0 16 32"
    ref={ref}
    {...props}
  >
    <path d="m1.583 1.082 12.834 14.667L1.583 30.415" />
  </svg>
);
const ForwardRef = forwardRef(SvgCarouselArrowNext);
export default ForwardRef;
