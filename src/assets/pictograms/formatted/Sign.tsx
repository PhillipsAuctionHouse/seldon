import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SignProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Sign = memo(
  forwardRef < SVGSVGElement,
  SignProps >
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
          <path
            fill={color}
            fillRule="evenodd"
            d="m53.668 23.516 4.067-4.067a3.333 3.333 0 0 0 0-4.714l-9.428-9.428a3.333 3.333 0 0 0-4.714 0l-4.067 4.067a.5.5 0 0 0-.212.004L26.862 12.32a.5.5 0 0 0-.341.282L7.54 54.8a.5.5 0 0 0 .66.66l42.239-18.94a.5.5 0 0 0 .282-.342l2.943-12.452a.5.5 0 0 0 .004-.211M46.185 7.428l9.429 9.428c.13.13.13.341 0 .472l-3.772 3.77-9.9-9.899 3.772-3.77c.13-.131.341-.131.471 0m1.9 26.86-31.288 14.03 14.898-14.897-2.122-2.121-14.855 14.855L28.75 14.957l9.897-2.339 11.775 11.776z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Sign;
