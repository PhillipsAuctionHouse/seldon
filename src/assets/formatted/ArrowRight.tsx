import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgArrowRightProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgArrowRight = memo(
  forwardRef<SVGSVGElement, SvgArrowRightProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgArrowRight';
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
        <path fill={color} d="M15.263 4.854 21.31 12l-6.047 7.146-1.526-1.292L17.844 13H4v-2h13.844l-4.107-4.854z" />
      </svg>
    );
  }),
);

export default SvgArrowRight;
