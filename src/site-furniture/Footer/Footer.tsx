import classnames from 'classnames';
import { cloneElement, ComponentPropsWithoutRef, isValidElement, ReactElement } from 'react';

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
   * Logo link element to support SPA navigation links
   */
  logoLinkElement?: ReactElement<ComponentPropsWithoutRef<'a'> & { 'data-testid'?: string }>;
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
  logoLinkElement,
}: FooterProps) => {
  const logoProps = {
    href: logoHref,
    'aria-label': 'logo',
    'data-testid': 'footer-logo',
    className: `${px}-footer__logo`,
    children: <Icon icon="PhillipsLogo" width="94px" />,
  };

  return (
    <footer data-testid={id ? id : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <div className={`${px}-footer__links`}>{children}</div>
      <div className={`${px}-footer__copyright`}>
        {isValidElement(logoLinkElement) ? cloneElement(logoLinkElement, { ...logoProps }) : <a {...logoProps} />}
        <Text variant={TextVariants.bodySmall}>{copyright}</Text>
      </div>
    </footer>
  );
};

export default Footer;
