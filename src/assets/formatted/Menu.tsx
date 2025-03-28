import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgMenuProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgMenu = memo(
  forwardRef((props: SvgMenuProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgMenu';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path stroke={color} strokeWidth={2} d="M2 8h20M2 16h20" />
      </svg>
    );
  }),
);

export default SvgMenu;
