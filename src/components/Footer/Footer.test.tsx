import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Footer from './Footer';

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
  const mockedCallback = jest.fn((e) => {
    e.preventDefault();
    const inputElement = (e.target as HTMLElement).closest('form')?.querySelector('input');

    return inputElement?.value;
  });

  const commonProps = {
    navigation,
    socialIcons,
    copyright: '© 2024 Phillips Auctioneers, LLC',
    subscribeCallback: mockedCallback,
  };
  it('is selectable by the test id', () => {
    const { rerender } = render(<Footer {...commonProps} />);
    expect(screen.queryByTestId(/footer/)).toBeInTheDocument();
    rerender(<Footer id="test" {...commonProps} />);
    expect(screen.queryByTestId(/footer-test/)).toBeInTheDocument();
  });

  it('passes the subscribe callback to the subscribe component', async () => {
    const user = userEvent.setup();
    render(<Footer {...commonProps} />);
    await user.click(screen.getByPlaceholderText(/example@email.com/));

    await user.keyboard('test@test.com');

    await user.click(screen.getByText('Sign Up'));
    expect(mockedCallback).toHaveBeenCalled();
  });
});
