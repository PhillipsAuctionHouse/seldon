import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgTwitterXProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgTwitterX = memo(
  forwardRef<SVGSVGElement, SvgTwitterXProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgTwitterX';
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
          d="m13.748 10.864 6.255-7.114H18.52l-5.43 6.177L8.753 3.75H3.75l6.559 9.34-6.559 7.46h1.482l5.735-6.523 4.58 6.523h5.003zm-2.03 2.308-.664-.93-5.288-7.4h2.277l4.267 5.972.664.93 5.547 7.764h-2.276z"
        />
      </svg>
    );
  }),
);

export default SvgTwitterX;
