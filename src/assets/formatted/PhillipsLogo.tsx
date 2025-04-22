import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPhillipsLogoProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgPhillipsLogo = memo(
  forwardRef((props: SvgPhillipsLogoProps, ref: Ref<SVGSVGElement>) => {
    const { height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgPhillipsLogo';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        data-testid="header-logo-svg"
        viewBox="0 0 131 18"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#PhillipsLogo_svg__a)">
          <path
            fill="#000"
            d="M54.817.274h-2.195v13.452H63.75v-2.118h-8.933zm-13.5 13.453h2.195V.274h-2.195zM21.276.274h-2.155v13.452h2.136V8.862h8.796v4.864h2.155V.274h-2.155v6.53h-8.796zm66.572 13.453h2.195V.274h-2.195zm30.382-3.325-.741 1.982c1.725.981 4.664 1.616 6.741 1.616 3.84 0 6.25-1.509 6.25-4.157 0-3.117-2.959-3.667-6.171-3.98-2.057-.197-4.213-.353-4.213-1.843 0-1.158 1.039-1.902 3.802-1.902 1.645 0 3.546.372 5.133 1.04l.685-2.001C127.953.392 125.817 0 123.936 0c-3.878 0-6.073 1.529-6.073 4.02 0 3.137 2.998 3.686 6.171 3.98 2.057.196 4.193.373 4.193 1.844 0 1.196-1.077 2.039-3.977 2.039-1.783 0-4.246-.534-6.02-1.481M72.43.274h-2.194v13.452h11.128v-2.118H72.43zm34.246 0h-7.504v13.452h2.195V9.274h5.309c3.135 0 4.938-1.882 4.938-4.51 0-2.607-1.764-4.49-4.938-4.49m-.255 6.883h-5.054V2.392h5.054c1.9 0 2.958.882 2.958 2.373.001 1.49-1.018 2.392-2.958 2.392M7.503.274H0v13.452h2.194V9.274h5.31c3.134 0 4.936-1.882 4.936-4.51 0-2.607-1.762-4.49-4.937-4.49M7.25 7.157H2.194V2.392H7.25c1.9 0 2.958.882 2.958 2.373 0 1.49-1.019 2.392-2.958 2.392"
            className="PhillipsLogo_svg__phillips-logo"
          />
        </g>
        <defs>
          <clipPath id="PhillipsLogo_svg__a">
            <path fill="#fff" d="M0 0h130.667v14H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }),
);

export default SvgPhillipsLogo;
