import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ViewProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const View = memo(
  forwardRef<SVGSVGElement, ViewProps>((props, ref) => {
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
          d="M4.206 12a16.125 16.125 0 0 0 1.959 2.84C7.61 16.507 9.588 18 12 18s4.39-1.494 5.835-3.16A16 16 0 0 0 19.794 12a16.125 16.125 0 0 0-1.959-2.84C16.39 7.493 14.412 6 12 6S7.61 7.494 6.165 9.16A16 16 0 0 0 4.206 12m16.702 0 .896-.424-.002-.003-.003-.006-.009-.02a8 8 0 0 0-.157-.313 18.125 18.125 0 0 0-2.31-3.393C17.734 6.006 15.257 4 12 4S6.268 6.006 4.676 7.84a18 18 0 0 0-2.433 3.638l-.033.069-.01.02-.002.006-.001.002s-.001.002.896.425l-.897-.424L2 12l.196.424.897-.424-.897.424v.001l.002.002.003.006.009.02.033.07q.043.087.124.243a18.12 18.12 0 0 0 2.31 3.393C6.267 17.994 8.743 20 12 20s5.732-2.006 7.324-3.84a18 18 0 0 0 2.433-3.638l.033-.069.01-.02.002-.006.001-.002s.001-.002-.896-.425m0 0 .896.424L22 12l-.196-.424zM12 10a1.99 1.99 0 0 0-1.98 2c0 1.105.887 2 1.98 2a1.99 1.99 0 0 0 1.98-2c0-1.105-.887-2-1.98-2m-3.959 2c0-2.21 1.773-4 3.959-4s3.959 1.79 3.959 4-1.773 4-3.959 4-3.959-1.79-3.959-4"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default View;
