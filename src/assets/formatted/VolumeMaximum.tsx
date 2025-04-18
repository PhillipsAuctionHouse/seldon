import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgVolumeMaximumProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgVolumeMaximum = memo(
  forwardRef<SVGSVGElement, SvgVolumeMaximumProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgVolumeMaximum';
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
          d="M12 5h1V2.92l-1.625 1.3zM7 9v1a1 1 0 0 0 .625-.22zM3 9V8a1 1 0 0 0-1 1zm0 6H2a1 1 0 0 0 1 1zm4 0 .625-.78A1 1 0 0 0 7 14zm5 4-.625.78L13 21.08V19zm6.607-14.764-.707-.708-1.414 1.414.707.707zm-1.414 14.14-.707.707 1.414 1.414.707-.707zm-1.116-10.61-.707-.708-1.414 1.414.707.708zm-1.414 7.07-.707.707 1.414 1.414.707-.707zM11.375 4.218l-5 4 1.25 1.562 5-4zM7 8H3v2h4zM2 9v6h2V9zm1 7h4v-2H3zm3.375-.22 5 4 1.25-1.56-5-4zM13 19V5h-2v14zm4.193-13.35a9 9 0 0 1 2.635 6.362h2a11 11 0 0 0-3.22-7.776zm2.635 6.362a9 9 0 0 1-2.635 6.363l1.414 1.415a11 11 0 0 0 3.221-7.777zM14.663 9.18a4 4 0 0 1 1.171 2.828h2a6 6 0 0 0-1.757-4.242zm1.171 2.828a4 4 0 0 1-1.171 2.828l1.414 1.414a6 6 0 0 0 1.757-4.242z"
        />
      </svg>
    );
  }),
);

export default SvgVolumeMaximum;
