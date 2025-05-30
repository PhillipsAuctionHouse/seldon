import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ListProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const List = memo(
  forwardRef<SVGSVGElement, ListProps>((props, ref) => {
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
          d="M21 13H3V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zm-2-2H5V5h14z"
          clipRule="evenodd"
        />
        <path fill={color} d="M21 15H3v2h18zM21 19H3v2h18z" />
      </svg>
    );
  }),
);

export default List;
