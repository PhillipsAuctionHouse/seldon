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
          d="M12 17.25a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5m0-1.64a3.61 3.61 0 1 0 0-7.22 3.61 3.61 0 0 0 0 7.22"
          clipRule="evenodd"
        />
        <path fill={color} d="M17.906 8.063a1.313 1.313 0 1 0 0-2.626 1.313 1.313 0 0 0 0 2.625" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M8.063 1.5A6.56 6.56 0 0 0 1.5 8.063v7.874A6.56 6.56 0 0 0 8.063 22.5h7.874a6.56 6.56 0 0 0 6.563-6.562V8.061A6.56 6.56 0 0 0 15.938 1.5zm7.874 1.969H8.064a4.594 4.594 0 0 0-4.594 4.594v7.874a4.594 4.594 0 0 0 4.594 4.594h7.874a4.594 4.594 0 0 0 4.594-4.593V8.061a4.594 4.594 0 0 0-4.593-4.593"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgInstagram;
