import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface MobilePhoneProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const MobilePhone = memo(
  forwardRef < SVGSVGElement,
  MobilePhoneProps >
    ((props, ref) => {
      const { color, height, width, title, titleId: propsTitleId } = props;
      const titleId = propsTitleId || kebabCase(title || '');

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height={height}
          width={width}
          role="img"
          ref={ref}
          aria-labelledby={titleId}
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          <path fill={color} d="M32 12h-6V9h6zM27 55v-3h10v3zM37 12h-3V9h3z" />
          <path fill={color} fillRule="evenodd" d="M16 4h32v56H16zm3 3h26v50H19z" clipRule="evenodd" />
        </svg>
      );
    }),
);

export default MobilePhone;
