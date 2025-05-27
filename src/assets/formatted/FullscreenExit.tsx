import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface FullscreenExitProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const FullscreenExit = memo(
  forwardRef<SVGSVGElement, FullscreenExitProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

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
        <path fill={color} d="M8 16v6H6v-4H2v-2zM22 18h-4v4h-2v-6h6zM8 8H2V6h4V2h2zM18 6h4v2h-6V2h2z" />
      </svg>
    );
  }),
);

export default FullscreenExit;
