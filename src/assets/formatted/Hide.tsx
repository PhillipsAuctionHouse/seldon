import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgHideProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgHide = memo(
  forwardRef < SVGSVGElement,
  SvgHideProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgHide';
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
            d="M3.5 2.086 2.086 3.5l3.406 3.406c-.322.31-.62.625-.892.935a18 18 0 0 0-2.333 3.393 11 11 0 0 0-.159.313l-.01.02-.002.006-.001.002s0 .002.905.425l-.906-.424-.198.424.199.425v.002l.004.006.01.02a8 8 0 0 0 .158.313A18.123 18.123 0 0 0 4.6 16.16C6.207 17.994 8.71 20 12 20c1.93 0 3.588-.69 4.954-1.631l3.546 3.545 1.414-1.414L10.631 9.217a1 1 0 0 0-.09-.09zm12.011 14.84-1.48-1.48a4 4 0 0 1-5.478-5.478L6.907 8.321q-.424.406-.802.838A16 16 0 0 0 4.125 12a16.124 16.124 0 0 0 1.98 2.84C7.564 16.507 9.562 18 12 18c1.3 0 2.476-.425 3.511-1.075M10 12q.001-.27.068-.518l2.45 2.45A2 2 0 0 1 10 12"
            clipRule="evenodd"
          />
          <path
            fill={color}
            d="M18.062 14.648A16.3 16.3 0 0 0 19.875 12a16.13 16.13 0 0 0-1.98-2.84C16.436 7.493 14.438 6 12 6c-.771 0-1.499.15-2.179.407L8.303 4.889C9.393 4.349 10.628 4 12 4c3.29 0 5.792 2.006 7.4 3.84a18 18 0 0 1 2.333 3.394 11 11 0 0 1 .159.313l.01.02.002.006.001.002s0 .002-.905.425l.906-.424.198.424-.198.424-.002.003-.003.006-.01.02-.033.07q-.043.087-.125.243a18.187 18.187 0 0 1-2.253 3.3z"
          />
        </svg>
      );
    }),
);

export default SvgHide;
