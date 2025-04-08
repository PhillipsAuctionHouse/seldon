import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgMenuProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgMenu = memo(
  forwardRef < SVGSVGElement,
  SvgMenuProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgMenu';
      const titleId = propsTitleId || kebabCase(title);

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
