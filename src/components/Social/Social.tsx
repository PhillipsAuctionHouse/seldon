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
 * [Figma Link](https://www.figma.com/file/npS5ECbNut8hevUkGWSzUN/Site-Furniture-(Navigation)---SP24?type=design&node-id=4357-7418&mode=design&t=D7PpghvLOEpBYd3n-0)
 */

const Social = ({ className, children, id, titleText = 'Follow on Social' }: SocialProps) => (
  <div data-testid={id ? id : `social`} className={classnames(`${px}-social`, className)}>
    <h3 className={`${px}-social__header`}>{titleText}</h3>
    {children}
  </div>
);

export default Social;
