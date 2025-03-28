import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronRightProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgChevronRight = memo(
  forwardRef((props: SvgChevronRightProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgChevronRight';
    const titleId = kebabCase(title);

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
          d="m20.252 16.131-8.288 8.288c-.293.293-.345 1.07.101 1.516.447.446 1.223.393 1.516.1l9.192-9.192c.149-.148.235-.42.226-.712.01-.29-.077-.563-.226-.712l-9.192-9.192c-.293-.293-1.07-.345-1.516.101s-.393 1.222-.1 1.515z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgChevronRight;
