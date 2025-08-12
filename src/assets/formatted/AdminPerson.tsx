import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminPersonProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminPerson = memo(
  forwardRef<SVGSVGElement, AdminPersonProps>((props, ref) => {
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
          id="AdminPerson_svg__a"
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
        <g mask="url(#AdminPerson_svg__a)">
          <path
            fill={color || '#1C1B1F'}
            d="M12 12.625q-1.65 0-2.825-1.175T8 8.625 9.175 5.8 12 4.625 14.825 5.8 16 8.625t-1.175 2.825T12 12.625m-8 8v-2.8q0-.85.438-1.562.437-.713 1.162-1.088a14.8 14.8 0 0 1 3.15-1.163 13.8 13.8 0 0 1 3.25-.387q1.65 0 3.25.387 1.6.388 3.15 1.163.724.375 1.163 1.087.437.713.437 1.563v2.8zm2-2h12v-.8a.973.973 0 0 0-.5-.85q-1.35-.675-2.725-1.012a11.6 11.6 0 0 0-5.55 0Q7.85 16.3 6.5 16.975a.97.97 0 0 0-.5.85zm6-8q.825 0 1.412-.588Q14 9.45 14 8.625t-.588-1.412A1.93 1.93 0 0 0 12 6.625q-.825 0-1.412.588A1.93 1.93 0 0 0 10 8.625q0 .825.588 1.412.587.588 1.412.588"
          />
        </g>
      </svg>
    );
  }),
);

export default AdminPerson;
