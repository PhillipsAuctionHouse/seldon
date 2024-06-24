import { px } from '../../utils';
import { AccordionItemType } from './types';
import plusIcon from '../../assets/plus.svg';
import minusIcon from '../../assets/minus.svg';
import lockIcon from '../../assets/lock.svg';
import lockBlueIcon from '../../assets/lockBlue.svg';
import { useState } from 'react';
import classNames from 'classnames';

/**
 * ## Overview
 *
 * A single Accordion Item in a list
 */

const AccordionItem = ({ ...props }: AccordionItemType) => {
  const { locked, lockedVariation, lockedChildren, variation, label, children, isLastItem } = props;
  const [contentState, setContentState] = useState('collapsed');
  const isLargeVariation = variation === 'lg';

  return (
    <div className={classNames(`${px}-accordionItem`, !isLastItem && `${px}-accordionItem__border_bottom`)}>
      <div
        className={classNames(`${px}-accordionItem__label`, !locked && `${px}-accordionItem__label_hoverable`)}
        onClick={() => !locked && setContentState(contentState === 'collapsed' ? 'expanded' : 'collapsed')}
      >
        <div
          className={classNames(`${px}-accordionItem__label_text`, isLargeVariation && `${px}-accordionItem__label_lg`)}
        >
          {label}
        </div>
        <img
          className={classNames(`${px}-accordionItem__label_icon`, isLargeVariation && `${px}-accordionItem__icon_lg`)}
          src={
            locked ? (lockedVariation ? lockBlueIcon : lockIcon) : contentState === 'collapsed' ? plusIcon : minusIcon
          }
        />
      </div>

      {locked && lockedChildren ? (
        <div>{lockedChildren}</div>
      ) : (
        <div
          className={classNames(
            contentState === 'collapsed' ? `${px}-accordionItem__collapsed` : `${px}-accordionItem__expanded`,
            isLargeVariation && `${px}-accordionItem__child_text_lg`,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
