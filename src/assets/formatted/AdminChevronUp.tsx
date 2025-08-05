import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminChevronUpProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminChevronUp = memo(
  forwardRef<SVGSVGElement, AdminChevronUpProps>((props, ref) => {
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
        <path fill={color} d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
      </svg>
    );
  }),
);

export default AdminChevronUp;
