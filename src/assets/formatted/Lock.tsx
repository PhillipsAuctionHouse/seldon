import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgLockProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgLock = memo(
  forwardRef((props: SvgLockProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width } = props;
    const title = 'SvgLock';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
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
          d="M16 18a2 2 0 0 0-2 2v1.675c0 .215.035.429.103.633.607 1.823 3.187 1.823 3.794 0 .068-.204.103-.418.103-.633V20a2 2 0 0 0-2-2"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M9 9v4.126c-1.725.444-3 2.01-3 3.874v8a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-8a4 4 0 0 0-3-3.874V9c0-3.144-2.832-6-7-6S9 5.856 9 9m7-4c-3.256 0-5 2.144-5 4v4h10V9c0-1.856-1.744-4-5-4m6 10H10a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgLock;
