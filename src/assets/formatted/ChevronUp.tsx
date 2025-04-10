import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgChevronUpProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgChevronUp = memo(
  forwardRef<SVGSVGElement, SvgChevronUpProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgChevronUp';
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
          fillRule="evenodd"
          d="m12 7.171 8.659 7.576-1.317 1.506L12 9.829 4.66 16.253l-1.317-1.506z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgChevronUp;
