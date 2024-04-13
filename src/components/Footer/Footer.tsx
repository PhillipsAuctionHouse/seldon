import classnames from 'classnames';

import { CommonProps, px } from '../../utils';
import Subscribe from '../Subscribe/Subscribe';
import Grid from '../Grid/Grid';

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
   * footer contents
   */
  children: React.ReactNode;
}

const Footer = ({ copyright, className, id, socialIcons, navigation }: FooterProps) => {
  return (
    <footer data-testid={id ? `footer-${id}` : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <div className={`${px}-footer__navigation`}>{navigation}</div>
      <Grid className={`${px}-footer__content`} hasMargins={false}>
        <Subscribe
          className={`${px}-footer__newsletter`}
          title="Subscribe to Newsletter"
          blurb="Receive exclusive content about our auctions, exhibitions, and special events."
        />
        <div className={`${px}-footer__social`}>
          <h3>Follow on Social</h3>
          {socialIcons}
        </div>
      </Grid>
      <div className={`${px}-footer__copyright`}>{copyright}</div>
    </footer>
  );
};

export default Footer;
