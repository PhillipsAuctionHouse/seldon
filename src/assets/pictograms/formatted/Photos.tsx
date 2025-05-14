import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface PhotosProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Photos = memo(
  forwardRef < SVGSVGElement,
  PhotosProps >
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
          <path fill={color} d="M40.667 20.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M54 4H4v50h50zm-3 3H7v22.572l11.084-14.483L31.486 35.19l10.373-12.047L51 37.77zM7 51V34.508l10.916-14.263 11.682 17.523a2.167 2.167 0 0 0 3.445.212l8.431-9.791L51 43.43V51z"
            clipRule="evenodd"
          />
          <path fill={color} d="M55.5 13.5v3H57V57H14.5v-1.5h-3V60H60V13.5z" />
        </svg>
      );
    }),
);

export default Photos;
