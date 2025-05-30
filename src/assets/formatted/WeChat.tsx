import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface WeChatProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const WeChat = memo(
  forwardRef<SVGSVGElement, WeChatProps>((props, ref) => {
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
          d="M16.004 8.786c3.309 0 5.996 2.4 5.996 5.341 0 1.645-.823 3.096-2.104 4.083-.163.116-.219.31-.182.503l.293 1.258c.037.116-.09.213-.182.155l-1.481-.852a.8.8 0 0 0-.512-.058 6.1 6.1 0 0 1-1.81.252c-3.31 0-5.996-2.4-5.997-5.341s2.67-5.34 5.979-5.34M9.239 3c3.566 0 6.527 2.264 7.113 5.225h-.275c-3.62 0-6.545 2.652-6.545 5.922 0 .505.074 1.008.22 1.489-.183.02-.347.02-.512.02a8.5 8.5 0 0 1-2.23-.31.52.52 0 0 0-.476.058l-2.138 1.354c-.128.078-.274-.057-.238-.193l.548-2.051c.018-.136-.018-.27-.128-.348C3.006 13.005 2 11.263 2 9.328 2 5.825 5.236 3 9.24 3m4.465 8.706a.8.8 0 0 0-.42.238.9.9 0 0 0-.226.447.9.9 0 0 0 .046.503.86.86 0 0 0 .304.39.79.79 0 0 0 1.04-.107.88.88 0 0 0 .24-.617.9.9 0 0 0-.14-.484.83.83 0 0 0-.368-.32.8.8 0 0 0-.476-.05m4.041 0a.8.8 0 0 0-.422.238.9.9 0 0 0-.224.447.9.9 0 0 0 .046.503.86.86 0 0 0 .303.39.8.8 0 0 0 .457.147c.439 0 .822-.387.822-.87a.9.9 0 0 0-.138-.485.83.83 0 0 0-.37-.32.8.8 0 0 0-.474-.05M6.808 6.348c-.53 0-.969.464-.97 1.025 0 .561.44 1.026.97 1.026.548 0 .968-.464.968-1.026 0-.561-.438-1.025-.968-1.025m4.863 0c-.53 0-.969.464-.969 1.025 0 .562.438 1.026.969 1.026s.969-.464.969-1.026c0-.561-.439-1.025-.97-1.025"
        />
      </svg>
    );
  }),
);

export default WeChat;
