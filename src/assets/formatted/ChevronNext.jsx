import { forwardRef } from 'react';
const SvgChevronNext = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 8 14"
    ref={ref}
    {...props}
  >
    <path d="m5.658 7.082-5.18 5.18c-.183.183-.216.668.063.947.279.28.764.246.947.063l5.745-5.745c.093-.093.147-.263.142-.445.005-.182-.05-.352-.142-.445L1.488.892C1.305.709.82.676.54.955c-.28.279-.246.764-.063.947z" />
  </svg>
);
const ForwardRef = forwardRef(SvgChevronNext);
export default ForwardRef;
