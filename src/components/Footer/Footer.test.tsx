import { render, screen } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';

import Footer from './Footer';
import Social from '../Social/Social';
import Subscribe from '../Subscribe/Subscribe';

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

  it('is selectable by the test id', () => {
    const { rerender } = render(<Footer {...commonProps} />);
    expect(screen.queryByTestId(/footer/)).toBeInTheDocument();
    rerender(<Footer id="test" {...commonProps} />);
    expect(screen.queryByTestId(/test/)).toBeInTheDocument();
  });

  it('renders the components we pass to it', () => {
    render(<Footer {...commonProps} />);
    expect(screen.queryByTestId(/subscribe/)).toBeInTheDocument();
    expect(screen.queryByTestId(/social/)).toBeInTheDocument();
  });
});
