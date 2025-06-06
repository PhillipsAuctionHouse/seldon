import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ShareProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Share = memo(
  forwardRef<SVGSVGElement, ShareProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

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
        <path fill={color} d="M18.133 6.726 12 1.708 5.867 6.726l1.266 1.548L11 5.11V16h2V5.11l3.867 3.164z" />
        <path fill={color} d="M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9h-5v2h3v7H6v-7h3v-2z" />
      </svg>
    );
  }),
);

export default Share;
