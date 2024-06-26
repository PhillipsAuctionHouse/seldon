import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import Subscribe from '../Subscribe/Subscribe';
import { px } from '../../utils';

import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';
import Spotify from '../../assets/spotify.svg?react';
import Social from '../Social/Social';
import { SubscriptionState } from '../Subscribe/types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

const navigationComponent = (
  <ul>
    <li>
      <a>Locations</a>
    </li>
    <li>
      <a>Press</a>
    </li>
    <li>
      <a>Careers</a>
    </li>
    <li>
      <a>Privacy policy</a>
    </li>
    <li>
      <a>Cookie policy</a>
    </li>
    <li>
      <a>Modern Slavery Policy</a>
    </li>
  </ul>
);

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

const leftComponent = (
  <Subscribe
    className={`${px}-footer__newsletter`}
    title="Subscribe to Newsletter"
    blurb="Receive exclusive content about our auctions, exhibitions, and special events."
    buttonText="Sign Up"
    element="form"
    buttonProps={{
      size: 'sm',
    }}
    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      const target = e.target as HTMLFormElement;
      e.preventDefault();

      const nativeData = new FormData(target);
      const data = Object.fromEntries(nativeData.entries());
      console.log('Form submitted for email -', data?.email);

      target.reset();
    }}
    subscriptionState={SubscriptionState.Default}
    invalidText="Please enter a valid email address."
  />
);

const rightComponent = <Social className={`${px}-footer__social`}>{socialIcons}</Social>;

export const Playground = (props: FooterProps) => (
  <Footer {...props}>
    {leftComponent}
    {rightComponent}
  </Footer>
);

Playground.args = {
  navigationComponent,
};
