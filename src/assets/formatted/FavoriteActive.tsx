import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface FavoriteActiveProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const FavoriteActive = memo(
  forwardRef<SVGSVGElement, FavoriteActiveProps>((props, ref) => {
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
          className="favorite-active__inner"
          d="M11.087 5.38 12 6.29l.913-.909A4.75 4.75 0 0 1 16.263 4a4.75 4.75 0 0 1 3.35 1.38A4.7 4.7 0 0 1 21 8.714c0 1.25-.41 2.26-1.387 3.333l-1.477 1.716L12 20l-6.136-6.238-1.476-1.716C3.409 10.974 3 9.963 3 8.713s.5-2.449 1.388-3.332A4.75 4.75 0 0 1 7.738 4a4.75 4.75 0 0 1 3.349 1.38"
        />
        <path
          fill={color}
          className="favorite-active__outline"
          d="m12 6.289-.706.709a1 1 0 0 0 1.41 0zm-.913-.909-.705.71zm-6.7 0 .706.71zm0 6.666.759-.652-.02-.022zm1.477 1.716-.758.652.045.05zM12 20l-.713.701.713.725.713-.725zm.913-14.62.705.71zm6.7 0-.706.71zm0 6.666-.74-.674-.019.022zm-1.477 1.716.713.702.046-.05zm-5.43-8.182-.914-.908-1.41 1.417.912.909zm-.914-.908A5.75 5.75 0 0 0 7.737 3v2a3.75 3.75 0 0 1 2.645 1.09zM7.737 3c-1.52 0-2.978.6-4.055 1.672l1.41 1.417A3.75 3.75 0 0 1 7.738 5zM3.682 4.672A5.7 5.7 0 0 0 2 8.713h2c0-.983.393-1.927 1.093-2.624zM2 8.713c0 1.53.524 2.775 1.649 4.007l1.477-1.348C4.294 10.46 4 9.682 4 8.713zm1.63 3.985 1.476 1.716 1.516-1.304-1.476-1.716zm1.52 1.766 6.137 6.237 1.426-1.402-6.136-6.238zm7.555-7.466.913-.908-1.41-1.419-.913.909zm.913-.909A3.75 3.75 0 0 1 16.263 5V3c-1.52 0-2.979.6-4.055 1.672zM16.263 5a3.75 3.75 0 0 1 2.644 1.09l1.41-1.418A5.75 5.75 0 0 0 16.264 3zm2.644 1.09c.7.696 1.093 1.64 1.093 2.623h2c0-1.517-.606-2.97-1.682-4.041zM20 8.712c0 .97-.294 1.747-1.126 2.66l1.477 1.347C21.476 11.488 22 10.244 22 8.713zm-1.146 2.681-1.476 1.716 1.517 1.304 1.476-1.716zm-1.43 1.667-6.137 6.238 1.426 1.402 6.136-6.237z"
        />
      </svg>
    );
  }),
);

export default FavoriteActive;
