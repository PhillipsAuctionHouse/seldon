import LinkBlock, { type LinkBlockProps } from '../LinkBlock/LinkBlock';
import React from 'react';
import { px } from '../../utils';
import Grid from '../Grid/Grid';

export interface LinkListProps extends React.HTMLAttributes<HTMLUListElement> {
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

const LinkList = ({ children, id, ...props }: LinkListProps) => {
  const dataTestId = id ? `link-list-${id}` : `link-list`;
  const baseClassName = `${px}-link-list`;

  return (
    <Grid {...props} data-testid={dataTestId} id={id} className={baseClassName} element="ul" role="list">
      {children.map((LinkBlockComponent) => {
        if (React.isValidElement(LinkBlockComponent) && LinkBlockComponent.type !== LinkBlock) {
          console.warn('LinkList only accepts LinkBlock children');
          return null;
        }
        return (
          <li key={LinkBlockComponent?.props?.linkProps?.href} className={`${baseClassName}--item`}>
            {LinkBlockComponent}
          </li>
        );
      })}
    </Grid>
  );
};

export default LinkList;
