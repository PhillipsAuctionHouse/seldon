import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import { px } from '../../utils';

import Social from '../../patterns/Social/Social';
import { Accordion, AccordionItem } from '../../components/Accordion';
import { Text, TextVariants } from '../../components/Text';
import { Icon } from '../../components/Icon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'SiteFurniture/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

export const Playground = (props: FooterProps) => (
  <Footer {...props}>
    {/* desktop version of footer */}
    <div className={`${px}-footer-desktop`}>
      <Text variant={TextVariants.heading4}>About Us</Text>
      {aboutUsLinks}
    </div>
    <div className={`${px}-footer-desktop`}>
      <Text variant={TextVariants.heading4}>Our Services</Text>
      {ourServicesLinks}
    </div>
    <div className={`${px}-footer-desktop`}>
      <Text variant={TextVariants.heading4}>Policies</Text>
      {policyLinks}
    </div>

    {/* mobile version of footer */}
    <Accordion className={`${px}-footer-mobile`}>
      <AccordionItem isLocked={false} label="About Us" key="accordion-key-about-us" id="accordion-item-about-us">
        {aboutUsLinks}
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        label="Our Services"
        key="accordion-key-our-services"
        id="accordion-item-our-services"
      >
        {ourServicesLinks}
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        label="Policies"
        isLastItem={true}
        key="accordion-key-policies"
        id="accordion-item-policies"
      >
        {policyLinks}
      </AccordionItem>
    </Accordion>

    {/* subscription button/icons component */}
    <Social>
      <ul>
        <li>
          <a>
            <Icon icon="Instagram" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="LinkedIn" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="Wechat" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="Red" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="Facebook" />
          </a>
        </li>
      </ul>
    </Social>
  </Footer>
);

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
