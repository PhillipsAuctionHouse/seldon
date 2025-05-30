import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface TimerProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Timer = memo(
  forwardRef<SVGSVGElement, TimerProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} d="M33.5 23h-3v9H29v6h6v-1.5h13v-3H35V32h-1.5z" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M57 35c0 13.807-11.193 25-25 25S7 48.807 7 35s11.193-25 25-25 25 11.193 25 25m-3 0c0 12.15-9.85 22-22 22s-22-9.85-22-22 9.85-22 22-22 22 9.85 22 22"
          clipRule="evenodd"
        />
        <path fill={color} d="M25 4h14v3h-5.5v1.667h-3V7H25zM16.364 13.121 14.243 11 10 15.243l2.121 2.121z" />
      </svg>
    );
  }),
);

export default Timer;
