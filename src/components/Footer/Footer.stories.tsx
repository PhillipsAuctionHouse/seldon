import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';

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
