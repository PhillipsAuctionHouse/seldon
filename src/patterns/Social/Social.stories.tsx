import type { Meta } from '@storybook/react';

import Social, { SocialProps } from './Social';
import { Icon } from '../../components/Icon';

const meta = {
  title: 'Patterns/Social',
  component: Social,
} satisfies Meta<typeof Social>;

export default meta;

const socialIcons = (
  <ul>
    <li>
      <a>
        <Icon icon="IconFooterInstagram" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="IconFooterLinkedin" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="IconFooterWechat" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="IconFooterRed" />
      </a>
    </li>
    <li>
      <a>
        <Icon icon="IconFooterFacebook" />
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
