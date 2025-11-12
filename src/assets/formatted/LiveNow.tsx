import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface LiveNowProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const LiveNow = memo(
  forwardRef<SVGSVGElement, LiveNowProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
          fill={color}
        />
        <path
          d="M4.83925 10.4531C4.31321 9.77593 4 8.92521 4 8.00134C4 7.0765 4.31387 6.22497 4.84089 5.54746L4.12937 4.83594C3.42352 5.69803 3 6.80022 3 8.00134C3 9.20149 3.42284 10.3029 4.12768 11.1647L4.83925 10.4531Z"
          fill={color}
        />
        <path
          d="M11.1591 5.54746L11.8706 4.83594C12.5765 5.69803 13 6.80022 13 8.00134C13 9.20149 12.5772 10.3029 11.8723 11.1647L11.1607 10.4531C11.6868 9.77593 12 8.92521 12 8.00134C12 7.0765 11.6861 6.22497 11.1591 5.54746Z"
          fill={color}
        />
        <path
          d="M2.00146 2.70703C0.755865 4.1175 0 5.97065 0 8.00034C0 10.0291 0.755153 11.8814 1.9997 13.2916L2.70839 12.583C1.64406 11.355 1 9.7529 1 8.00034C1 6.24682 1.64476 4.6439 2.71014 3.4157L2.00146 2.70703Z"
          fill={color}
        />
        <path
          d="M14.0003 13.2916L13.2916 12.583C14.3559 11.355 15 9.7529 15 8.00034C15 6.24682 14.3552 4.6439 13.2899 3.4157L13.9985 2.70703C15.2441 4.1175 16 5.97065 16 8.00034C16 10.0291 15.2448 11.8814 14.0003 13.2916Z"
          fill={color}
        />
      </svg>
    );
  }),
);

export default LiveNow;
