import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgVolumeMinimumProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgVolumeMinimum = memo(
  forwardRef<SVGSVGElement, SvgVolumeMinimumProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgVolumeMinimum';
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
          d="M12 5h1V2.92l-1.625 1.3zM7 9v1a1 1 0 0 0 .625-.22zM3 9V8a1 1 0 0 0-1 1zm0 6H2a1 1 0 0 0 1 1zm4 0 .625-.78A1 1 0 0 0 7 14zm5 4-.625.78L13 21.08V19zm-.625-14.78-5 4 1.25 1.56 5-4zM7 8H3v2h4zM2 9v6h2V9zm1 7h4v-2H3zm3.375-.22 5 4 1.25-1.56-5-4zM13 19V5h-2v14z"
        />
      </svg>
    );
  }),
);

export default SvgVolumeMinimum;
