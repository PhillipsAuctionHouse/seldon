import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgVolumeMidProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgVolumeMid = memo(
  forwardRef < SVGSVGElement,
  SvgVolumeMidProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgVolumeMid';
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
            d="M13 5h1V2.92l-1.625 1.3zM8 9v1a1 1 0 0 0 .625-.22zM4 9V8a1 1 0 0 0-1 1zm0 6H3a1 1 0 0 0 1 1zm4 0 .625-.78A1 1 0 0 0 8 14zm5 4-.625.78L14 21.08V19zm4.75-11.662-.663-.75-1.498 1.325.662.75zm-1.5 8-.662.75 1.5 1.323.661-.749zM12.376 4.219l-5 4 1.25 1.562 5-4zM8 8H4v2h4zM3 9v6h2V9zm1 7h4v-2H4zm3.375-.22 5 4 1.25-1.56-5-4zM14 19V5h-2v14zm2.25-10.338c.766.867 1.214 2.066 1.214 3.338h2c0-1.728-.606-3.407-1.715-4.662zM17.465 12c0 1.272-.448 2.471-1.213 3.338l1.498 1.324c1.11-1.255 1.715-2.934 1.715-4.662z"
          />
        </svg>
      );
    }),
);

export default SvgVolumeMid;
