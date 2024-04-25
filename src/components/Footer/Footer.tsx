import classnames from 'classnames';

import { CommonProps, px } from '../../utils';
import Subscribe from '../Subscribe/Subscribe';

export interface FooterProps extends CommonProps {
  /**
   * Copyright data added to bottom of site
   */
  copyright: string;
  /**
   * Navigation items
   */
  navigation: React.ReactNode;
  /**
   * Social icons
   */
  socialIcons: React.ReactNode;
  /**
   * Header text for social icons
   */
  socialText?: string;
  /**
   * Subscribe blurb text
   */
  subscribeBlurb?: string;
  /**
   * Subscribe callback function
   */
  subscribeCallback: () => void;
  /**
   * Subscribe method type
   */
  subscribeMethod?: 'post' | 'get' | 'dialog';
  /**
   * Subscribe title text
   */
  subscribeTitle?: string;
}

const Footer = ({
  className,
  copyright,
  id,
  navigation,
  socialIcons,
  socialText = 'Follow on Social',
  subscribeBlurb = 'Receive exclusive content about our auctions, exhibitions, and special events.',
  subscribeCallback,
  subscribeTitle = 'Subscribe to Newsletter',
  subscribeMethod = 'post',
}: FooterProps) => {
  return (
    <footer data-testid={id ? `footer-${id}` : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <nav className={`${px}-footer__navigation`}>{navigation}</nav>
      <div className={`${px}-footer__content`}>
        <Subscribe
          className={`${px}-footer__newsletter`}
          title={subscribeTitle}
          blurb={subscribeBlurb}
          buttonProps={{ size: 'sm', onClick: subscribeCallback }}
          method={subscribeMethod}
        />
        <div className={`${px}-footer__social`}>
          <h3 className={`${px}-footer__social-header`}>{socialText}</h3>
          {socialIcons}
        </div>
      </div>
      <p className={`${px}-footer__copyright`}>{copyright}</p>
    </footer>
  );
};

export default Footer;
