import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgAccountCircleProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgAccountCircle = memo(
  forwardRef((props: SvgAccountCircleProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgAccountCircle';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        viewBox="0 0 16 16"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g fill={color} clipPath="url(#account_circle_svg__a)">
          <path
            fillRule="evenodd"
            d="M10.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
            clipRule="evenodd"
          />
          <path d="M5.375 10c-.625 0-.875.75-.875 1.077V12.5c0 .25-.25.5-.5.5s-.5-.25-.5-.5v-1.423C3.5 10.015 4.34 9 5.375 9h5.25c1.036 0 1.875 1.015 1.875 2.077V12.5c0 .25-.25.5-.5.5s-.5-.25-.5-.5v-1.423c0-.327-.254-1.077-.875-1.077z" />
        </g>
        <defs>
          <clipPath id="account_circle_svg__a">
            <path fill="#fff" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgAccountCircle;
