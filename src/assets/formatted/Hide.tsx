import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgHideProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgHide = memo(
  forwardRef<SVGSVGElement, SvgHideProps>((props, ref) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgHide';
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
          d="m3.587 2-1.4 1.426L5.56 6.862c-.32.312-.614.63-.883.943a18.3 18.3 0 0 0-2.433 3.668l-.033.07-.01.02-.002.006-.001.002s-.001.002.896.429l-.897-.427L2 12l.197.429v.002l.004.006.009.02a7 7 0 0 0 .157.316 18.276 18.276 0 0 0 2.31 3.422C6.267 18.045 8.743 20.07 12 20.07c1.91 0 3.552-.696 4.904-1.645L20.413 22l1.4-1.427-11.168-11.38a1 1 0 0 0-.09-.091zm11.888 14.968-1.464-1.492a3.9 3.9 0 0 1-2.011.559c-2.186 0-3.959-1.807-3.959-4.035 0-.748.2-1.449.548-2.05L6.96 8.29q-.42.41-.794.846A16.3 16.3 0 0 0 4.206 12a16.262 16.262 0 0 0 1.959 2.865c1.445 1.68 3.423 3.187 5.835 3.187 1.287 0 2.45-.429 3.475-1.084M10.021 12q0-.271.066-.523l2.426 2.472a2 2 0 0 1-.513.068c-1.093 0-1.98-.903-1.98-2.017"
          clipRule="evenodd"
        />
        <path
          fill={color}
          d="M18 14.67A16.4 16.4 0 0 0 19.794 12a16.26 16.26 0 0 0-1.959-2.865C16.39 7.455 14.412 5.948 12 5.948a6 6 0 0 0-2.156.41L8.34 4.828C9.42 4.282 10.642 3.93 12 3.93c3.256 0 5.732 2.024 7.324 3.874a18.3 18.3 0 0 1 2.433 3.668l.033.07.01.02.002.006.001.002s.001.002-.896.429l.897-.427L22 12l-.196.428-.002.003-.003.006-.009.02a10 10 0 0 1-.157.316 18.338 18.338 0 0 1-2.23 3.329z"
        />
      </svg>
    );
  }),
);

export default SvgHide;
