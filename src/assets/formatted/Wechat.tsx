import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgWechatProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgWechat = memo(
  forwardRef < SVGSVGElement,
  SvgWechatProps >
    ((props, ref) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || 'SvgWechat';
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
          <g clipPath="url(#Wechat_svg__a)">
            <path
              fill={color}
              fillRule="evenodd"
              d="M15.425 9.189c-3.04 0-5.498 2.227-5.498 4.974 0 .425.062.847.185 1.251-.154.017-.292.017-.43.017a7.2 7.2 0 0 1-1.874-.26.44.44 0 0 0-.4.048l-1.796 1.138c-.107.065-.23-.049-.2-.162l.461-1.723c.016-.114-.015-.228-.107-.293-1.321-.975-2.166-2.438-2.166-4.063C3.6 7.173 6.318 4.8 9.681 4.8c2.995 0 5.482 1.902 5.974 4.389zm-2.888-.715c0-.472-.368-.862-.813-.862s-.814.39-.814.862c0 .471.368.861.814.861s.813-.39.813-.861m-5.712 0c0 .471.368.861.814.861.46 0 .814-.39.814-.861 0-.472-.369-.862-.814-.862-.446 0-.814.39-.814.862m8.538 1.186c2.78 0 5.037 2.016 5.037 4.486 0 1.382-.69 2.601-1.767 3.43-.138.098-.184.26-.153.423l.246 1.056c.03.098-.077.18-.153.13l-1.244-.715a.66.66 0 0 0-.43-.049 5.1 5.1 0 0 1-1.52.212c-2.78 0-5.038-2.016-5.038-4.486 0-2.471 2.242-4.487 5.022-4.487m-2.18 3.778a.664.664 0 0 0 .873-.09.73.73 0 0 0 .201-.518.76.76 0 0 0-.116-.406.7.7 0 0 0-.31-.27.66.66 0 0 0-.4-.04.7.7 0 0 0-.353.2.75.75 0 0 0-.19.374.77.77 0 0 0 .04.422c.052.134.14.248.254.328m3.393 0c.114.08.248.124.384.124.369 0 .691-.325.691-.732a.76.76 0 0 0-.116-.406.7.7 0 0 0-.31-.27.66.66 0 0 0-.4-.04.7.7 0 0 0-.353.2.75.75 0 0 0-.19.374.77.77 0 0 0 .04.422c.052.134.14.248.255.328"
              clipRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="Wechat_svg__a">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }),
);

export default SvgWechat;
