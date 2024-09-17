import type { Meta } from '@storybook/react';

import Social, { SocialProps } from './Social';
import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';
import Spotify from '../../assets/spotify.svg?react';

const meta = {
  title: 'Patterns/Social',
  component: Social,
} satisfies Meta<typeof Social>;

export default meta;

const socialIcons = (
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
