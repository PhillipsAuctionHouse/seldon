import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { Icon, PictogramName } from '../Icon';

export interface PictogramProps extends ComponentProps<'div'> {
  /**
   * Name of Pictogram to render
   */
  pictogram: PictogramName;
  /**
   * Size of the Pictogram
   */
  size: string;
  /**
   * Color of the Pictogram
   */
  color: string;
}
/**
 * ## Overview
 *
 * Component for rendering pictograms. Accepts a pictogram name and renders the corresponding SVG icon at the size specified. Also accepts a color parameter to change the fill color of the pictogram.
 *
 * Overview of this widget
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/RW-Design-System?node-id=22564-5919&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pictogram--overview)
 */
const Pictogram = forwardRef<HTMLDivElement, PictogramProps>(({ className, pictogram, size, color, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Pictogram');
  const componentProps = { ...commonProps, ...props };

  return (
    <Icon
      {...componentProps}
      className={classnames(baseClassName, className)}
      icon={pictogram}
      height={size}
      width={size}
      color={color}
      isPictogram
      ref={ref}
    ></Icon>
  );
});

Pictogram.displayName = 'Pictogram';

export default Pictogram;
