import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgViewProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgView = memo(
  forwardRef<SVGSVGElement, SvgViewProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgView';
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
          d="m3 12-.906-.424-.198.424.198.424zm18 0 .906.424.198-.424-.198-.424zM3 12l.905.424h.001l.028-.06.103-.2A16.128 16.128 0 0 1 6.104 9.16C7.564 7.494 9.563 6 12 6V4C8.71 4 6.208 6.006 4.6 7.84a18 18 0 0 0-2.333 3.394 11 11 0 0 0-.168.333l-.003.006-.001.002c0 .001 0 .002.905.425m9-6c2.437 0 4.436 1.494 5.896 3.16a16 16 0 0 1 2.17 3.205l.023.048.005.01v.002-.001L21 12l.906-.424v-.001l-.002-.002-.003-.006-.01-.02a7 7 0 0 0-.158-.313A18.13 18.13 0 0 0 19.4 7.84C17.793 6.006 15.29 4 12 4zm9 6-.906-.424-.005.01-.023.05-.103.2a16.13 16.13 0 0 1-2.067 3.005C16.436 16.506 14.437 18 12 18v2c3.29 0 5.792-2.006 7.4-3.84a18 18 0 0 0 2.333-3.394 11 11 0 0 0 .168-.333l.003-.006.001-.002c0-.001 0-.002-.905-.425m-9 6c-2.437 0-4.436-1.494-5.896-3.16a16 16 0 0 1-2.17-3.205l-.028-.058v-.002.001L3 12l-.906.424v.001l.002.002.003.006.043.09q.043.087.125.243A18.124 18.124 0 0 0 4.6 16.16C6.207 17.994 8.71 20 12 20zm2-6a2 2 0 0 1-2 2v2a4 4 0 0 0 4-4zm-2 2a2 2 0 0 1-2-2H8a4 4 0 0 0 4 4zm-2-2a2 2 0 0 1 2-2V8a4 4 0 0 0-4 4zm2-2a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4z"
        />
      </svg>
    );
  }),
);

export default SvgView;
