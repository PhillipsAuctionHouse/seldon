import { render, screen } from '@testing-library/react';
import Link from './Link';
import { LinkVariants } from './utils';
import { getLinkVariantClassName } from './utils';

const getLinkElement = (text: string) => screen.getByRole('link', { name: text });

describe('Link', () => {
  it('renders a link with the provided href', () => {
    render(<Link href="https://example.com">Example Link</Link>);
    const linkElement = getLinkElement('Example Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  it('renders an anchor element by default', () => {
    render(<Link href="https://example.com">Example Link</Link>);
    const linkElement = getLinkElement('Example Link');
    expect(linkElement.tagName).toBe('A');
  });

  it('renders a custom component when component prop is provided', () => {
    const CustomComponent = ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>;
    render(
      <Link href="https://example.com" element={CustomComponent} id="id">
        Example Link
      </Link>,
    );
    const customComponent = screen.getByTestId('link-id');
    expect(customComponent).toBeInTheDocument();
    expect(customComponent).toHaveTextContent('Example Link');
    expect(customComponent).not.toHaveAttribute('rel');
  });

  it('opens a new window for external links', () => {
    render(<Link href="https://example.com">Example Link</Link>);
    const linkElement = getLinkElement('Example Link');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  describe('styling', () => {
    it('applies the provided className to the link', () => {
      render(
        <Link href="https://example.com" className="custom-link">
          Example Link
        </Link>,
      );
      const linkElement = getLinkElement('Example Link');
      expect(linkElement).toHaveClass('custom-link');
    });

    it('applies the correct className for standalone variant', () => {
      render(
        <Link href="https://example.com" variant={LinkVariants.standalone}>
          Example Link
        </Link>,
      );
      const linkElement = getLinkElement('Example Link');
      expect(linkElement).toHaveClass(getLinkVariantClassName(LinkVariants.standalone));
    });

    it('applies the correct className for email variant', () => {
      render(
        <Link href="mailto:example@example.com" variant={LinkVariants.email}>
          Example Link
        </Link>,
      );
      const linkElement = getLinkElement('Example Link');
      expect(linkElement).toHaveClass(getLinkVariantClassName(LinkVariants.email));
    });

    it('applies the correct className for list variant', () => {
      render(
        <Link href="https://example.com" variant={LinkVariants.list}>
          Example Link
        </Link>,
      );
      const linkElement = getLinkElement('Example Link');
      expect(linkElement).toHaveClass(getLinkVariantClassName(LinkVariants.list));
    });

    it('applies the correct className for inline variant', () => {
      render(
        <Link href="https://example.com" variant={LinkVariants.inline}>
          Example Link
        </Link>,
      );
      const linkElement = getLinkElement('Example Link');
      expect(linkElement).toHaveClass(getLinkVariantClassName(LinkVariants.inline));
    });
  });
});
