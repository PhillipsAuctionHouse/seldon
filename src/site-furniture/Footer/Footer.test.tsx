import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';

import Footer from './Footer';
import Social from '../../patterns/Social/Social';
import Subscribe from '../../patterns/Subscribe/Subscribe';

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
    expect(screen.queryByTestId('footer')).toBeInTheDocument();
    rerender(<Footer id="test" {...commonProps} />);
    expect(screen.queryByTestId('test')).toBeInTheDocument();
  });

  it('renders the components we pass to it', () => {
    render(<Footer {...commonProps} />);
    expect(screen.queryByTestId('subscribe-subscribe')).toBeInTheDocument();
    expect(screen.queryByTestId(/social/)).toBeInTheDocument();
  });
});

describe('Footer with logoLinkComponent', () => {
  const CustomLink = ({ children, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a data-custom-link {...props}>
      {children}
    </a>
  );

  it('renders the default anchor logo link when no logoLinkComponent is provided', () => {
    render(<Footer />);
    const logoLink = screen.getByTestId('footer-logo');
    expect(logoLink.tagName).toBe('A');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders a custom link component when logoLinkComponent is provided', () => {
    render(<Footer logoLinkComponent={CustomLink} />);

    const logoLink = screen.getByTestId('footer-logo');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('data-custom-link');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveAttribute('aria-label', 'logoLink');
  });

  it('passes logoHref to the custom link component', () => {
    render(<Footer logoLinkComponent={CustomLink} logoHref="/custom-path" />);

    const logoLink = screen.getByTestId('footer-logo');
    expect(logoLink).toHaveAttribute('href', '/custom-path');
    expect(logoLink).toHaveAttribute('data-custom-link');
  });
});
