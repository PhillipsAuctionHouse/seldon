import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface IconBlueCircleProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const IconBlueCircle = memo(
  forwardRef<SVGSVGElement, IconBlueCircleProps>((props, ref) => {
    const { height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 12 13"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <circle cx={6} cy={6.125} r={6} fill="#0065FC" />
      </svg>
    );
  }),
);

export default IconBlueCircle;
