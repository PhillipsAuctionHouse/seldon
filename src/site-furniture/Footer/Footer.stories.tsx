import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import { px } from '../../utils';

import Social from '../../patterns/Social/Social';
import { Accordion, AccordionItem } from '../../components/Accordion';
import { Text, TextVariants } from '../../components/Text';
import { Icon } from '../../components/Icon';
import { Link, LinkVariants } from '../../components/Link';

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
      <Text variant={TextVariants.headingSmall}>About us</Text>
      {aboutUsLinks}
    </div>
    <div className={`${px}-footer-desktop`}>
      <Text variant={TextVariants.headingSmall}>Our services</Text>
      {ourServicesLinks}
    </div>
    <div className={`${px}-footer-desktop`}>
      <Text variant={TextVariants.headingSmall}>Policies</Text>
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
            <Icon icon="Instagram" height="2rem" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="LinkedIn" height="2rem" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="WeChat" height="2rem" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="Red" height="2rem" />
          </a>
        </li>
        <li>
          <a>
            <Icon icon="Facebook" height="2rem" />
          </a>
        </li>
      </ul>
    </Social>
  </Footer>
);

const aboutUsLinks = (
  <ul>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Our history
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Our team
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Locations
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Press
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Careers
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Site map
      </Link>
    </li>
  </ul>
);

const ourServicesLinks = (
  <ul>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        How to buy
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        How to sell
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Private services
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Trusts, estates & valuations
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Fiduciary services
      </Link>
    </li>
  </ul>
);

const policyLinks = (
  <ul>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Privacy policy
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Cookie policy
      </Link>
    </li>
    <li>
      <Link variant={LinkVariants.linkSmall} href="/">
        Modern day slavery policy
      </Link>
    </li>
  </ul>
);
