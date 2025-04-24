import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgGridProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgGrid = memo(
  forwardRef<SVGSVGElement, SvgGridProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgGrid';
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
        <path stroke={color} strokeWidth={2} d="M21 14v7h-7v-7zm-11 0v7H3v-7zM21 3v7h-7V3zM10 3v7H3V3z" />
      </svg>
    );
  }),
);

export default SvgGrid;
