import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconFooterInstagramProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgIconFooterInstagram = memo(
  forwardRef((props: SvgIconFooterInstagramProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgIconFooterInstagram';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect width={29} height={29} x={1.5} y={1.5} stroke={color} strokeWidth={3} rx={8.5} />
        <circle cx={16} cy={16} r={6.75} stroke={color} strokeWidth={2.5} />
        <circle cx={25} cy={8} r={2} fill={color} />
      </svg>
    );
  }),
);

export default SvgIconFooterInstagram;
