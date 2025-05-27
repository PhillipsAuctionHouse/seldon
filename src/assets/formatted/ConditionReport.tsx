import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ConditionReportProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const ConditionReport = memo(
  forwardRef<SVGSVGElement, ConditionReportProps>((props, ref) => {
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
        <path
          fill={color}
          fillRule="evenodd"
          d="M6 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16H6a4 4 0 0 1-4-4v-6h4zm2 14h12V5H8zm-2 0v-6H4v4a2 2 0 0 0 2 2m10-9h-6V8h6zm2 5h-8v-2h8z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default ConditionReport;
