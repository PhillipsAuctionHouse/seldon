import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminGavelProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminGavel = memo(
  forwardRef<SVGSVGElement, AdminGavelProps>((props, ref) => {
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
          id="AdminGavel_svg__a"
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
        <g mask="url(#AdminGavel_svg__a)">
          <path
            fill={color || '#1C1B1F'}
            d="M4 21.625v-2h12v2zm5.65-4.85L4 11.125l2.1-2.15 5.7 5.65zm6.35-6.35-5.65-5.7 2.15-2.1 5.65 5.65zm4.6 10.2L7.55 7.575l1.4-1.4L22 19.225z"
          />
        </g>
      </svg>
    );
  }),
);

export default AdminGavel;
