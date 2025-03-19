import { forwardRef } from 'react';
const SvgCalendarAlt = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    viewBox="0 0 28 28"
    ref={ref}
    {...props}
  >
    <path d="M7 12.25A.875.875 0 1 0 7 14h1.75a.875.875 0 0 0 0-1.75zM13.125 12.25a.875.875 0 1 0 0 1.75h1.75a.875.875 0 0 0 0-1.75zM19.25 12.25a.875.875 0 1 0 0 1.75H21a.875.875 0 0 0 0-1.75zM7 17.5a.875.875 0 1 0 0 1.75h1.75a.875.875 0 0 0 0-1.75zM13.125 17.5a.875.875 0 1 0 0 1.75h1.75a.875.875 0 0 0 0-1.75z" />
    <path
      fillRule="evenodd"
      d="M1.75 7a3.5 3.5 0 0 1 3.5-3.5h17.5a3.5 3.5 0 0 1 3.5 3.5v14a3.5 3.5 0 0 1-3.5 3.5H5.25a3.5 3.5 0 0 1-3.5-3.5zM24.5 9.625V21a1.75 1.75 0 0 1-1.75 1.75H5.25A1.75 1.75 0 0 1 3.5 21V9.625zm0-1.75V7a1.75 1.75 0 0 0-1.75-1.75H5.25A1.75 1.75 0 0 0 3.5 7v.875z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCalendarAlt);
export default ForwardRef;
