import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface ImageUnavailableProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const ImageUnavailable = memo(
  forwardRef<SVGSVGElement, ImageUnavailableProps>((inlineProps, ref) => {
    const { color, height, width, title, titleId: propsTitleId } = inlineProps;
    const titleId = propsTitleId || kebabCase(title || '');
    const hasAccessibleName = Boolean(title || inlineProps['aria-label']);
    const props = hasAccessibleName
      ? inlineProps
      : {
          ...inlineProps,
          'aria-hidden': true,
          role: 'presentation',
        };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 152 39"
        height={height}
        width={width}
        role="img"
        ref={ref}
        aria-labelledby={hasAccessibleName ? titleId : undefined}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill={color || 'black'}
          fillOpacity={0.25}
          d="M140.525 38.316V24.49h11.376v2.173h-9.105v3.555h8.809v2.173h-8.809v3.752H152v2.173zM126.673 38.316V24.49h2.271v11.653h9.204v2.173zM111.504 38.316V24.49h7.979c2.785 0 4.375 1.521 4.375 3.842 0 1.373-.691 2.39-1.955 2.923 1.52.504 2.35 1.61 2.35 3.13 0 2.38-1.629 3.93-4.493 3.93zm8.078-2.173c1.501 0 2.34-.7 2.34-1.876s-.839-1.876-2.34-1.876h-5.807v3.752zm-.257-5.925c1.412 0 2.202-.662 2.202-1.767 0-1.116-.79-1.778-2.202-1.778h-5.55v3.545zM96.253 38.326h-2.44l6.795-13.835h2.32l6.805 13.835h-2.558l-1.343-2.765h-8.236zm2.41-4.938h6.102l-3.051-6.27zM80.944 38.316V24.49h2.271v11.653h9.204v2.173zM75.719 38.316V24.49h2.271v13.826zM60.468 38.326h-2.44l6.795-13.835h2.32l6.804 13.835H71.39l-1.343-2.765H61.81zm2.41-4.938h6.102l-3.051-6.27zM51.588 38.316 44.784 24.49h2.558l5.46 11.219 5.462-11.219h2.439l-6.795 13.826zM33.978 38.326H31.54l6.794-13.835h2.32l6.805 13.835H44.9l-1.343-2.765h-8.236zm2.41-4.938h6.103l-3.052-6.27zM15.935 38.316V24.49h2.963l8.64 11.18V24.49h2.223v13.826h-2.963l-8.64-10.991v10.99zM6.547 38.612C2.528 38.612 0 36.192 0 31.936v-7.445h2.271v7.445c0 2.894 1.57 4.504 4.316 4.504 2.735 0 4.286-1.61 4.286-4.504v-7.445h2.222v7.445c0 4.257-2.519 6.676-6.548 6.676M96.538 14.122V.296h11.376V2.47h-9.105v3.555h8.809v2.172h-8.809v3.753h9.204v2.173zM87 14.418c-4.593 0-7.802-3.091-7.802-7.21 0-4.117 3.23-7.208 7.801-7.208 2.39 0 4.197.72 6.153 2.182L91.809 4.01c-1.66-1.343-2.923-1.836-4.81-1.836-3.18 0-5.47 2.162-5.47 5.036s2.29 5.036 5.47 5.036c2.657 0 4.454-1.234 4.71-3.456h-5.54V6.616h7.901V7.98c0 3.723-2.528 6.439-7.07 6.439M65.166 14.131h-2.439L69.521.296h2.32l6.805 13.835h-2.558l-1.343-2.765H66.51zm2.41-4.937h6.103l-3.052-6.27zM44.592.296h3.545l4.641 11.189L57.43.296h3.526v13.826h-2.271V2.923l-4.661 11.199h-2.617l-4.642-11.19v11.19h-2.172zM39.367 14.122V.296h2.271v13.826z"
        />
      </svg>
    );
  }),
);

export default ImageUnavailable;
