import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface CreditCardProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const CreditCard = memo(
  forwardRef < SVGSVGElement,
  CreditCardProps >
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
          <path fill={color} d="M24 36H10v3h14zM17 42h-7v3h7z" />
          <path fill={color} fillRule="evenodd" d="M42 35h12v10H42zm9 3h-6v4h6z" clipRule="evenodd" />
          <path fill={color} fillRule="evenodd" d="M4 14h56v36H4zm3 3h50v3H7zm0 6v24h50V23z" clipRule="evenodd" />
        </svg>
      );
    }),
);

export default CreditCard;
