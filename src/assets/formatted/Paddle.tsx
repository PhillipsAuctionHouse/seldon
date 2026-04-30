import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface PaddleProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Paddle = memo(
  forwardRef<SVGSVGElement, PaddleProps>((inlineProps, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = inlineProps;
    const titleId = propsTitleId || kebabCase(title || '');
    const hasAccessibleName = Boolean(title || inlineProps['aria-label']);
    const props = hasAccessibleName
      ? inlineProps
      : {
          ...inlineProps,
          'aria-hidden': true,
          role: 'presentation',
        };

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
        <path fill="#fff" d="M0 0h24v24H0z" />
        <path
          stroke={color}
          strokeWidth={2}
          d="M12 3c1.7 0 3.483.638 4.83 1.704C18.17 5.768 19 7.187 19 8.74c0 1.554-.83 2.978-2.173 4.047C15.48 13.858 13.698 14.5 12 14.5c-1.7 0-3.482-.64-4.828-1.708C5.829 11.726 5 10.304 5 8.75s.829-2.976 2.172-4.042C8.518 3.639 10.3 3 12 3Z"
        />
        <path fill={color} d="M13 15v5.5l1 1.5h-4l1-1.5V15z" />
      </svg>
    );
  }),
);

export default Paddle;
