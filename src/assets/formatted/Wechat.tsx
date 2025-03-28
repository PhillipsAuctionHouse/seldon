import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgWechatProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgWechat = memo(
  forwardRef((props: SvgWechatProps, ref: Ref<SVGSVGElement>) => {
    const { height, width } = props;
    const title = 'SvgWechat';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 30 27"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#51C332"
          d="M20.625 7.864c.568 0 1.123.047 1.67.115C21.306 3.632 16.74.344 11.25.344 5.036.344 0 4.553 0 9.744c0 2.993 1.684 5.648 4.296 7.366l-1.484 2.974 4.04-1.735c.867.308 1.768.562 2.73.68a8 8 0 0 1-.207-1.765c0-5.183 5.046-9.4 11.25-9.4M15 4.574c.777 0 1.406.631 1.406 1.41s-.63 1.41-1.406 1.41a1.41 1.41 0 0 1-1.406-1.41c0-.779.63-1.41 1.406-1.41m-7.5 2.82a1.41 1.41 0 0 1-1.406-1.41c0-.779.63-1.41 1.406-1.41.777 0 1.406.631 1.406 1.41s-.63 1.41-1.406 1.41"
        />
        <path
          fill="#51C332"
          d="M30 17.264c0-4.153-4.198-7.52-9.375-7.52s-9.375 3.367-9.375 7.52 4.198 7.52 9.375 7.52c.851 0 1.661-.12 2.447-.29l5.053 2.17-1.748-3.502C28.567 21.786 30 19.669 30 17.264m-12.188-.47a1.41 1.41 0 0 1-1.406-1.41c0-.779.63-1.41 1.407-1.41.776 0 1.406.631 1.406 1.41s-.63 1.41-1.407 1.41m5.625 0a1.41 1.41 0 0 1-1.406-1.41c0-.779.63-1.41 1.406-1.41.777 0 1.407.631 1.407 1.41s-.63 1.41-1.407 1.41"
        />
      </svg>
    );
  }),
);

export default SvgWechat;
