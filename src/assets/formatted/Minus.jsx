import { forwardRef } from 'react';
const SvgMinus = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path d="M4.5 11.893c0-.474.336-.857.75-.857h13.5c.414 0 .75.383.75.857 0 .473-.336.857-.75.857H5.25c-.414 0-.75-.384-.75-.857" />
    <path d="M4.5 11.893c0-.474.336-.857.75-.857h13.5c.414 0 .75.383.75.857 0 .473-.336.857-.75.857H5.25c-.414 0-.75-.384-.75-.857" />
  </svg>
);
const ForwardRef = forwardRef(SvgMinus);
export default ForwardRef;
