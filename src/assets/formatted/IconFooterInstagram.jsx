import { forwardRef } from 'react';
const SvgIconFooterInstagram = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    stroke={props.color}
    viewBox="0 0 32 32"
    ref={ref}
    {...props}
  >
    <rect width={29} height={29} x={1.5} y={1.5} strokeWidth={3} rx={8.5} />
    <circle cx={16} cy={16} r={6.75} strokeWidth={2.5} />
    <circle cx={25} cy={8} r={2} fill={props.color} />
  </svg>
);
const ForwardRef = forwardRef(SvgIconFooterInstagram);
export default ForwardRef;
