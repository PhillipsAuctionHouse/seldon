import { forwardRef, memo } from 'react';
import { kebabCase } from 'change-case';

interface SettingsProps extends React.HTMLAttributes<SVGSVGElement> {
  color?: string;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleId?: string;
}

const Settings = memo(
  forwardRef < SVGSVGElement,
  SettingsProps >
    ((inlineProps, ref) => {
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
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.589 14.563a1.5 1.5 0 0 0 .3 1.655l.054.054a1.818 1.818 0 1 1-2.573 2.573l-.054-.054a1.5 1.5 0 0 0-1.655-.3 1.5 1.5 0 0 0-.909 1.372v.155a1.818 1.818 0 1 1-3.636 0v-.082a1.5 1.5 0 0 0-.982-1.373 1.5 1.5 0 0 0-1.655.3l-.054.055a1.819 1.819 0 1 1-2.573-2.573l.055-.054a1.5 1.5 0 0 0 .3-1.655 1.5 1.5 0 0 0-1.373-.91h-.155a1.818 1.818 0 1 1 0-3.636h.082a1.5 1.5 0 0 0 1.373-.981 1.5 1.5 0 0 0-.3-1.655L4.779 7.4a1.818 1.818 0 1 1 2.573-2.573l.055.054a1.5 1.5 0 0 0 1.654.3h.073a1.5 1.5 0 0 0 .909-1.372v-.155a1.818 1.818 0 0 1 3.636 0v.082a1.5 1.5 0 0 0 .91 1.373 1.5 1.5 0 0 0 1.654-.3l.055-.055a1.818 1.818 0 0 1 3.106 1.286 1.82 1.82 0 0 1-.534 1.287l-.054.054a1.5 1.5 0 0 0-.3 1.655v.073a1.5 1.5 0 0 0 1.373.909h.154a1.818 1.818 0 1 1 0 3.636h-.082a1.5 1.5 0 0 0-1.372.91"
          />
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.861 8.836a3 3 0 1 1 0 6 3 3 0 0 1 0-6"
          />
        </svg>
      );
    }),
);

export default Settings;
