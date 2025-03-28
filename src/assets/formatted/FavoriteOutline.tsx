import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFavoriteOutlineProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgFavoriteOutline = memo(
  forwardRef((props: SvgFavoriteOutlineProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgFavoriteOutline';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 16"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#favoriteOutline_svg__a)">
          <path
            fill={color}
            fillRule="evenodd"
            d="M8.011 2.726c.464.352.739.674.739.674s.275-.322.739-.674c.992-.753 2.848-1.64 4.707.22 2.729 2.729.33 5.323.33 5.323l-5.41 5.836c-.171.185-.257.277-.366.277-.11 0-.195-.092-.367-.277l-5.41-5.836s-2.398-2.594.33-5.323c1.86-1.86 3.715-.973 4.708-.22M8.75 4.94l-.758-.888a1 1 0 0 0-.08-.085 4 4 0 0 0-.281-.263 4.1 4.1 0 0 0-.988-.64c-.391-.174-.797-.261-1.205-.206-.394.052-.88.249-1.427.796-1.095 1.095-1.104 2.053-.928 2.724a3.2 3.2 0 0 0 .622 1.21l.007.007 5.038 5.434 5.039-5.434.005-.007.046-.055a3.232 3.232 0 0 0 .577-1.154c.175-.672.168-1.63-.928-2.725-.547-.547-1.033-.744-1.427-.796-.408-.055-.814.032-1.205.206a4.2 4.2 0 0 0-.988.64 4 4 0 0 0-.36.348z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="favoriteOutline_svg__a">
            <path fill="#fff" d="M.75 0h16v16h-16z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgFavoriteOutline;
