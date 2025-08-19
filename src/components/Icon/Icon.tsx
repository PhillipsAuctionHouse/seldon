import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { getCommonProps, px } from '../../utils';
import { getScssVar } from '../../utils/scssUtils';
import * as iconComponents from '../../assets/formatted';
import * as pictogramComponents from '../../assets/pictograms/formatted';

export type IconName = keyof typeof iconComponents;
export type PictogramName = keyof typeof pictogramComponents;

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Height of the icon in px (number) or as a string with units (e.g. '1em')
   */
  height?: number | string | null;
  /**
   * Width of the icon in px (number) or as a string with units (e.g. '1em')
   */
  width?: number | string | null;
  /**
   * Color of the icon. Can be set to "currentColor" if you want to control the color through css. Otherwise, it only accepts valid seldon color tokens. Defaults to $black-100
   */
  color?: string;
  /**
   * Name of Icon to render
   */
  icon: IconName | PictogramName;
  /**
   * Tells the Icon component that the icon prop refers to the name of a pictogram. This is only needed when rendering a pictogram that has the same name of an existing icon.
   */
  isPictogram?: boolean;
}

/**
 * ## Overview
 *
 * Component for rendering icons. Accepts an icon name and renders the corresponding SVG icon at the height and width specified. Also accepts a color parameter to change the fill color of the icon, but not all icons can be recolored (Business logos for example).
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-icon--overview)
 */
const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, height, width, color, icon, isPictogram, ...props }: IconProps, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, `Icon-${icon}`);

    const Component = isPictogram
      ? pictogramComponents[icon as PictogramName]
      : iconComponents[icon as IconName] || pictogramComponents[icon as PictogramName];
    const componentProps = {
      color: color === 'currentColor' ? color : getScssVar(color ?? '', '$black-100'),
      ...(height ? { height } : {}),
      ...(width ? { width } : {}),
      ...commonProps,
    };

    return Component ? (
      <div className={classnames(`${px}-icon`, baseClassName, className)} ref={ref}>
        <Component {...componentProps} />
      </div>
    ) : null;
  },
);

Icon.displayName = 'Icon';

export default Icon;
