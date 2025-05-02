import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgBagProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgBag = memo(
  forwardRef<SVGSVGElement, SvgBagProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgBag';
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
          fillRule="evenodd"
          d="M6.956 8c0-2.761 2.258-5 5.044-5s5.044 2.239 5.044 5h3.954l.995 11.834A2.007 2.007 0 0 1 19.983 22H4.017c-1.18 0-2.109-1-2.01-2.166L3.001 8zm0 2v2h2.018v-2h6.052v2h2.018v-2h2.098l.84 10H4.018l.84-10zm8.07-2H8.974c0-1.657 1.355-3 3.026-3s3.026 1.343 3.026 3"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgBag;
