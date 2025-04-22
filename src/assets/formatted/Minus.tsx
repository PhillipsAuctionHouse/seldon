import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgMinusProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgMinus = memo(
  forwardRef((props: SvgMinusProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgMinus';
    const titleId = propsTitleId || kebabCase(title);

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
          d="M4.5 11.893c0-.474.336-.857.75-.857h13.5c.414 0 .75.383.75.857 0 .473-.336.857-.75.857H5.25c-.414 0-.75-.384-.75-.857"
          clipRule="evenodd"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M4.5 11.893c0-.474.336-.857.75-.857h13.5c.414 0 .75.383.75.857 0 .473-.336.857-.75.857H5.25c-.414 0-.75-.384-.75-.857"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgMinus;
