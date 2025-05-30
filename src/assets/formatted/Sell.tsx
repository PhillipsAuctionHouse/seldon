import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SellProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Sell = memo(
  forwardRef<SVGSVGElement, SellProps>((props, ref) => {
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
        <path fill={color} d="M7.414 10.243a2 2 0 1 0 2.829-2.829 2 2 0 0 0-2.829 2.829" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M2 2v8.352a2 2 0 0 0 .602 1.43l10.9 10.653 8.891-9.653L11.943 2.57A2 2 0 0 0 10.547 2zm2 8.352V4h6.546l9.06 8.855-6.179 6.71z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default Sell;
