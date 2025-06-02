import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface LinkedInProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const LinkedIn = memo(
  forwardRef<SVGSVGElement, LinkedInProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

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
          d="M22 14.29V22h-4.218v-7.28c0-1.857-.68-2.999-2.177-2.999-.952 0-1.904.571-2.176 1.57-.136.429-.136.714-.136 1.143V22H9.075V8.58h4.218v1.857c.816-1.428 2.176-2.285 3.809-2.285 2.721 0 4.898 1.999 4.898 6.139M4.449 2.015C3.224 1.87 2.136 2.87 2 4.155v.143c0 1.285.952 2.284 2.177 2.284h.136c1.224.143 2.313-.857 2.449-2.142v-.142c0-1.285-.816-2.284-2.04-2.284zM2.272 22H6.49V8.58H2.272z"
        />
      </svg>
    );
  }),
);

export default LinkedIn;
