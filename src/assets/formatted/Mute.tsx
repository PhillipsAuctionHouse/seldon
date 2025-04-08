import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgMuteProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgMute = memo(
  forwardRef < SVGSVGElement,
  SvgMuteProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgMute';
      const titleId = propsTitleId || kebabCase(title);

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
            d="M4 2.586 2.586 4l4 4H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.65L13 21.08v-6.666l1.042 1.043-.086.086 1.414 1.414.086-.086 1.621 1.62-.591.592 1.414 1.414.591-.591L20 21.414 21.414 20zm7 9.828L8.037 9.451l-.412.33a1 1 0 0 1-.625.22H4v4h3a1 1 0 0 1 .625.218L11 16.92z"
            clipRule="evenodd"
          />
          <path
            fill={color}
            d="M11 7.08v.506l2 2V2.919L9.296 5.882l1.423 1.423zM15.815 12.4l1.658 1.659a6 6 0 0 0-1.396-6.293l-.707-.708-1.414 1.414.707.708a4 4 0 0 1 1.152 3.22"
          />
          <path
            fill={color}
            d="m19.061 15.647 1.497 1.497a11 11 0 0 0-1.95-12.908l-.708-.708-1.414 1.414.707.708a9 9 0 0 1 1.868 9.997"
          />
        </svg>
      );
    }),
);

export default SvgMute;
