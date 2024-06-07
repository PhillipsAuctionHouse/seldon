import classnames from 'classnames';

import { defaultYear, px } from '../../utils';
import SplitPanel from '../SplitPanel/SplitPanel';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Copyright data added to bottom of site
   */
  copyright?: string;

  /**
   * Navigation items
   */
  navigationComponent: React.ReactElement;
}

/**
 * ## Overview
 *
 * A component for adding a footer to the bottom of the site.
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6651-2641&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-footer--overview)
 */

const Footer = ({
  children,
  className,
  copyright = `© ${defaultYear} Phillips Auctioneers, LLC`,
  id,
  navigationComponent,
}: FooterProps) => {
  return (
    <footer data-testid={id ? id : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <nav className={`${px}-footer__navigation`}>{navigationComponent}</nav>
      <SplitPanel className={`${px}-footer__content`} hasBorder={false}>
        {children}
      </SplitPanel>
      <p className={`${px}-footer__copyright`}>{copyright}</p>
    </footer>
  );
};

export default Footer;
