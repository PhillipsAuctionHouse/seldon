import { forwardRef } from 'react';
const SvgShare = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    viewBox="0 0 12 12"
    ref={ref}
    {...props}
  >
    <path d="M6 .595 8.515 3.11a.375.375 0 0 1-.53.53l-1.61-1.61v6.22a.375.375 0 0 1-.75 0V2.03l-1.61 1.61a.375.375 0 1 1-.53-.53z" />
    <path d="M3 5.625a.75.75 0 0 0-.75.75V9.75c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75V6.375a.75.75 0 0 0-.75-.75H7.875a.375.375 0 0 1 0-.75H9a1.5 1.5 0 0 1 1.5 1.5V9.75a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5V6.375a1.5 1.5 0 0 1 1.5-1.5h1.125a.375.375 0 1 1 0 .75z" />
  </svg>
);
const ForwardRef = forwardRef(SvgShare);
export default ForwardRef;
