import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgVolumeMinimumProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgVolumeMinimum = memo(
  forwardRef<SVGSVGElement, SvgVolumeMinimumProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgVolumeMinimum';
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
          d="m14.69 22-6.233-6.159H4.972a.966.966 0 0 1-.972-.96V9.119l.005-.098a.97.97 0 0 1 .967-.862h3.485L14.69 2zM9.546 9.798a.98.98 0 0 1-.687.281H5.944v3.842h2.915l.096.004a.98.98 0 0 1 .591.277l3.2 3.162V6.636z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgVolumeMinimum;
