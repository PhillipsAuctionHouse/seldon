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
  forwardRef<SVGSVGElement, SvgFacebookProps>((props, ref) => {
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
        <path
          fill={color}
          d="M14.079 8.5V6.75c0-.875.121-1.375 1.457-1.375h1.7V2h-2.793c-3.4 0-4.494 1.625-4.494 4.5v2.125H7.763V12h2.065v10h4.251V12h2.793l.365-3.5z"
        />
      </svg>
    );
  }),
);

export default SvgFacebook;
