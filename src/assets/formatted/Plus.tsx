import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPlusProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgPlus = memo(
  forwardRef<SVGSVGElement, SvgPlusProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgPlus';
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
        <path fill={color} fillRule="evenodd" d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2z" clipRule="evenodd" />
      </svg>
    );
  }),
);

export default SvgPlus;
