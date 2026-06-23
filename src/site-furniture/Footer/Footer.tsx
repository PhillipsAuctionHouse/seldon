import classnames from 'classnames';
import { ComponentPropsWithoutRef, ComponentType } from 'react';

import { defaultYear, px } from '../../utils';
import { Text, TextVariants } from '../../components/Text';
import { Icon } from '../../components/Icon';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Copyright data added to bottom of site
   */
  copyright?: string;
  /**
   * Logo href
   */
  logoHref?: string;
  /**
   * Logo link component to support SPA navigation (e.g. Remix <Link> or Next.js <Link>)
   */
  logoLinkComponent?: ComponentType<ComponentPropsWithoutRef<'a'>>;
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
  logoHref = '/',
  logoLinkComponent,
}: FooterProps) => {
  const LogoLink = logoLinkComponent;

  return (
    <footer data-testid={id ? id : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <div className={`${px}-footer__links`}>{children}</div>
      <div className={`${px}-footer__copyright`}>
        {LogoLink ? (
          <LogoLink href={logoHref} aria-label="logo" data-testid="footer-logo" className={`${px}-footer__logo`}>
            <Icon icon="PhillipsLogo" width="94px" />
          </LogoLink>
        ) : (
          <a href={logoHref} aria-label="logo" data-testid="footer-logo" className={`${px}-footer__logo`}>
            <Icon icon="PhillipsLogo" width="94px" />
          </a>
        )}
        <Text variant={TextVariants.bodySmall}>{copyright}</Text>
      </div>
    </footer>
  );
};

export default Footer;
