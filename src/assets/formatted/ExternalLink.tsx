import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgExternalLinkProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgExternalLink = memo(
  forwardRef<SVGSVGElement, SvgExternalLinkProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgExternalLink';
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
        <path fill={color} d="M15 4h3.586l-6.293 6.293 1.414 1.414L20 5.414V9h2V2h-7z" />
        <path fill={color} d="M3 4v15a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6h-2v6H5V6h6V4z" />
      </svg>
    );
  }),
);

export default SvgExternalLink;
