import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgPhillipsAppIconProps {
  color?: string;
  height?: number | string;
  width?: number | string;
}

const SvgPhillipsAppIcon = memo(
  forwardRef((props: SvgPhillipsAppIconProps, ref: Ref<SVGSVGElement>) => {
    const { height, width } = props;
    const title = 'SvgPhillipsAppIcon';
    const titleId = kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 60 61"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect width={59} height={59} x={0.5} y={1.095} fill="#fff" rx={13.5} />
        <rect width={59} height={59} x={0.5} y={1.095} stroke="#ECEAE7" rx={13.5} />
        <path
          fill="#000"
          d="M25.905 28.061h-.835v5.124h4.236v-.806h-3.4V28.06Zm-5.138 5.124h.835v-5.124h-.835zm-7.628-5.124h-.82v5.124h.812v-1.852h3.348v1.852h.82v-5.124h-.82v2.488h-3.348zm25.339 5.124h.835v-5.124h-.835zM50.04 31.92l-.282.755c.657.374 1.776.616 2.566.616 1.462 0 2.379-.575 2.379-1.584 0-1.187-1.126-1.396-2.349-1.516-.783-.075-1.603-.134-1.603-.702 0-.44.395-.724 1.446-.724.627 0 1.35.141 1.954.396l.261-.762a5.8 5.8 0 0 0-2.2-.441c-1.476 0-2.311.582-2.311 1.531 0 1.195 1.14 1.404 2.349 1.516.783.075 1.595.142 1.595.703 0 .455-.41.776-1.513.776-.679 0-1.616-.203-2.292-.564m-17.43-3.859h-.835v5.124h4.235v-.806h-3.4V28.06Zm13.035 0h-2.856v5.124h.835V31.49h2.02c1.194 0 1.88-.717 1.88-1.718 0-.994-.671-1.71-1.88-1.71Zm-.097 2.622h-1.924v-1.815h1.924c.723 0 1.126.336 1.126.904s-.388.911-1.126.911m-37.65-2.622H5.04v5.124h.835V31.49h2.02c1.194 0 1.88-.717 1.88-1.718 0-.994-.671-1.71-1.88-1.71ZM7.8 30.683H5.876v-1.815H7.8c.723 0 1.126.336 1.126.904s-.388.911-1.126.911"
        />
      </svg>
    );
  }),
);

export default SvgPhillipsAppIcon;
