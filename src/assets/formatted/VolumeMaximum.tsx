import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgVolumeMaximumProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgVolumeMaximum = memo(
  forwardRef<SVGSVGElement, SvgVolumeMaximumProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgVolumeMaximum';
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
          d="M13.54 2v20l-6.146-6.16H3.958A.96.96 0 0 1 3 14.88V9.12c0-.531.429-.96.958-.96h3.436zm-1.916 4.636L8.47 9.798a.96.96 0 0 1-.678.282H4.916v3.84h2.875c.254 0 .498.102.678.282l3.155 3.162zm6.612-2.77.678.678a10.574 10.574 0 0 1 0 14.935l-.678.68-1.355-1.358.677-.68a8.65 8.65 0 0 0 0-12.219l-.677-.679zm-2.424 3.389.678.679a5.77 5.77 0 0 1 0 8.147l-.678.679-1.355-1.358.677-.68a3.845 3.845 0 0 0 0-5.43l-.677-.68z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgVolumeMaximum;
