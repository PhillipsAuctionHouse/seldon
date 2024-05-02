import classnames from 'classnames';

import { defaultYear, px } from '../../utils';
import SplitPanel from '../SplitPanel/SplitPanel';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Copyright data added to bottom of site
   */
  copyright?: string;
  /**
   * Optional Content that will be displayed on the left side of the footer on large screens and top on small screens
   */
  leftComponent?: React.ReactElement;
  /**
   * Navigation items
   */
  navigationComponent: React.ReactElement;
  /**
   * Optional Content that will be displayed on the right side of the footer on large screens and bottom on small screens
   */
  rightComponent?: React.ReactElement;
}

/**
 * ## Overview
 *
 * A component for adding a footer to the bottom of the site.
 *
 * [Figma Link](https://www.figma.com/file/npS5ECbNut8hevUkGWSzUN/Site-Furniture-(Navigation)---SP24?type=design&node-id=4346-1981&mode=design&t=D7PpghvLOEpBYd3n-0)
 */

const Footer = ({
  className,
  copyright = `© ${defaultYear} Phillips Auctioneers, LLC`,
  id,
  leftComponent,
  navigationComponent,
  rightComponent,
}: FooterProps) => {
  return (
    <footer data-testid={id ? `footer-${id}` : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <nav className={`${px}-footer__navigation`}>{navigationComponent}</nav>
      <SplitPanel
        className={`${px}-footer__content`}
        hasBorder={false}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      <p className={`${px}-footer__copyright`}>{copyright}</p>
    </footer>
  );
};

export default Footer;
