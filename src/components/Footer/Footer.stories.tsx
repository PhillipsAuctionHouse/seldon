import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import { px } from '../../utils';

import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';
import Spotify from '../../assets/spotify.svg?react';
import Social from '../Social/Social';
import { Accordion, AccordionItem } from '../Accordion';
import { Text, TextVariants } from '../Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

const aboutUsLinks = (
  <ul>
    <li>
      <a href="/">Our History</a>
    </li>
    <li>
      <a href="/">Our Team</a>
    </li>
    <li>
      <a href="/">Locations</a>
    </li>
    <li>
      <a href="/">Press</a>
    </li>
    <li>
      <a href="/">Careers</a>
    </li>
    <li>
      <a href="/">Site map</a>
    </li>
  </ul>
);

const ourServicesLinks = (
  <ul>
    <li>
      <a href="/">How to Buy</a>
    </li>
    <li>
      <a href="/">How to Sell</a>
    </li>
    <li>
      <a href="/">Private Services</a>
    </li>
    <li>
      <a href="/">Trusts, Estates & Valuations</a>
    </li>
    <li>
      <a href="/">Fiduciary Services</a>
    </li>
  </ul>
);

const policyLinks = (
  <ul>
    <li>
      <a href="/">Privacy Policy</a>
    </li>
    <li>
      <a href="/">Cookie Policy</a>
    </li>
    <li>
      <a href="/">Modern Day Slavery Policy</a>
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
  <>
    <div className={`${px}-footer-desktop`}>
      <div>
        <Text variant={TextVariants.heading4}>About Us</Text>
        {aboutUsLinks}
      </div>

      <div>
        <Text variant={TextVariants.heading4}>Our Services</Text>
        {ourServicesLinks}
      </div>

      <div>
        <Text variant={TextVariants.heading4}>Policies</Text>
        {policyLinks}
      </div>
    </div>

    <Accordion type="multiple" className={`${px}-footer-mobile`}>
      <AccordionItem
        isLocked={false}
        variation=""
        label="About Us"
        key="accordion-key-about-us"
        id="accordion-item-about-us"
      >
        {aboutUsLinks}
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        variation=""
        label="Our Services"
        key="accordion-key-our-services"
        id="accordion-item-our-services"
      >
        {ourServicesLinks}
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        variation=""
        label="Policies"
        isLastItem={true}
        key="accordion-key-policies"
        id="accordion-item-policies"
      >
        {policyLinks}
      </AccordionItem>
    </Accordion>
  </>
);

const rightComponent = <Social className={`${px}-footer__social`}>{socialIcons}</Social>;

export const Playground = (props: FooterProps) => (
  <Footer {...props}>
    {leftComponent}
    {rightComponent}
  </Footer>
);

Playground.args = {
  // navigationComponent,
};
