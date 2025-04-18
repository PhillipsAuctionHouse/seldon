import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgEmailProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgEmail = memo(
  forwardRef<SVGSVGElement, SvgEmailProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgEmail';
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
          d="M2 4v16h20V4zm2 3.414v9.172L8.586 12zM5.414 18h13.172L14 13.414l-.586.586a2 2 0 0 1-2.828 0L10 13.414zM20 16.586V7.414L15.414 12zM18.586 6H5.414L12 12.586z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgEmail;
