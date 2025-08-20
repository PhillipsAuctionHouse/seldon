import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminHomeProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminHome = memo(
  forwardRef<SVGSVGElement, AdminHomeProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 18"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill={color || '#323232'}
          d="M2.6 15.6H5v-6h6v6h2.4V6.9L8 2.85 2.6 6.9zM.8 17.4V6L8 .6 15.2 6v11.4h-6v-6H6.8v6z"
        />
      </svg>
    );
  }),
);

export default AdminHome;
