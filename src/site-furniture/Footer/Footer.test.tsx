import { render, screen } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import Footer from './Footer';
import Social from '../../patterns/Social/Social';
import Subscribe from '../../patterns/Subscribe/Subscribe';
import puppeteer from 'puppeteer';
expect.extend({ toMatchImageSnapshot });

describe('Footer', () => {
  const socialIcons = (
    <ul>
      <li>
        <a>Youtube</a>
      </li>
      <li>
        <a>Instagram</a>
      </li>
      <li>
        <a>Wechat</a>
      </li>
      <li>
        <a>Spotify</a>
      </li>
    </ul>
  );

  const leftComponent = (
    <Subscribe
      id="subscribe"
      title="Subscribe to Email"
      blurb="This blurb will be rendered"
      buttonProps={{ onClick: vi.fn() }}
    />
  );

  const rightComponent = <Social id="social">{socialIcons}</Social>;
  const child = (
    <>
      {leftComponent}
      {rightComponent}
    </>
  );

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

  const commonProps = {
    children: child,
    navigationComponent,
  };

  // it('is selectable by the test id', () => {
  //   const { rerender } = render(<Footer {...commonProps} />);
  //   expect(screen.queryByTestId('footer')).toBeInTheDocument();
  //   rerender(<Footer id="test" {...commonProps} />);
  //   expect(screen.queryByTestId('test')).toBeInTheDocument();
  // });

  // it('renders the components we pass to it', () => {
  //   render(<Footer {...commonProps} />);
  //   expect(screen.queryByTestId(/subscribe/)).toBeInTheDocument();
  //   expect(screen.queryByTestId(/social/)).toBeInTheDocument();
  // });

  // it('screenshot', async () => {
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //   });
  //   const [page] = await browser.pages();
  //   await page.goto('http://localhost:6006/?path=/story/sitefurniture-footer--playground', { waitUntil: 'load' });
  //   const image = await page.screenshot({
  //     // path: `${__dirname}/test_snaps/verge-1440.png`,
  //     type: 'png',
  //     fullPage: true,
  //   });

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   expect(image).toMatchImageSnapshot({
  //     runInProcess: true,
  //     customDiffConfig: {
  //       threshold: 0.01,
  //     },
  //     // customDiffDir: `${__dirname}/test_snaps/verge-1440.png`,
  //     // customSnapshotsDir: `${__dirname}/baseline/`,
  //     // customSnapshotIdentifier: `verge-1440`,
  //     noColors: true,
  //   });
  // });
});
