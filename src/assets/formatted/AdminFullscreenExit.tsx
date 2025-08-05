import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminFullscreenExitProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminFullscreenExit = memo(
  forwardRef<SVGSVGElement, AdminFullscreenExitProps>((props, ref) => {
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
          id="AdminFullscreenExit_svg__a"
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
        <g mask="url(#AdminFullscreenExit_svg__a)">
          <path
            fill={color || '#1C1B1F'}
            d="M6 21.625v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zm-13-13v-2h3v-3h2v5zm13 0v-5h2v3h3v2z"
          />
        </g>
      </svg>
    );
  }),
);

export default AdminFullscreenExit;
