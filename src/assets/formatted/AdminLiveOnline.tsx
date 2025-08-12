import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminLiveOnlineProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminLiveOnline = memo(
  forwardRef<SVGSVGElement, AdminLiveOnlineProps>((props, ref) => {
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
          id="AdminLiveOnline_svg__a"
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
        <g mask="url(#AdminLiveOnline_svg__a)">
          <path
            fill={color || '#1C1B1F'}
            d="M2 20.625v-2h10v2zm3-3q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 15.625v-9q0-.824.587-1.412A1.93 1.93 0 0 1 5 4.625h14q.824 0 1.413.588Q21 5.8 21 6.625H5v9h7v2zm15 1v-8h-4v8zm-4.5 2q-.625 0-1.062-.437A1.45 1.45 0 0 1 14 19.125v-9q0-.625.438-1.062a1.45 1.45 0 0 1 1.062-.438h5q.625 0 1.063.438.437.436.437 1.062v9q0 .625-.437 1.063a1.45 1.45 0 0 1-1.063.437zm2.5-7.5a.7.7 0 0 0 .538-.225.74.74 0 0 0 .212-.525.73.73 0 0 0-.75-.75.74.74 0 0 0-.525.213.7.7 0 0 0-.225.537q0 .3.225.525a.72.72 0 0 0 .525.225"
          />
        </g>
      </svg>
    );
  }),
);

export default AdminLiveOnline;
