import { forwardRef } from 'react';
const SvgIconFooterFacebook = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    viewBox="0 0 40 40"
    ref={ref}
    {...props}
  >
    <path d="M21.842 15.1v-2.45c0-1.225.17-1.925 2.04-1.925h2.381V6h-3.91c-4.762 0-6.292 2.275-6.292 6.3v2.975H13V20h2.89v14h5.952V20h3.911l.51-4.9z" />
  </svg>
);
const ForwardRef = forwardRef(SvgIconFooterFacebook);
export default ForwardRef;
