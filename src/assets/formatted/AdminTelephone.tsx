import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminTelephoneProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminTelephone = memo(
  forwardRef<SVGSVGElement, AdminTelephoneProps>((props, ref) => {
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
          id="AdminTelephone_svg__a"
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
        <g mask="url(#AdminTelephone_svg__a)">
          <path
            fill={color || '#1C1B1F'}
            d="M19.95 21.625q-3.125 0-6.175-1.363T8.225 16.4t-3.862-5.55T3 4.675q0-.45.3-.75t.75-.3H8.1a.93.93 0 0 1 .625.237.9.9 0 0 1 .325.563l.65 3.5q.05.4-.025.675t-.275.475l-2.425 2.45q.5.926 1.188 1.787.687.863 1.512 1.663.775.775 1.625 1.438.85.661 1.8 1.212l2.35-2.35a1.4 1.4 0 0 1 .588-.338 1.6 1.6 0 0 1 .712-.062l3.45.7q.35.1.575.363a.88.88 0 0 1 .225.587v4.05q0 .45-.3.75t-.75.3m-13.925-12 1.65-1.65-.425-2.35H5.025q.125 1.024.35 2.025t.65 1.975m8.95 8.95q.976.424 1.987.675 1.013.25 2.038.325v-2.2l-2.35-.475z"
          />
        </g>
      </svg>
    );
  }),
);

export default AdminTelephone;
