import { forwardRef } from 'react';
const SvgArrowPrev = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    viewBox="0 0 24 24"
    fillRule="evenodd"
    clipRule="evenodd"
    ref={ref}
    {...props}
  >
    <path d="M20.16 11.143c.464 0 .84.383.84.857a.85.85 0 0 1-.84.857H6.217l3.609 3.68a.87.87 0 0 1 0 1.212.83.83 0 0 1-1.19 0L3 12l5.638-5.749a.83.83 0 0 1 1.189 0 .87.87 0 0 1 0 1.212l-3.609 3.68z" />
  </svg>
);
const ForwardRef = forwardRef(SvgArrowPrev);
export default ForwardRef;
