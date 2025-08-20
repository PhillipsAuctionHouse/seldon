import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminCloseProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminClose = memo(
  forwardRef<SVGSVGElement, AdminCloseProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 25 24"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill={color || '#fff'}
          d="M19.5 6.41 18.09 5l-5.59 5.59L6.91 5 5.5 6.41 11.09 12 5.5 17.59 6.91 19l5.59-5.59L18.09 19l1.41-1.41L13.91 12z"
        />
      </svg>
    );
  }),
);

export default AdminClose;
