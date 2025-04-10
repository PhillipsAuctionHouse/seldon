import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgConditionReportProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgConditionReport = memo(
  forwardRef<SVGSVGElement, SvgConditionReportProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgConditionReport';
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
          stroke={color}
          strokeWidth={2}
          d="M7 20h14V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1zm0 0H6a3 3 0 0 1-3-3v-5h4zm3-6h8m-8-5h6"
        />
      </svg>
    );
  }),
);

export default SvgConditionReport;
