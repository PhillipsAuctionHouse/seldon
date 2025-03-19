import { forwardRef } from 'react';
const SvgClose = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 32 32"
    ref={ref}
    {...props}
  >
    <path d="M8.283 7.932a1.13 1.13 0 0 1 1.6-.015L24.148 22.18c.438.438.43 1.155-.016 1.601a1.13 1.13 0 0 1-1.6.016L8.267 9.533a1.13 1.13 0 0 1 .016-1.6" />
    <path d="M24.132 7.932c.447.447.454 1.163.016 1.6L9.883 23.799a1.13 1.13 0 0 1-1.6-.016 1.13 1.13 0 0 1-.016-1.6L22.532 7.916a1.13 1.13 0 0 1 1.6.015" />
  </svg>
);
const ForwardRef = forwardRef(SvgClose);
export default ForwardRef;
