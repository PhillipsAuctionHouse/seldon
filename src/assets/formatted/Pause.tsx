import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface PauseProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Pause = memo(
  forwardRef<SVGSVGElement, PauseProps>((props, ref) => {
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
          d="M7 4.25A.25.25 0 0 1 7.25 4h2.5a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.25.25h-2.5a.25.25 0 0 1-.25-.25zM14 4.25a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.25.25h-2.5a.25.25 0 0 1-.25-.25z"
        />
      </svg>
    );
  }),
);

export default Pause;
