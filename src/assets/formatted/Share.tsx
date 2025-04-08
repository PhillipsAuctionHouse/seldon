import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgShareProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgShare = memo(
  forwardRef < SVGSVGElement,
  SvgShareProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgShare';
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
          <g fill={color} clipPath="url(#Share_svg__a)">
            <path d="M18.133 6.726 12 1.708 5.867 6.726l1.266 1.548L11 5.11V16h2V5.11l3.867 3.164z" />
            <path d="M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9h-5v2h3v7H6v-7h3v-2z" />
          </g>
          <defs>
            <clipPath id="Share_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgShare;
