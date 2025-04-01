import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconRedCircleProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgIconRedCircle = memo(
  forwardRef((props: SvgIconRedCircleProps, ref: Ref<SVGSVGElement>) => {
    const { height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgIconRedCircle';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 8"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <circle cx={4} cy={4} r={4} fill="#B40919" />
      </svg>
    );
  }),
);

export default SvgIconRedCircle;
