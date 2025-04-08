import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconGreenCircleProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgIconGreenCircle = memo(
  forwardRef < SVGSVGElement,
  SvgIconGreenCircleProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgIconGreenCircle';
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
          <circle cx={4} cy={4} r={4} fill="#0FA915" />
        </svg>
      );
    }),
);

export default SvgIconGreenCircle;
