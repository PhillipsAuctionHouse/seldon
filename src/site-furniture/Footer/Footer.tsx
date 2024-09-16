import classnames from 'classnames';

import { defaultYear, px } from '../../utils';
import Logo from '../../assets/PhillipsLogo.svg?react';
import { Text, TextVariants } from '../../components/Text';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Copyright data added to bottom of site
   */
  copyright?: string;
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
      <div className={`${px}-footer__links`}>{children}</div>

      <div className={`${px}-footer__copyright`}>
        <h3 data-testid="footer-logo" className={`${px}-footer__logo`}>
          <a href="/" aria-label="logo">
            <Logo />
          </a>
        </h3>
        <Text variant={TextVariants.body3}>{copyright}</Text>
      </div>
    </footer>
  );
};

export default Footer;
