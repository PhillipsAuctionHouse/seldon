import { Ref, forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SvgIconFooterWechatProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const SvgIconFooterWechat = memo(
  forwardRef((props: SvgIconFooterWechatProps, ref: Ref<SVGSVGElement>) => {
    const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
    const title = propsTitle || 'SvgIconFooterWechat';
    const titleId = propsTitleId || kebabCase(title);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="4 4 24 24"
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
          d="M20.566 12.252c-4.054 0-7.33 2.97-7.33 6.632 0 .566.083 1.13.246 1.668-.205.022-.388.022-.573.022-.86 0-1.7-.13-2.498-.347a.58.58 0 0 0-.533.065L7.483 21.81c-.143.087-.307-.064-.266-.216l.614-2.298c.02-.151-.021-.303-.144-.39-1.76-1.3-2.887-3.25-2.887-5.417C4.8 9.564 8.424 6.4 12.908 6.4c3.993 0 7.31 2.535 7.966 5.852zm-3.85-.954c0-.629-.49-1.148-1.085-1.148-.593 0-1.085.52-1.085 1.148 0 .63.491 1.149 1.085 1.149s1.085-.52 1.085-1.149m-7.616 0c0 .63.49 1.149 1.085 1.149.614 0 1.085-.52 1.085-1.149s-.491-1.148-1.085-1.148-1.085.52-1.085 1.148m11.384 1.582c3.706 0 6.716 2.688 6.716 5.982 0 1.842-.921 3.468-2.356 4.573-.184.13-.245.347-.204.563l.328 1.409c.041.13-.102.239-.204.173l-1.66-.953a.88.88 0 0 0-.573-.065 6.9 6.9 0 0 1-2.027.281c-3.706 0-6.716-2.687-6.716-5.981s2.99-5.981 6.696-5.981m-2.907 5.038a.885.885 0 0 0 1.164-.12 1 1 0 0 0 .2-.317 1.017 1.017 0 0 0-.086-.915.94.94 0 0 0-.414-.36.87.87 0 0 0-.532-.055.9.9 0 0 0-.472.267 1 1 0 0 0-.252.499c-.036.19-.017.385.052.563.07.178.188.33.34.438m4.525 0c.151.107.33.164.512.164.49 0 .92-.433.92-.975 0-.193-.053-.381-.154-.542a.94.94 0 0 0-.414-.359.87.87 0 0 0-.532-.055.9.9 0 0 0-.472.267 1 1 0 0 0-.252.499c-.035.19-.017.385.053.563s.187.33.339.438"
          clipRule="evenodd"
        />
      </svg>
    );
  }),
);

export default SvgIconFooterWechat;
