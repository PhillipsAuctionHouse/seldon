import { px } from '../../utils';
import plusIcon from '../../assets/plus.svg';
import minusIcon from '../../assets/minus.svg';
import lockIcon from '../../assets/lock.svg';
import lockBlueIcon from '../../assets/lockBlue.svg';
import { useState } from 'react';
import classnames from 'classnames';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  key?: string;
  isLastItem?: boolean;
  isLocked: boolean;
  isLockedVariation?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  lockedContent?: any;
  variation: 'lg' | 'sm';
  label: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  content?: any;
}
/**
 * ## Overview
 *
 * A single Accordion Item in a list
 */

const AccordionItem = ({
  isLocked,
  isLockedVariation,
  lockedContent,
  variation,
  label,
  content,
  isLastItem,
  id,
}: AccordionItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isLargeVariation = variation === 'lg';
  const iconId =
    `${id}-` + (isLocked ? 'lockedIcon' : isLockedVariation ? 'lockBlueIcon' : isCollapsed ? 'plusIcon' : 'minusIcon');

  return (
    <div className={classnames(`${px}-accordionItem`, !isLastItem && `${px}-accordionItem__border_bottom`)}>
      <div
        className={classnames(`${px}-accordionItem__label`, !isLocked && `${px}-accordionItem__label_hoverable`)}
        onClick={() => !isLocked && setIsCollapsed((prevState) => !prevState)}
        data-testid={id}
      >
        <div
          className={classnames(`${px}-accordionItem__label_text`, isLargeVariation && `${px}-accordionItem__label_lg`)}
        >
          {label}
        </div>
        <img
          className={classnames(`${px}-accordionItem__label_icon`, isLargeVariation && `${px}-accordionItem__icon_lg`)}
          src={isLocked ? (isLockedVariation ? lockBlueIcon : lockIcon) : isCollapsed ? plusIcon : minusIcon}
          data-testid={iconId}
        />
      </div>

      {isLocked && lockedContent ? (
        <div>{lockedContent}</div>
      ) : (
        <div
          className={classnames(`${px}-accordionItem__default`, !isCollapsed && `${px}-accordionItem__expanded`, {
            [`${px}-accordionItem__child_text_lg`]: isLargeVariation,
          })}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
