import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgGavelProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgGavel = memo(
  forwardRef<SVGSVGElement, SvgGavelProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgGavel';
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
          d="m20.414 8.583-7-6.997-2.439 2.44a1.49 1.49 0 0 0-.297 1.68L5.706 10.68a1.49 1.49 0 0 0-1.68.298l-2.44 2.44 6.999 6.997 2.44-2.44a1.49 1.49 0 0 0 .297-1.68l.596-.596q.04.044.083.087l5.334 5.248a2 2 0 0 0 2.784.02l.837-.8a2 2 0 0 0 .044-2.85l-5.291-5.37-.065-.063.65-.649a1.49 1.49 0 0 0 1.68-.298zm-6.999-4.169 4.17 4.17-.727.727a1.49 1.49 0 0 0-1.68.298L9.61 15.177a1.49 1.49 0 0 0-.297 1.68l-.728.729-4.17-4.17.727-.727a1.49 1.49 0 0 0 1.68-.298l5.568-5.568a1.49 1.49 0 0 0 .297-1.68zm.869 9.022 5.29 5.371-.837.8-5.334-5.248z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgGavel;
