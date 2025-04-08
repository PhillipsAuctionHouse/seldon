import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgUploadDocProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgUploadDoc = memo(
  forwardRef < SVGSVGElement,
  SvgUploadDocProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgUploadDoc';
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
          <g fill={color} clipPath="url(#Upload_Doc_svg__a)">
            <path d="M4 8V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4h-2V4H6v4z" />
            <path d="M18.133 12.726 12 7.708l-6.133 5.018 1.266 1.548L11 11.11V22h2V11.11l3.867 3.164z" />
          </g>
          <defs>
            <clipPath id="Upload_Doc_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgUploadDoc;
