import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgGavelActiveProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgGavelActive = memo(
  forwardRef < SVGSVGElement,
  SvgGavelActiveProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgGavelActive';
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
          <g clipPath="url(#Gavel-Active_svg__a)">
            <path
              fill={color}
              fillRule="evenodd"
              d="m20.414 8.583-7-6.997-2.439 2.44a1.49 1.49 0 0 0-.297 1.68L5.706 10.68a1.49 1.49 0 0 0-1.68.298l-2.44 2.44 6.999 6.997 2.44-2.44a1.49 1.49 0 0 0 .297-1.68l.596-.596q.04.044.083.087l5.334 5.248a2 2 0 0 0 2.784.02l.837-.8a2 2 0 0 0 .044-2.85l-5.291-5.37-.065-.063.65-.649a1.49 1.49 0 0 0 1.68-.298zm-.84 10.224-5.29-5.37-.88.922 5.334 5.248z"
              clipRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="Gavel-Active_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgGavelActive;
