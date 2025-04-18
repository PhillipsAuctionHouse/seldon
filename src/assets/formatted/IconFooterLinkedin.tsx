import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconFooterLinkedinProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgIconFooterLinkedin = memo(
  forwardRef((props: SvgIconFooterLinkedinProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgIconFooterLinkedin';
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
          d="M23.185 14.566V23.2h-4.72v-8.154c0-2.079-.762-3.358-2.437-3.358-1.066 0-2.132.64-2.437 1.759-.152.48-.152.799-.152 1.279V23.2h-4.72V8.17h4.72v2.079c.914-1.6 2.436-2.558 4.264-2.558 3.045 0 5.482 2.238 5.482 6.875M3.54.816C2.171.655.952 1.774.8 3.213v.16c0 1.438 1.066 2.558 2.436 2.558h.153c1.37.16 2.588-.96 2.74-2.399v-.16c0-1.439-.913-2.558-2.283-2.558zM1.105 23.2h4.72V8.17h-4.72z"
        />
      </svg>
    );
  }),
);

export default SvgIconFooterLinkedin;
