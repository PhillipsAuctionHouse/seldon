import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface PhoneProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Phone = memo(
  forwardRef < SVGSVGElement,
  PhoneProps >
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
          <path
            fill={color}
            fillRule="evenodd"
            d="M7 4v15h12.5v-5.684h25V19H57V4zm3 12V7h44v9h-6.5v-5.684h-31V16z"
            clipRule="evenodd"
          />
          <path fill={color} d="M32 39a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M43 42c0 1.152-.177 2.263-.505 3.306l2.067 1.194-1.5 2.598-1.858-1.072A10.99 10.99 0 0 1 32 53c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11m-3 0a8 8 0 0 1-.193 1.755L38.5 43 37 45.598l1.6.924A8 8 0 1 1 40 42"
            clipRule="evenodd"
          />
          <path
            fill={color}
            fillRule="evenodd"
            d="M25 18h3v6h8v-6h3v6h12.252L55 60H9l4.089-36H25zM12.36 57l3.407-30h32.781l3.123 30z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Phone;
