import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgDownloadDocProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgDownloadDoc = memo(
  forwardRef<SVGSVGElement, SvgDownloadDocProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgDownloadDoc';
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
        <path fill={color} d="M18.133 11.274 12 16.292l-6.133-5.018 1.266-1.548L11 12.89V2h2v10.89l3.867-3.164z" />
        <path fill={color} d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6v-4z" />
      </svg>
    );
  }),
);

export default SvgDownloadDoc;
