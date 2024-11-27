import { ComponentProps } from 'react';
import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { BidMessageVariants } from './types';
import { GreenCircle, RedCircle } from '../../assets/icons';

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
  const icon = variant === BidMessageVariants.positive ? <GreenCircle /> : <RedCircle />;
  return (
    <Text {...commonProps} className={classnames(baseClassName, className)} {...props} variant={TextVariants.string2}>
      {hasIcon ? icon : null}
      {message}
    </Text>
  );
};

export default BidMessage;
