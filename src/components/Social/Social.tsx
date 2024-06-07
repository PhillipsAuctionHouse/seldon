import classnames from 'classnames';

import { px } from '../../utils';

export interface SocialProps extends React.HTMLAttributes<HTMLElement> {
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

const Social = ({ className, children, id, titleText = 'Follow on Social' }: SocialProps) => (
  <div data-testid={id ? id : `social`} className={classnames(`${px}-social`, className)}>
    <h3 className={`${px}-social__header`}>{titleText}</h3>
    {children}
  </div>
);

export default Social;
