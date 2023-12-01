import classnames from 'classnames';

import { CommonProps, px } from '../../utils';

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

const Footer = ({ copyright, children, className, id, navigation }: FooterProps) => {
  return (
    <footer
      data-testid={id ? `footer-${id}` : `footer`}
      id={id}
      className={classnames(`${px}-footer`, {className})}
    >
      <div className={`${px}-footer__navigation`}>{navigation}</div>
      <div className={`${px}-footer__content`}>{children}</div>
      <div className={`${px}-footer__copyright`}>{copyright}</div>
    </footer>
  );
};

export default Footer;
