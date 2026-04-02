import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface AdminPlayProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const AdminPlay = memo(
  forwardRef<SVGSVGElement, AdminPlayProps>((inlineProps, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = inlineProps;
    const titleId = propsTitleId || kebabCase(title || '');
    const hasAccessibleName = Boolean(title || inlineProps['aria-label']);
    const props = hasAccessibleName
      ? inlineProps
      : {
          ...inlineProps,
          'aria-hidden': true,
          role: 'presentation',
        };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 25"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={hasAccessibleName ? titleId : undefined}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <mask
          id="AdminPlay_svg__a"
          width={24}
          height={25}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <path fill="#D9D9D9" d="M0 .625h24v24H0z" />
        </mask>
        <g mask="url(#AdminPlay_svg__a)">
          <path fill={color || '#000'} d="M8 19.625v-14l11 7z" />
        </g>
      </svg>
    );
  }),
);

export default AdminPlay;
