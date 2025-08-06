import LinkBlock, { type LinkBlockProps } from '../LinkBlock/LinkBlock';
import { forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import Grid, { GridProps } from '../Grid/Grid';

export interface LinkListProps extends GridProps<HTMLUListElement> {
  /** These children should be an array of LinkBlock components */
  children: React.ReactElement<LinkBlockProps, typeof LinkBlock>[];
}
/**
 * ## Overview
 *
 * The LinkList component is used to display a list of LinkBlocks in a 3 column list on some breakpoints and 1 column list on others.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=4612-79026&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-links-linklist--overview)
 */

const LinkList = forwardRef<HTMLUListElement, LinkListProps>(({ children, className, ...props }, ref) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'LinkList');
  return (
    <Grid
      {...commonProps}
      className={classnames(baseClassName, className)}
      element="ul"
      role="list"
      {...props}
      ref={ref}
    >
      {children.map((LinkBlockComponent) => (
        <li key={LinkBlockComponent?.props?.linkProps?.href} className={`${baseClassName}--item`}>
          {LinkBlockComponent}
        </li>
      ))}
    </Grid>
  );
});
LinkList.displayName = 'LinkList';

export default LinkList;
