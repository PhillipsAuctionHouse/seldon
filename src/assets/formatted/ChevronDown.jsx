import { forwardRef } from 'react';
const SvgChevronDown = (props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    fillRule="evenodd"
    viewBox="0 0 32 32"
    ref={ref}
    {...props}
  >
    <path
      d="m16.131 18.253 8.288-8.289c.293-.293 1.07-.345 1.516.101.446.447.393 1.223.1 1.516l-9.192 9.192c-.148.149-.42.235-.712.226-.29.01-.563-.077-.712-.226l-9.192-9.192c-.293-.293-.345-1.07.101-1.516s1.222-.394 1.515-.1z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgChevronDown);
export default ForwardRef;
