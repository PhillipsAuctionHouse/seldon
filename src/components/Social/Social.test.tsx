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

  it('it allows for all strings to be passed in', () => {
    render(<Social titleText="My Title">{children}</Social>);
    expect(screen.queryByText(/My Title/)).toBeInTheDocument();
  });

  it('it will render any nested children', () => {
    render(<Social>{children}</Social>);
    expect(screen.queryByText(/Youtube/)).toBeInTheDocument();
    expect(screen.queryByText(/Instagram/)).toBeInTheDocument();
    expect(screen.queryByText(/Wechat/)).toBeInTheDocument();
    expect(screen.queryByText(/Spotify/)).toBeInTheDocument();
  });
});
