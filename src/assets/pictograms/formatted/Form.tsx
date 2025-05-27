import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface FormProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Form = memo(
  forwardRef<SVGSVGElement, FormProps>((props, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = props;
    const titleId = propsTitleId || kebabCase(title || '');

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} fillRule="evenodd" d="M19 39v10h26V39zm23 3H22v4h20z" clipRule="evenodd" />
        <path fill={color} d="M19 16h26v3H19zM19 22h26v3H19zM39 28h6v3h-6zM19 28h16v3H19z" />
        <path fill={color} fillRule="evenodd" d="M10 4v56h44V4zm41 3H13v50h38z" clipRule="evenodd" />
      </svg>
    );
  }),
);

export default Form;
