import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCloseProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgClose = memo(
  forwardRef((props: SvgCloseProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgClose';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill={color}
          fillRule="evenodd"
          d="M8.283 7.932a1.13 1.13 0 0 1 1.6-.015L24.148 22.18c.438.438.43 1.155-.016 1.601a1.13 1.13 0 0 1-1.6.016L8.267 9.533a1.13 1.13 0 0 1 .016-1.6"
          clipRule="evenodd"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M24.132 7.932c.447.447.454 1.163.016 1.6L9.883 23.799a1.13 1.13 0 0 1-1.6-.016 1.13 1.13 0 0 1-.016-1.6L22.532 7.916a1.13 1.13 0 0 1 1.6.015"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgClose;
