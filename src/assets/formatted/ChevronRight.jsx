import { forwardRef } from 'react';
const SvgChevronRight = (props, ref) => (
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
    <path d="m20.252 16.131-8.288 8.288c-.293.293-.345 1.07.101 1.516.447.446 1.223.393 1.516.1l9.192-9.192c.149-.148.235-.42.226-.712.01-.29-.077-.563-.226-.712l-9.192-9.192c-.293-.293-1.07-.345-1.516.101s-.393 1.222-.1 1.515z" />
  </svg>
);
const ForwardRef = forwardRef(SvgChevronRight);
export default ForwardRef;
