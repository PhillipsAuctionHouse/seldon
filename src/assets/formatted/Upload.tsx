import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgUploadProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgUpload = memo(
  forwardRef<SVGSVGElement, SvgUploadProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgUpload';
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
        <path fill={color} d="M4 8V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4h-2V4H6v4z" />
        <path fill={color} d="M18.133 12.726 12 7.708l-6.133 5.018 1.266 1.548L11 11.11V22h2V11.11l3.867 3.164z" />
      </svg>
    );
  }),
);

export default SvgUpload;
