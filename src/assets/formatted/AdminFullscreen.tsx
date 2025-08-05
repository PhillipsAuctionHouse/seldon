import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminFullscreenProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminFullscreen = memo(
  forwardRef<SVGSVGElement, AdminFullscreenProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 25"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <mask
          id="AdminFullscreen_svg__a"
          width={24}
          height={25}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <path fill={color || '#D9D9D9'} d="M0 .625h24v24H0z" />
        </mask>
        <g mask="url(#AdminFullscreen_svg__a)">
          <path fill={color} d="M3 21.625v-5h2v3h3v2zm13 0v-2h3v-3h2v5zm-13-13v-5h5v2H5v3zm16 0v-3h-3v-2h5v5z" />
        </g>
      </svg>
    );
  }),
);

export default AdminFullscreen;
