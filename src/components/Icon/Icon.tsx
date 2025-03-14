import { forwardRef, createElement, type CSSProperties } from 'react';
import classnames from 'classnames';
import { getCommonProps } from '../../utils';
import { getScssVar } from '../../utils/scssUtils';
import * as icons from '../../assets/icons';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Height of the icon in px. Defaults to 24
   */
  height?: number;
  /**
   * Width of the icon in px. Defaults to 24
   */
  width?: number;
  /**
   * Color of the icon. Accepts any valid CSS color value, including seldon color tokens. Defaults to $pure-black
   */
  color?: string;
  /**
   * Icon name
   */
  icon: keyof typeof icons;
}

/**
 * ## Overview
 *
 * Component for rendering icons. Accepts an icon name and renders the corresponding SVG icon at the height and width specified. Also accepts a color parameter to change the fill color of the icon, but not all icons can be recolored (Business logos for example).
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-icon--overview)
 */
const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, height = 24, width = 24, color, icon, ...props }: IconProps, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, `Icon-${icon}`);

    const componentProps = {
      className: classnames(baseClassName, className),
      style: {
        '--icon-height': `${height}px`,
        '--icon-width': `${width}px`,
        '--icon-fill-color': getScssVar(color ?? '', '$pure-black'),
      } as CSSProperties,
      ...commonProps,
    };

    return icon ? (
      <div {...componentProps} ref={ref}>
        {createElement(icons[icon])}
      </div>
    ) : null;
  },
);

Icon.displayName = 'Icon';

export default Icon;
