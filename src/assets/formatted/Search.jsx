import { forwardRef } from 'react';
const SvgSearch = (props, ref) => (
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
    <path d="M19.76 17.618A9.001 9.001 0 0 0 6.364 5.636a9 9 0 0 0 11.982 13.396l1.453 1.453a1 1 0 0 0 0 1.415l3.535 3.535a2 2 0 1 0 2.829-2.828l-3.536-3.536a1 1 0 0 0-1.414 0zm-2.082-.668a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9" />
  </svg>
);
const ForwardRef = forwardRef(SvgSearch);
export default ForwardRef;
