import { ComponentProps, forwardRef } from 'react';
import classnames from 'classnames';
import { DetailComponent } from '../../components/Detail';
import { getCommonProps, px } from '../../utils';
import { DetailListAlignment } from './types';
import { getDetailKey } from './utils';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface DetailListProps extends ComponentProps<'dl'> {
  /**
   * Determines whether each Details' label and value are aligned in columns or justified
   */
  alignment: DetailListAlignment;
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
 * A container for displaying a list of [Detail](/docs/components-detail--overview) components. The alignment prop determines whether each Detail's label and value are aligned in columns or justified. Separators can also be added between each Detail component.
 *
 * [Figma Link](https://www.figma.com/design/hMu9IWH5N3KamJy8tLFdyV/EASEL-Compendium%3A-Tokens%2C-Components-%26-Patterns?node-id=11364-24078&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/patterns-detaillist--overview)
 *
 */
const DetailList = forwardRef<HTMLDListElement, DetailListProps>(
  ({ alignment, className, children, hasSeparators, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'DetailList');

    return (
      <dl
        {...commonProps}
        className={classnames(baseClassName, className, {
          [`${px}-columns`]: alignment === DetailListAlignment.columns,
          [`${px}-justified`]: alignment === DetailListAlignment.justified,
        })}
        {...props}
        ref={ref}
      >
        {children?.map((child, index) => (
          <dl
            className={classnames(`${baseClassName}-wrapper`, {
              [`${px}-has-separators`]: hasSeparators,
              [`${px}-columns`]: alignment === DetailListAlignment.columns,
              [`${px}-justified`]: alignment === DetailListAlignment.justified,
            })}
            key={getDetailKey(child, index)}
          >
            {child}
          </dl>
        ))}
      </dl>
    );
  },
);

DetailList.displayName = 'DetailList';

export default DetailList;
