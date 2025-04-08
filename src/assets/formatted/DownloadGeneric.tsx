import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgDownloadGenericProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgDownloadGeneric = memo(
  forwardRef<SVGSVGElement, SvgDownloadGenericProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgDownloadGeneric';
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
        <g fill={color} clipPath="url(#Download_Generic_svg__a)">
          <path d="M18.133 11.274 12 16.292l-6.133-5.018 1.266-1.548L11 12.89V2h2v10.89l3.867-3.164z" />
          <path d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6v-4z" />
        </g>
        <defs>
          <clipPath id="Download_Generic_svg__a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgDownloadGeneric;
