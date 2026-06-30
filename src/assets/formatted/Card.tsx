import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface CardProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Card = memo(
  forwardRef<SVGSVGElement, CardProps>((inlineProps, ref) => {
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
        <path
          fill={color}
          fillRule="evenodd"
          d="M21 17H3V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zm-2-2H5V5h14z"
          clipRule="evenodd"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M3 15h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm2 2h14v2H5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default Card;
