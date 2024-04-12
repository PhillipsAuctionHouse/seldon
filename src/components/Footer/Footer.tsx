import classnames from 'classnames';

import { CommonProps, px } from '../../utils';
import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';
import Spotify from '../../assets/spotify.svg?react';
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
   * footer contents
   */
  children: React.ReactNode;
}

const Footer = ({ copyright, className, id, navigation }: FooterProps) => {
  return (
    <footer data-testid={id ? `footer-${id}` : `footer`} id={id} className={classnames(`${px}-footer`, { className })}>
      <div className={`${px}-footer__navigation`}>{navigation}</div>
      <div className={`${px}-footer__content`}>
        <Subscribe
          className={`${px}-footer__newsletter`}
          title="Subscribe to Newsletter"
          blurb="Receive exclusive content about our auctions, exhibitions, and special events."
        />
        <div className={`${px}-social`}>
          <p>Follow on Social</p>
          <ul>
            <li>
              <a>
                <Youtube />
              </a>
            </li>
            <li>
              <a>
                <Instagram />
              </a>
            </li>
            <li>
              <a>
                <Wechat />
              </a>
            </li>
            <li>
              <a>
                <Spotify />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${px}-footer__copyright`}>{copyright}</div>
    </footer>
  );
};

export default Footer;
