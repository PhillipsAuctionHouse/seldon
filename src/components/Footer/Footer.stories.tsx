import type { Meta } from '@storybook/react';

import Footer, { FooterProps } from './Footer';
import { px } from '../../utils';

import Youtube from '../../assets/youtube.svg?react';
import Instagram from '../../assets/instagram.svg?react';
import Wechat from '../../assets/wechat.svg?react';
import Spotify from '../../assets/spotify.svg?react';
import Social from '../Social/Social';
import { Accordion, AccordionItem } from '../Accordion';
import { useEffect, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

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

const leftComponent = (viewPortWidth: number) => {
  const isMobileViewPort = viewPortWidth >= 1301 ? false : true;

  return (
    <Accordion type="multiple" {...(isMobileViewPort ? {} : { value: ['About Us', 'Our Services', 'Policies'] })}>
      <AccordionItem
        isLocked={false}
        variation={''}
        label={'About Us'}
        isControlled={isMobileViewPort}
        key={`accordion-key-about-us`}
        id={`accordion-item-about-us`}
      >
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
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        variation={''}
        label={'Our Services'}
        isControlled={isMobileViewPort}
        key={`accordion-key-our-services`}
        id={`accordion-item-our-services`}
      >
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
      </AccordionItem>

      <AccordionItem
        isLocked={false}
        variation={''}
        label={'Policies'}
        isLastItem={true}
        isControlled={isMobileViewPort}
        key={`accordion-key-policies`}
        id={`accordion-item-policies`}
      >
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
      </AccordionItem>
    </Accordion>
  );
};

const rightComponent = <Social className={`${px}-footer__social`}>{socialIcons}</Social>;

export const Playground = (props: FooterProps) => {
  const [viewPortWidth, setViewPortWidth] = useState(
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setViewPortWidth(vw);
    });

    return () => {
      window.removeEventListener('resize', () => ({}));
    };
  }, []);

  return (
    <Footer {...props}>
      {leftComponent(viewPortWidth)}
      {rightComponent}
    </Footer>
  );
};

Playground.args = {
  // navigationComponent,
};
