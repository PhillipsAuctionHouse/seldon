import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SubmitProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Submit = memo(
  forwardRef < SVGSVGElement,
  SubmitProps >
    ((props, ref) => {
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
          <path fill={color} d="m40.07 23 2.122 2.121-7.07 7.071L33 30.072z" />
          <path
            fill={color}
            fillRule="evenodd"
            d="M2.824 29.078 56.93 7.096l-8.964 52.662-11.069-11.99L27.5 57.792V38.051zM30.5 40.837v9.37l4.358-4.649zM11.176 28.922l18.184 6.613c.325.118.617.313.852.567l15.821 17.14 7.036-41.339z"
            clipRule="evenodd"
          />
        </svg>
      );
    }),
);

export default Submit;
