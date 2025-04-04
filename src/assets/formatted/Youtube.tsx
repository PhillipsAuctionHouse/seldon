import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgYoutubeProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgYoutube = memo(
  forwardRef((props: SvgYoutubeProps, ref: Ref<SVGSVGElement>) => {
    const { height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgYoutube';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 31 23"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#FF0302"
          fillRule="evenodd"
          d="M28.427 2.5c.465.469.8 1.051.97 1.69.626 2.355.626 7.268.626 7.268s0 4.912-.627 7.268a3.77 3.77 0 0 1-2.652 2.67c-2.346.63-11.72.63-11.72.63s-9.376 0-11.721-.63a3.77 3.77 0 0 1-2.652-2.67C.023 16.37.023 11.458.023 11.458s0-4.913.628-7.268a3.77 3.77 0 0 1 2.652-2.67C5.648.89 15.023.89 15.023.89s9.375 0 11.72.63a3.77 3.77 0 0 1 1.684.98M11.955 6.997v8.922l7.841-4.461-7.84-4.46Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgYoutube;
