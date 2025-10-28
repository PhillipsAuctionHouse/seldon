import { ComponentProps } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { BidMessageVariants } from './types';
import { Icon } from '../../components/Icon';

export interface BidMessageProps extends ComponentProps<'p'> {
  /**
   * Message to display
   */
  message: string;
  /**
   * show the message icon
   */
  hasIcon?: boolean;
  /**
   * Variant type - positive | negative
   */
  variant?: BidMessageVariants;
}
/**
 * ## Overview
 *
 * Overview of this widget
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](Point back to yourself here)
 */
const BidMessage = ({
  className,
  hasIcon = true,
  message,
  variant = BidMessageVariants.positive,
  ...props
}: BidMessageProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'BidMessage');
  const icon =
    variant === BidMessageVariants.positive ? (
      <Icon icon="IconGreenCircle" height={8} width={8} />
    ) : (
      <Icon icon="IconRedCircle" height={8} width={8} />
    );
  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
      {hasIcon ? icon : null}
      <Text variant={TextVariants.bodySmall} className={`${baseClassName}-text`}>
        {message}
      </Text>
    </div>
  );
};

export default BidMessage;
