import { forwardRef } from 'react';
const SvgMenu = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    stroke={props.color}
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path strokeWidth={2} d="M2 8h20M2 16h20" />
  </svg>
);
const ForwardRef = forwardRef(SvgMenu);
export default ForwardRef;
