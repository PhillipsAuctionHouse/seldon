import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ShippingProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Shipping = memo(
  forwardRef < SVGSVGElement,
  ShippingProps >
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
            d="M6 11h38v13h12.097l3.776 12.578a3 3 0 0 1 .127.863V46H49.981q.02.248.019.5a6.5 6.5 0 1 1-12.981-.5H21.98q.02.248.019.5A6.5 6.5 0 1 1 9.019 46H4v-6h2zm4.022 32a6.5 6.5 0 0 1 5.478-3 6.5 6.5 0 0 1 5.478 3h17.044A6.52 6.52 0 0 1 41 40.498V14H9v29zM57 43h-8.022A6.5 6.5 0 0 0 44 40.019V27h4.5v10.5H57zm-5.5-8.5V27h2.403l2.597 7.5zM23 20H11v3h12zm-6 6h-6v3h6zm26.5 24a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M19 46.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Shipping;
