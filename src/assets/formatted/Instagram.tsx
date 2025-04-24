import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgInstagramProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgInstagram = memo(
  forwardRef<SVGSVGElement, SvgInstagramProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgInstagram';
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
          d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10m0-1.562a3.437 3.437 0 1 0 0-6.875 3.437 3.437 0 0 0 0 6.874"
          clipRule="evenodd"
        />
        <path fill={color} d="M17.625 8.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M8.25 2A6.25 6.25 0 0 0 2 8.25v7.5A6.25 6.25 0 0 0 8.25 22h7.5A6.25 6.25 0 0 0 22 15.75v-7.5A6.25 6.25 0 0 0 15.75 2zm7.5 1.875h-7.5A4.375 4.375 0 0 0 3.875 8.25v7.5a4.375 4.375 0 0 0 4.375 4.375h7.5a4.375 4.375 0 0 0 4.375-4.375v-7.5a4.375 4.375 0 0 0-4.375-4.375"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgInstagram;
