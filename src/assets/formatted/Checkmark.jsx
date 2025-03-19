import { forwardRef } from 'react';
const SvgCheckmark = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 16 16"
    ref={ref}
    stroke={props.color}
    strokeLinecap="round"
    strokeWidth={2}
    {...props}
  >
    <path d="m3.5 8.5 2.157 3.02a.5.5 0 0 0 .76.063L13.5 4.5" />
  </svg>
);
const ForwardRef = forwardRef(SvgCheckmark);
export default ForwardRef;
