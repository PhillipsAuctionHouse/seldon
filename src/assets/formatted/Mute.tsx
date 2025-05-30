import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface MuteProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Mute = memo(
  forwardRef<SVGSVGElement, MuteProps>((props, ref) => {
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
          d="m21.603 19.681-1.355 1.358-1.446-1.449-.566.57-1.355-1.358.566-.57-1.553-1.556-.082.084-1.355-1.358.082-.084-.998-1V22l-6.147-6.159H3.958a.96.96 0 0 1-.958-.96V9.12l.005-.099a.96.96 0 0 1 .953-.861h3.436L3.561 4.318 4.916 2.96zM8.47 9.8a.96.96 0 0 1-.678.281H4.916v3.84h2.875l.095.005c.22.022.425.12.583.277l3.155 3.162v-4.967L8.75 9.517z"
          clipRule="evenodd"
        />
        <path
          fill={color}
          d="m18.914 4.545.36.38a10.58 10.58 0 0 1 1.508 12.013L19.347 15.5a8.655 8.655 0 0 0-1.494-9.287l-.294-.31-.678-.68 1.355-1.357z"
        />
        <path
          fill={color}
          d="m16.49 7.935.196.207a5.77 5.77 0 0 1 1.14 5.833l-1.588-1.591q.018-.187.018-.376c0-.955-.355-1.873-.99-2.578l-.132-.138-.677-.678 1.355-1.358zM13.54 9.682l-1.916-1.92V6.636l-.561.562L9.708 5.84 13.54 2z"
        />
      </svg>
    );
  }),
);

export default Mute;
