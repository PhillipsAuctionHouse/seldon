import classnames from 'classnames';

import { defaultYear, px } from '../../utils';
import SplitPanel from '../SplitPanel/SplitPanel';
import Logo from '../../assets/PhillipsLogo.svg?react';

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
}: FooterProps) => {
  return (
    <footer data-testid={id ? id : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <SplitPanel className={`${px}-footer__content`} hasBorder={false}>
        {children}
      </SplitPanel>

      <div className={`${px}-footer__copyright`}>
        <h1 data-testid="header-logo" className={`${px}-header__logo`}>
          <a href="/" aria-label="logo">
            <Logo />
          </a>
        </h1>
        {copyright}
      </div>
    </footer>
  );
};

export default Footer;
