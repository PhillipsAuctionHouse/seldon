import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface LockProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Lock = memo(
  forwardRef<SVGSVGElement, LockProps>((props, ref) => {
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
        <path fill={color} d="M13 17v-3a1 1 0 1 0-2 0v3z" />
        <path
          fill={color}
          fillRule="evenodd"
          d="M12 2a5 5 0 0 0-5 5v1H4v14h16V8h-3V7a5 5 0 0 0-5-5m3 5v1H9V7a3 3 0 1 1 6 0M6 20V10h12v10z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default Lock;
