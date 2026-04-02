import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface PlayProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Play = memo(
  forwardRef<SVGSVGElement, PlayProps>((inlineProps, ref) => {
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
          d="m6.395 4.044 11.492 7.742c.15.102.15.326 0 .428L6.395 19.956A.254.254 0 0 1 6 19.743V4.257c0-.205.226-.327.395-.213"
        />
      </svg>
    );
  }),
);

export default Play;
