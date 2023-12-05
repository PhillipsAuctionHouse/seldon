import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import Subscribe from '../Subscribe/Subscribe';
import { px } from '../../utils';
import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

export const Playground = (props: FooterProps) => (
  <Footer {...props}>
    {/* <section className={`${px}-newsletter`}>
      <h3>Subscribe to Newsletter</h3>
      <p>Receive exclusive content about our auctions, exhibitions, and special events.</p>
      <Input id="footer-newsletter" type="email" placeholder="example@email.com" labelText="Email*" />
      <Button buttonType="secondary">Sign Up</Button>
    </section> */}
    <Subscribe
      className={`${px}-newsletter`}
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
      </ul>
    </div>
  </Footer>
);

const navigation = (
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  copyright: '© 2024 Phillips Auctioneers, LLC',
  navigation,
};
