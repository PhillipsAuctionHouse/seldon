import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import Button from '../../components/Button/Button';
import { MouseEventHandler } from 'react';
import { ButtonVariants } from '../../components/Button/types';
import { Text, TextVariants } from '../../components/Text';

export interface SocialProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text for the social section
   */
  titleText?: string;
  /**
   * Text for the subscribe button
   */
  buttonText?: string;
  /**
   * Function for when the subscribe button is clicked
   */
  onSubscribeClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * ## Overview
 *
 * A component for displaying our social icons. Expects children to be an unordered list of social icons.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6651-2641&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-social--overview)
 */

const Social = ({
  className,
  children,
  titleText = 'Never Miss A Moment',
  buttonText = 'Subscribe To Our Newsletter',
  onSubscribeClick,
  ...props
}: SocialProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Social');
  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
      <Text variant={TextVariants.heading4} className={`${baseClassName}__header`}>
        {titleText}
      </Text>
      <Button onClick={onSubscribeClick} variant={ButtonVariants.ghost} className={`${baseClassName}__button`}>
        {buttonText}
      </Button>
      {children}
    </div>
  );
};

export default Social;
