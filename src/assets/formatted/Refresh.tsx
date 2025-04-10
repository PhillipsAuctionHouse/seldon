import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgRefreshProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgRefresh = memo(
  forwardRef<SVGSVGElement, SvgRefreshProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgRefresh';
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
          d="M18.626 4.722 19 5.12V2h2v6h-6V6h2.062c-1.383-1.23-3.258-2-5.343-2C7.353 4 4 7.325 4 11.201q0 .084.002.163L2.037 12A8 8 0 0 1 2 11.201C2 6.118 6.354 2 11.72 2c2.7 0 5.142 1.045 6.906 2.722M9 18H5.938c1.383 1.23 3.258 2 5.343 2C15.647 20 19 16.675 19 12.799q0-.084-.002-.163L20.963 12c.028.263.037.536.037.799C21 17.882 16.646 22 11.28 22c-2.394 0-4.585-.821-6.28-2.176V22H3v-6h6z"
        />
      </svg>
    );
  }),
);

export default SvgRefresh;
