import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgFacebookProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgFacebook = memo(
  forwardRef < SVGSVGElement,
  SvgFacebookProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgFacebook';
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
          <g clipPath="url(#Facebook_svg__a)">
            <path
              fill={color}
              d="M13.105 9.06V7.59c0-.735.102-1.155 1.225-1.155h1.428V3.6H13.41c-2.856 0-3.775 1.365-3.775 3.78v1.785H7.8V12h1.734v8.4h3.571V12h2.347l.306-2.94z"
            />
          </g>
          <defs>
            <clipPath id="Facebook_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgFacebook;
