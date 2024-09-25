// import { userEvent } from '@testing-library/user-event';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

describe('Footer', () => {
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
