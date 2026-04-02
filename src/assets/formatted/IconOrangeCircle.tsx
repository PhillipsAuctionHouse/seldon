import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface IconOrangeCircleProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const IconOrangeCircle = memo(
  forwardRef<SVGSVGElement, IconOrangeCircleProps>((inlineProps, ref) => {
    const { height, width, title, titleId: propsTitleId } = inlineProps;
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
        viewBox="0 0 8 8"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <circle cx={4} cy={4} r={4} fill="#FF7B00" />
      </svg>
    );
  }),
);

export default IconOrangeCircle;
