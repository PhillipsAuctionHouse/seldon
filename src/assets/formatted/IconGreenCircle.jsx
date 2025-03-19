import { forwardRef } from 'react';
const SvgIconGreenCircle = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 8 8"
    ref={ref}
    {...props}
  >
    <circle cx={4} cy={4} r={4} fill="#0FA915" />
  </svg>
);
const ForwardRef = forwardRef(SvgIconGreenCircle);
export default ForwardRef;
