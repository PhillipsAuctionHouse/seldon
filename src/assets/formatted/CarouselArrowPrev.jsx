import { forwardRef } from 'react';
const SvgCarouselArrowPrev = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 16 32"
    stroke={props.color}
    strokeWidth={2}
    ref={ref}
    {...props}
  >
    <path d="M14.417 1.082 1.583 15.749l12.834 14.666" />
  </svg>
);
const ForwardRef = forwardRef(SvgCarouselArrowPrev);
export default ForwardRef;
