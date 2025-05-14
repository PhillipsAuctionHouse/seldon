import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SearchProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Search = memo(
  forwardRef < SVGSVGElement,
  SearchProps >
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
            d="M16.02 30.85a10.485 10.485 0 0 1 4.988-17.679l-.57-2.448a13 13 0 0 0-6.03 3.258 13 13 0 0 0-.153 18.658z"
          />
          <path
            fill={color}
            fillRule="evenodd"
            d="M23 41c9.941 0 18-8.059 18-18S32.941 5 23 5 5 13.059 5 23s8.059 18 18 18m0-3c8.284 0 15-6.716 15-15S31.284 8 23 8 8 14.716 8 23s6.716 15 15 15M36.397 38.427s.568-.493 1.098-1.023 1.024-1.098 1.024-1.098l5.344 5.344 1.65-1.65L58.24 52.728l-5.657 5.657-12.728-12.728 1.885-1.886zm9.116 5.816-1.415 1.414 8.486 8.485 1.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Search;
