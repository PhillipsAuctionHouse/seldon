import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronDownProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgChevronDown = memo(
  forwardRef((props: SvgChevronDownProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgChevronDown';
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
          d="m16.131 18.253 8.288-8.289c.293-.293 1.07-.345 1.516.101.446.447.393 1.223.1 1.516l-9.192 9.192c-.148.149-.42.235-.712.226-.29.01-.563-.077-.712-.226l-9.192-9.192c-.293-.293-.345-1.07.101-1.516s1.222-.394 1.515-.1z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgChevronDown;
