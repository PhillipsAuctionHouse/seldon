import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminChevronRightProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminChevronRight = memo(
  forwardRef<SVGSVGElement, AdminChevronRightProps>((props, ref) => {
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
        <path fill={color || '#fff'} d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    );
  }),
);

export default AdminChevronRight;
