import { render, screen } from '@testing-library/react';

import Social from './Social';
import { runCommonTests } from '../../utils/testUtils';

const children = (
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
describe('Social', () => {
  runCommonTests(Social, 'Social');

  it('is selectable by the test id', () => {
    render(<Social id="test">{children}</Social>);
    expect(screen.queryByTestId(/test/)).toBeInTheDocument();
  });

  it('renders the title text when passed in', () => {
    render(<Social titleText="My Title">{children}</Social>);
    expect(screen.queryByText(/My Title/)).toBeInTheDocument();
  });

  it.each([['Youtube'], ['Instagram'], ['Wechat'], ['Spotify']])('renders %s link', (platform) => {
    render(<Social>{children}</Social>);
    expect(screen.getByText(platform)).toBeInTheDocument();
  });
});
