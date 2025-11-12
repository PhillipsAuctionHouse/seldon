import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ClockProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Clock = memo(
  forwardRef<SVGSVGElement, ClockProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 19 19"
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
          d="M9.906 1.595A7.917 7.917 0 0 1 17.415 9.5l-.01.407A7.917 7.917 0 0 1 9.5 17.417l-.408-.01a7.917 7.917 0 0 1-7.498-7.499l-.011-.407a7.92 7.92 0 0 1 7.917-7.917zM9.5 3.084A6.418 6.418 0 1 0 9.5 15.919 6.418 6.418 0 0 0 9.5 3.084m.79 6.874L6.716 13.46l-1.177-1.153 3.085-3.024v-3.74h1.665z"
        />
      </svg>
    );
  }),
);

export default Clock;
