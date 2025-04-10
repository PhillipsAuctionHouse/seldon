import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPlayProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgPlay = memo(
  forwardRef<SVGSVGElement, SvgPlayProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgPlay';
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
        <path
          fill={color}
          d="m7.389 4.26 11.299 7.532a.25.25 0 0 1 0 .416l-11.3 7.533A.25.25 0 0 1 7 19.533V4.467c0-.2.223-.319.389-.208"
        />
      </svg>
    );
  }),
);

export default SvgPlay;
