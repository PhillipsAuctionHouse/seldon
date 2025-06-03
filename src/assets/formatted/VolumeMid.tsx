import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface VolumeMidProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const VolumeMid = memo(
  forwardRef<SVGSVGElement, VolumeMidProps>((props, ref) => {
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
        <path
          fill={color}
          fillRule="evenodd"
          d="m14.69 22-6.233-6.159H4.972a.966.966 0 0 1-.972-.96V9.119l.005-.098a.97.97 0 0 1 .967-.862h3.485L14.69 2zM9.546 9.798a.98.98 0 0 1-.687.281H5.944v3.842h2.915l.096.004a.98.98 0 0 1 .591.277l3.2 3.162V6.636z"
          clipRule="evenodd"
        />
        <path
          fill={color}
          d="m18.334 7.523.196.23C19.483 8.93 20 10.445 20 12s-.517 3.07-1.47 4.246l-.197.23-.643.72-1.456-1.272.644-.719.135-.16c.661-.816 1.043-1.9 1.043-3.045s-.382-2.23-1.043-3.046l-.135-.16-.644-.718 1.456-1.272z"
        />
      </svg>
    );
  }),
);

export default VolumeMid;
