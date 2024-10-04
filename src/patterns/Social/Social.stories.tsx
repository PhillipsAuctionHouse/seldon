import type { Meta } from '@storybook/react';

import Social, { SocialProps } from './Social';
import Instagram from '../../assets/icon-footer-instagram.svg?react';
import Linkedin from '../../assets/icon-footer-linkedin.svg?react';
import Wechat from '../../assets/icon-footer-wechat.svg?react';
import Red from '../../assets/icon-footer-red.svg?react';
import Facebook from '../../assets/icon-footer-facebook.svg?react';

const meta = {
  title: 'Patterns/Social',
  component: Social,
} satisfies Meta<typeof Social>;

export default meta;

const socialIcons = (
  <ul>
    <li>
      <a>
        <Instagram />
      </a>
    </li>
    <li>
      <a>
        <Linkedin />
      </a>
    </li>
    <li>
      <a>
        <Wechat />
      </a>
    </li>
    <li>
      <a>
        <Red />
      </a>
    </li>
    <li>
      <a>
        <Facebook />
      </a>
    </li>
  </ul>
);

export const Playground = (props: SocialProps) => (
  <div className="social-story">
    <Social {...props} />
  </div>
);

Playground.args = {
  id: 'mySocialComponent',
  children: socialIcons,
};
