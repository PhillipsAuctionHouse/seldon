import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPlusProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgPlus = memo(
  forwardRef((props: SvgPlusProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgPlus';
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
          fill="currentColor"
          fillRule="evenodd"
          d="M12.107 4.5c.474 0 .857.336.857.75v13.5c0 .414-.383.75-.857.75-.473 0-.857-.336-.857-.75V5.25c0-.414.384-.75.857-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgPlus;
