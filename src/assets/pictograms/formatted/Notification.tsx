import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface NotificationProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Notification = memo(
  forwardRef < SVGSVGElement,
  NotificationProps >
    ((props, ref) => {
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
          <path fill={color} d="M32 57.5c4.25 0 5-3 5-3H27s.75 3 5 3" />
          <path
            stroke={color}
            strokeLinecap="square"
            strokeWidth={3}
            d="M32 12.5c4.614 0 7.05 2.528 8.416 5.186.694 1.35 1.095 2.718 1.321 3.758a16 16 0 0 1 .258 1.569l.008.078v.016l.004.04.006.044v.01q.002.01.004.026l.013.103.052.383a125.507 125.507 0 0 0 .943 5.813c.317 1.686.7 3.5 1.136 5.115.425 1.574.937 3.104 1.553 4.13 1.119 1.866 2.755 3.488 4.054 4.613a29 29 0 0 0 1.68 1.351l.052.038V51.5h-39v-6.727l.052-.038c.43-.32 1.022-.78 1.68-1.351 1.299-1.125 2.935-2.747 4.054-4.612.616-1.027 1.128-2.557 1.553-4.131.436-1.616.82-3.429 1.136-5.115a126 126 0 0 0 .943-5.813l.052-.383.013-.102.003-.027.001-.007v-.003l.006-.043.002-.043h.001l.001-.014.008-.078q.01-.11.039-.331c.039-.294.106-.721.219-1.238.226-1.04.627-2.408 1.321-3.758C24.949 15.028 27.386 12.5 32 12.5Z"
          />
          <path
            fill={color}
            d="m20.178 11.93-.305.385a18.5 18.5 0 0 0-3.845 9.237l-.069.675-.165 1.971-2.99-.25.166-1.972.08-.786a21.5 21.5 0 0 1 4.468-10.733l.304-.387zM46.482 10.457l.478.629a21.5 21.5 0 0 1 4.07 10.89l.166 1.971-2.99.251-.165-1.97a18.5 18.5 0 0 0-3.503-9.372l-.411-.54-.305-.386 2.356-1.86zM34 6v3h-4V6z"
          />
        </svg>
      );
    }),
);

export default Notification;
