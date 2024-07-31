import classnames from 'classnames';

import { getCommonProps } from '../../utils';
import Button from '../Button/Button';

export interface SocialProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text for the social section
   */
  titleText?: string;
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

const Social = ({ className, children, titleText = 'Never Miss A Moment', ...props }: SocialProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'Social');
  return (
    <div {...commonProps} className={classnames(baseClassName, className)} {...props}>
      <h3 className={`${baseClassName}__header`}>{titleText}</h3>
      <Button buttonType="ghost" className={`${baseClassName}__button`}>
        Subscribe To Our Newsletter
      </Button>
      {children}
    </div>
  );
};

export default Social;
