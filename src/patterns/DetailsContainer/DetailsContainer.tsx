import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import { DetailComponent } from '../../components/Detail';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface DetailsContainerProps extends ComponentProps<'div'> {
  /**
   * Determines whether each Details' label and value are aligned in columns or justified
   */
  alignment: 'columns' | 'justified';
  /**
   * The Detail components to render
   */
  children: DetailComponent[];
  /**
   * Whether to render separators between each Detail component
   */
  hasSeparators: boolean;
}
/**
 * ## Overview
 *
 * A container for displaying multiple Detail components. The alignment prop determines whether each Detail's label and value are aligned in columns or justified. Separators can also be added between each Detail component.
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-detailscontainer--overview)
 *
 */
const DetailsContainer = forwardRef<HTMLDivElement, DetailsContainerProps>(
  ({ alignment, className, children, hasSeparators, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'DetailsContainer');

    return (
      <div
        {...commonProps}
        className={classnames(baseClassName, className, {
          columns: alignment === 'columns',
          justified: alignment === 'justified',
        })}
        {...props}
        ref={ref}
      >
        {children?.map((child, index) => (
          <div
            className={classnames(`${baseClassName}-wrapper`, {
              ['has-separators']: hasSeparators,
              columns: alignment === 'columns',
              justified: alignment === 'justified',
            })}
            key={`details-container-wrapper-${index}`}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
);

DetailsContainer.displayName = 'DetailsContainer';

export default DetailsContainer;
