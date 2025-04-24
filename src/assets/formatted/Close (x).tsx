import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgCloseXProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgCloseX = memo(
  forwardRef<SVGSVGElement, SvgCloseXProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgCloseX';
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
        <path stroke={color} strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  }),
);

export default SvgCloseX;
