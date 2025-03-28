import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconFooterFacebookProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgIconFooterFacebook = memo(
  forwardRef((props: SvgIconFooterFacebookProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgIconFooterFacebook';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 40 40"
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
          d="M21.842 15.1v-2.45c0-1.225.17-1.925 2.04-1.925h2.381V6h-3.91c-4.762 0-6.292 2.275-6.292 6.3v2.975H13V20h2.89v14h5.952V20h3.911l.51-4.9z"
        />
      </svg>
    );
  }),
);

export default SvgIconFooterFacebook;
